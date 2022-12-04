import { IMessage } from "../../../models/IChat"
import { IUser } from "../../../models/IUser"
import Avatar from "../../Avatar/Avatar"
import styles from './Message.module.scss'

interface MessageComponentInterface{
    message: IMessage
    user: IUser | undefined
    currentUserId: string
}

const Message: React.FC<MessageComponentInterface> = ({message, user, currentUserId}) => {
    return(
        <div className={styles.wrapper}>
            <div className={styles.container}>
                {user?.pictures ? 
                    <Avatar otherUserId={user._id} imageExtraClassName='_message' avatarUrl={user.pictures.avatar}/>
                :
                    <Avatar showDefaultPhoto imageExtraClassName='_message'/>
                }
                <div className={`${styles.message} ${message.userId === currentUserId ? styles.message_own : ''}`}>
                    {!(message.userId === currentUserId) &&
                        <div className={styles.username}>
                            {user?.name}
                        </div>
                    }
                    <div className={styles.content}>
                        {message.content}
                    </div>
                    <div className={`${styles.mark} ${message.userId === currentUserId ? styles.mark_own : ''}`}></div>
                </div>
            </div>
        </div>
    )
}

export default Message