import { Notification } from '@shared/interfaces';

export interface NotificationProps extends Notification {
  closeNotification: (id: number) => void;
}
