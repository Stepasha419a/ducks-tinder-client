import { MutableRefObject, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { IChat } from "../../../../models/IChat"
import { IUser } from "../../../../models/IUser"
import { connectChatThunk, disconnectChatThunk } from "../../../../redux/chatReducer"
import { getUserThunk } from "../../../../redux/usersReducer"
import { Socket } from 'socket.io-client'
import styles from './ChatItem.module.scss'
import Avatar from "../../../Avatar/Avatar"

interface ChatInterface{
    chat: IChat
    chatCompanionId: string | undefined
    socket: MutableRefObject<Socket | undefined>
    currentChatId: string
}

const ChatItem: React.FC<ChatInterface> = ({chat, chatCompanionId, socket, currentChatId}) => {
    const dispatch = useDispatch()

    const [chatPartner, setChatPartner] = useState<IUser>({} as IUser)

    function connect(chatId: string) {
        dispatch(disconnectChatThunk({socket}) as any)
        dispatch(connectChatThunk({socket, chatId}) as any)
    }

    useEffect(() => {
        return () => {
            dispatch(disconnectChatThunk({socket}) as any)
        }
    }, [dispatch, socket])

    useEffect(() => {
        dispatch(getUserThunk({id: chatCompanionId as String}) as any).then((res: any) => setChatPartner(res.payload))
    }, [chatCompanionId, dispatch])

    return(
        <div onClick={() => connect(chat._id)} className={`${styles.item} ${currentChatId === chat._id ? styles.item_active : ''}`}>
            <Avatar otherUserId={chatCompanionId} imageExtraClassName='_chat' />
            <div className={styles.descr}>
                <div className={styles.name}>
                    {chatPartner.name}
                </div>
                <div className={styles.message}>
                    {chat.messages.length 
                    ? 
                    chat.messages[chat.messages.length - 1]?.userId === chatPartner._id 
                        ? 
                        `${chatPartner.name}: ` 
                        : 
                        'you: ' 
                    :
                    'send first message'}

                    {chat.messages[chat.messages.length - 1]?.content}
                </div>
            </div>
        </div>
    )
}

export default ChatItem