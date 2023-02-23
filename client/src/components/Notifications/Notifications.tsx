import { deleteNotification } from '../../redux/notifications/notifications.slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { Notification } from '../ui';
import styles from './Notifications.module.scss';

export const Notifications = () => {
  const dispatch = useAppDispatch();

  const notifications = useAppSelector(
    (state) => state.notifications.notifications
  );

  const closeNotification = (id: number) => {
    dispatch(deleteNotification(id));
  };

  if (!notifications.length) {
    return null;
  }

  return (
    <div className={styles.notifications}>
      {notifications.map((item) => (
        <Notification {...item} closeNotification={closeNotification} key={item.id}/>
      ))}
    </div>
  );
};
