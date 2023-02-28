import { Notification } from "../../../models/Notification";

export interface NotificationProps extends Notification {
  closeNotification: (id: number) => void;
}