import { MessageInterface } from "../../../models/IDialog"
import { IUser } from "../../../models/IUser"

interface MessageComponentInterface{
    message: MessageInterface
    user: IUser | undefined
    currentUserId: string
}

const Message: React.FC<MessageComponentInterface> = ({message, user, currentUserId}) => {
    
    return(
        <div className="tinder__chat-message-wrapper">
            <div className={`tinder__chat-message${message.userId === currentUserId ? ' tinder__chat-message--own-message' : ''}`}>
                {!(message.userId === currentUserId) &&
                    <div className="tinder__chat-message-username">
                        {message.username}
                    </div>
                }
                <div className="tinder__chat-message-content">
                    {message.content}
                </div>
                <div className={`tinder__chat-message-mark${message.userId === currentUserId ? ' tinder__chat-message-mark--own-message' : ''}`}></div>
            </div>
        </div>
    )
}

export default Message