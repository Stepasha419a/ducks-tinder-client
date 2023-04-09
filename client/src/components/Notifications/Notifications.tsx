import type { ReactElement } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks';
import { deleteNotification } from '@redux/notifications/notifications.slice';
import { Notification } from '@shared/ui';
import styles from './Notifications.module.scss';

export const Notifications = (): ReactElement | null => {
  const dispatch = useAppDispatch();

  const notifications = useAppSelector(
    (state) => state.notifications.notifications
  );

  const closeNotification = (id: number): void => {
    dispatch(deleteNotification(id));
  };

  if (!notifications.length) {
    return null;
  }

  return (
    <div className={styles.notifications}>
      {notifications.map((item) => (
        <Notification
          {...item}
          closeNotification={closeNotification}
          key={item.id}
        />
      ))}
    </div>
  );
};
