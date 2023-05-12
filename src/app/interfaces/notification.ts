export enum NotificationType {
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface Notification {
  message: string;
  type: NotificationType;
  duration?: number;
}
