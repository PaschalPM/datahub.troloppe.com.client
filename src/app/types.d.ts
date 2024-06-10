type EventEmitterType<T> = { event: string; payload: T };

type ColorSchemeType = 'auto' | 'light' | 'dark';

type AuthType =  {
  email: string;
  password: string;
  token: string;
}

type NotificationType = {
    notificationId: number;
    label: string;
    message: string;
    sendAt: string;
    severity: 'warning' | 'info';
    isRead: boolean;
  };
  