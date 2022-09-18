import { MessageInterface } from "../../../models/IDialog"

interface MessageComponentInterface{
    message: MessageInterface
}

const Message: React.FC<MessageComponentInterface> = ({message}) => {
    return(
        <div className="tinder__chat-message">
            {message.username}: {message.content}
        </div>
    )
}

export default Message