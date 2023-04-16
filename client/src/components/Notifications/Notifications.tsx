import type { ReactElement } from 'react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks';
import {
  createNotification,
  deleteNotification,
} from '@entities/notification/model';
import { Notification } from '@shared/ui';
import styles from './Notifications.module.scss';

export const Notifications = (): ReactElement | null => {
  const dispatch = useAppDispatch();

  const notifications = useAppSelector(
    (state) => state.notification.notifications
  );
  const errorFields = useAppSelector((state) => state.setting.errorFields);

  useEffect(() => {
    const errorText =
      'You have some empty fields, they are selected with red color';
    const result = notifications.find((item) => item.text === errorText);
    if (!result && errorFields.length) {
      dispatch(createNotification({ type: 'error', text: errorText }));
    } // eslint-disable-next-line
  }, [errorFields.length, dispatch]);

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
