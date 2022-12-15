import { useDispatch, useSelector } from "react-redux"
import { AppStateType } from "../../redux/reduxStore"
import { KeyboardEvent, MutableRefObject, useEffect, useRef, useState } from "react"
import Message from "./Message/Message"
import { IMessage } from "../../models/IChat"
import { IUser } from "../../models/IUser"
import { getUserThunk } from "../../redux/usersReducer"
import { setIncludedMembersIds } from "../../redux/chatReducer"
import { isRefElementVisible, scrollToBottom } from "./utils/ChatUtils"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMessage } from "@fortawesome/free-solid-svg-icons"
import { Socket } from 'socket.io-client'
import styles from './Chat.module.scss'

interface ChatPropsInterface{
    socket: MutableRefObject<Socket | undefined>
}

export const Chat: React.FC<ChatPropsInterface> = ({socket}) => {
    const dispatch = useDispatch()

    const currentUser = useSelector((state: AppStateType) => state.usersPage.currentUser)
    const messages = useSelector((state: AppStateType) => state.chatPage.currentMessages)
    const isConnected = useSelector((state: AppStateType) => state.chatPage.isConnected)
    const members = useSelector((state: AppStateType) => state.chatPage.currentMembers)
    const includedMembersIds = useSelector((state: AppStateType) => state.chatPage.includedMembersIds)

    const [userMembers, setUserMembers] = useState([] as IUser[])
    const [value, setValue] = useState('')

    const bottomElementRef = useRef<null | HTMLElement>(null) as React.MutableRefObject<HTMLInputElement>;

    useEffect(() => {
        members.forEach(async (memberId) => {
            if(!includedMembersIds.includes(memberId)) {
                dispatch(setIncludedMembersIds(memberId))
                const user = await dispatch(getUserThunk({id: memberId}) as any)
                setUserMembers(prev => [...prev, user.payload])
            }
        })
    }, [members, dispatch, includedMembersIds])

    useEffect(() => {
        if(bottomElementRef.current && isRefElementVisible(bottomElementRef)) {
            scrollToBottom(bottomElementRef, true)
        }
    }, [messages])

    useEffect(() => {
        bottomElementRef && scrollToBottom(bottomElementRef)
    }, [userMembers])

    const sendMessage = async () => {
        const message: IMessage = {
            id: Date.now().toString(),
            username: currentUser.name,
            content: value,
            userId: currentUser._id
        }
        socket.current?.send(message)
        setValue('')
    }

    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter'){
            sendMessage()
        }
    }

    return(
        <div className={styles.chat}>
            {isConnected ?
                <div className={styles.container}>
                    <div className={styles.messages}>
                        {messages.map((message: IMessage) => 
                            userMembers.length ? 
                                <Message key={message.id} message={message} user={userMembers.find(item => item._id === message.userId)} currentUserId={currentUser._id}/> 
                            : 
                                <div key={message.id}>loading message...</div>
                        )}
                        <div ref={bottomElementRef} className={styles.ref}></div>
                    </div>
                    <div className={styles.wrapper}>
                        <div className={styles.form}>
                            <input onKeyPress={(e) => handleKeyPress(e)} value={value} onChange={(e) => setValue(e.target.value)} className={styles.input} type="text" />
                            <button onClick={sendMessage} className={styles.button}>send</button>
                        </div>
                    </div>
                </div>
            :
                <div className={styles.noChats}>
                    <div className={styles.inner}>
                        <FontAwesomeIcon icon={faMessage} className={styles.icon}/>
                        <div className={styles.text}>
                            Choose the chat
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}