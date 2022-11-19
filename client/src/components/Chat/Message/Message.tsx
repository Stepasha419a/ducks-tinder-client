import { IMessage } from "../../../models/IChat"
import { IUser } from "../../../models/IUser"
import Avatar from "../../Avatar/Avatar"

interface MessageComponentInterface{
    message: IMessage
    user: IUser | undefined
    currentUserId: string
}

const Message: React.FC<MessageComponentInterface> = ({message, user, currentUserId}) => {
    return(
        <div className="chat__message-wrapper">
            <div className="chat__message-container">
                {user?.pictures ? 
                    <Avatar otherUserId={user._id} imageExtraClassName={'chat__message-avatar'} avatarUrl={user.pictures.avatar}/>
                :
                    <Avatar showDefaultPhoto imageExtraClassName={'chat__message-avatar'}/>
                }
                <div className={`chat__message${message.userId === currentUserId ? ' chat__message--own-message' : ''}`}>
                    {!(message.userId === currentUserId) &&
                        <div className="chat__message-username">
                            {user?.name}
                        </div>
                    }
                    <div className="chat__message-content">
                        {message.content}
                    </div>
                    <div className={`chat__message-mark${message.userId === currentUserId ? ' chat__message-mark--own-message' : ''}`}></div>
                </div>
            </div>
        </div>
    )
}

export default Message