import { useDispatch, useSelector } from "react-redux"
import { AppStateType } from "../../redux/reduxStore"
import { KeyboardEvent, MutableRefObject, useEffect, useRef, useState } from "react"
import Message from "./Message/Message"
import { MessageInterface } from "../../models/IDialog"
import { IUser } from "../../models/IUser"
import { getUserThunk } from "../../redux/usersReducer"
import { setIncludedMembersIds } from "../../redux/chatReducer"
import { isRefElementVisible, scrollToBottom } from "./utils/ChatUtils"

interface ChatPropsInterface{
    socket: MutableRefObject<WebSocket | undefined>
}

const Chat: React.FC<ChatPropsInterface> = ({socket}) => {
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
        const message = {
            id: Date.now(),
            username: currentUser.name,
            content: value,
            userId: currentUser._id
        }
        socket.current?.send(JSON.stringify(message))
        setValue('')
    }

    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter'){
            sendMessage()
        }
    }

    return(
        <div className="tinder__chat">
            {isConnected ?
                <div className="tinder__chat-container">
                    <div className="tinder__chat-messages">
                        {messages.map((message: MessageInterface) => 
                            userMembers.length ? 
                                <Message key={message.id} message={message} user={userMembers.find(item => item._id === message.userId)} currentUserId={currentUser._id}/> 
                            : 
                                <div key={message.id}>loading message...</div>
                        )}
                        <div ref={bottomElementRef} className="tinder__chat-messages-end-ref"></div>
                    </div>
                    <div className="tinder__chat-form-wrapper">
                        <div className="tinder__chat-form">
                            <input onKeyPress={(e) => handleKeyPress(e)} value={value} onChange={(e) => setValue(e.target.value)} className="tinder__chat-form-input" type="text" />
                            <button onClick={sendMessage} className="tinder__chat-form-button">send</button>
                        </div>
                    </div>
                </div>
            :
                <div>
                    choose the dialog
                </div>
            }
        </div>
    )
}

export default Chat