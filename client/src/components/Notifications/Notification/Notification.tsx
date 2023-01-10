import { INotification } from "../../../redux/usersReducer";
import styles from './Notification.module.scss'

interface NotificationProps{
  item: INotification,
  closeNotification: (id: number) => void
}

const Notification: React.FC<NotificationProps> = ({item, closeNotification}) => {
  return (
    <div
      onClick={() => closeNotification(item.id)}
      key={item.id}
      className={`${styles.notification} ${
        item.type === 'error' ? styles.notification_error : ''
      }`}
    >
      <div className={styles.text}>{item.text}</div>
      <div
        className={`${styles.mark} ${
          item.type === 'error' ? styles.mark_error : ''
        }`}
      ></div>
      <div className={styles.close}>click to close</div>
    </div>
  );
};

export default Notification;
