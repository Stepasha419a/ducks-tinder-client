import type { Notification } from '@entities/notification/model/notification.interfaces';

export interface NotificationProps extends Notification {
  closeNotification: (id: number) => void;
}
