export interface INotification {
  id: number;
  type: 'error' | 'info';
  text: string;
}

export interface NotificationProps extends INotification {
  closeNotification: (id: number) => void;
}