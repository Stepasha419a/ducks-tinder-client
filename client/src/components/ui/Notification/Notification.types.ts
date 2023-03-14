import { Notification } from "../../../models/Notification/Notification";

export interface NotificationProps extends Notification {
  closeNotification: (id: number) => void;
}