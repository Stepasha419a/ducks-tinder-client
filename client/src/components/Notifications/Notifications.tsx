import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../redux/reduxStore';
import { deleteNotification } from '../../redux/usersReducer';
import styles from './Notifications.module.scss';

export const Notifications = () => {
  const dispatch = useDispatch();

  const notifications = useSelector(
    (state: AppStateType) => state.usersPage.notifications
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
            {item.text}
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
