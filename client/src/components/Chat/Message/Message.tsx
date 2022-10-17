import { MessageInterface } from "../../../models/IDialog"
import { IUser } from "../../../models/IUser"
import Avatar from "../../Avatar/Avatar"

interface MessageComponentInterface{
    message: MessageInterface
    user: IUser | undefined
    currentUserId: string
}

const Message: React.FC<MessageComponentInterface> = ({message, user, currentUserId}) => {
    return(
        <div className="chat-message-wrapper">
            <div className="chat-message-container">
                {user?.pictures ? 
                    <Avatar otherUserId={user._id} imageExtraClassName={'chat-message-avatar'} avatarUrl={user.pictures.avatar}/>
                :
                    <Avatar showDefaultPhoto imageExtraClassName={'chat-message-avatar'}/>
                }
                <div className={`chat-message${message.userId === currentUserId ? ' chat-message--own-message' : ''}`}>
                    {!(message.userId === currentUserId) &&
                        <div className="chat-message-username">
                            {user?.name}
                        </div>
                    }
                    <div className="chat-message-content">
                        {message.content}
                    </div>
                    <div className={`chat-message-mark${message.userId === currentUserId ? ' chat-message-mark--own-message' : ''}`}></div>
                </div>
            </div>
        </div>
    )
}

export default Message