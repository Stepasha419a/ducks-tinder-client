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
        <div className="tinder__chat-message-wrapper">
            <div className="tinder__chat-message-container">
                {user?.pictures ? 
                    <Avatar otherUserId={user._id} imageExtraClassName={'tinder__chat-message-avatar'} avatarUrl={user.pictures.avatar}/>
                :
                    <Avatar showDefaultPhoto imageExtraClassName={'tinder__chat-message-avatar'}/>
                }
                <div className={`tinder__chat-message${message.userId === currentUserId ? ' tinder__chat-message--own-message' : ''}`}>
                    {!(message.userId === currentUserId) &&
                        <div className="tinder__chat-message-username">
                            {user?.name}
                        </div>
                    }
                    <div className="tinder__chat-message-content">
                        {message.content}
                    </div>
                    <div className={`tinder__chat-message-mark${message.userId === currentUserId ? ' tinder__chat-message-mark--own-message' : ''}`}></div>
                </div>
            </div>
        </div>
    )
}

export default Message