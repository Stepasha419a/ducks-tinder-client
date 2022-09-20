import { MessageInterface } from "../../../models/IDialog"
import { IUser } from "../../../models/IUser"

interface MessageComponentInterface{
    message: MessageInterface
    user: IUser | undefined
}

const Message: React.FC<MessageComponentInterface> = ({message, user}) => {
    
    return(
        <div className="tinder__chat-message">
            {message.username}: {message.content}
        </div>
    )
}

export default Message