import { MutableRefObject, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { IChat } from "../../../models/IChat"
import { getChatsThunk } from "../../../redux/chatReducer"
import { AppStateType } from "../../../redux/reduxStore"
import ChatItem from "./ChatItem/ChatItem"
import { Socket } from 'socket.io-client'
import styles from './Chats.module.scss'

interface ChatsInterface{
    socket: MutableRefObject<Socket | undefined>
}

const Chats: React.FC<ChatsInterface> = ({socket}) => {
    const dispatch = useDispatch()

    const currentUser = useSelector((state: AppStateType) => state.usersPage.currentUser)
    const chats = useSelector((state: AppStateType) => state.chatPage.chats)
    const currentChatId = useSelector((state: AppStateType) => state.chatPage.currentChatId)

    useEffect(() => {
        dispatch(getChatsThunk({id: currentUser._id}) as any)
    }, [currentUser._id, dispatch])

    if(!chats) {
        
    }

    return (
        <div className={styles.chats}>
            {chats.map((chat: IChat) => {
                const chatCompanionId = chat.members.find((memberId: string) => memberId !== currentUser._id)
                return (
                    <ChatItem key={chat._id} chat={chat} chatCompanionId={chatCompanionId} socket={socket} currentChatId={currentChatId} />
                )
            })}
        </div>
    )
}

export default Chats