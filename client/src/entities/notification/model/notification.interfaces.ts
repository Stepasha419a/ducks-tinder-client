export interface CreateNotification {
  type: 'error' | 'info';
  text: string;
}

export interface Notification extends CreateNotification {
  id: number;
}
