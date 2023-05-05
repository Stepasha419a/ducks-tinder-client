import type { Notification } from '@entities/notification/model';

export interface NotificationProps extends Notification {
  closeNotification: (id: number) => void;
}
