import classNames from 'classnames';
import type { FC } from 'react';
import styles from './Notification.module.scss';
import type { NotificationProps } from './Notification.types';

export const Notification: FC<NotificationProps> = ({
  id,
  type,
  text,
  closeNotification,
}) => {
  const notificationCn = classNames(
    styles.notification,
    type === 'error' && styles.notification_error,
  );
  const markCn = classNames(styles.mark, type === 'error' && styles.mark_error);

  return (
    <div
      onClick={() => closeNotification(id)}
      key={id}
      className={notificationCn}
    >
      <div className={styles.text}>{text}</div>
      <div className={markCn} />
      <div className={styles.close}>click to close</div>
    </div>
  );
};