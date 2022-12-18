import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../redux/reduxStore';
import { deleteNotification } from '../../redux/usersReducer';
import styles from './Notifications.module.scss';

export const Notifications = () => {
  const dispatch = useDispatch();

  const notifications = useAppSelector(
    (state) => state.usersPage.notifications
  );

  const closeNotification = (id: number) => {
    dispatch(deleteNotification(id));
  };

  if (!notifications.length) {
    return null;
  }

  return (
    <div className={styles.notifications}>
      {notifications.map((item) => {
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
      })}
    </div>
  );
};
