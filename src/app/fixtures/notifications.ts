export const notifications: NotificationType[] = [
  {
    id: 1,
    label: 'Password Update Required',
    message: 'For your security, please change your temporary password now.',
    sendAt: '1 hour ago',
    severity: 'warning',
    isRead: false,
  },
  {
    id: 2,
    label: 'New Street Location Update',
    message: 'Your upline has set a new street location. Prepare to head out.',
    sendAt: '1 hour ago',
    severity: 'info',
    isRead: false,
  },
  {
    id: 3,
    label: 'Password Update Required',
    message: 'For your security, please change your temporary password now.',
    sendAt: '1 hour ago',
    severity: 'warning',
    isRead: true,
  },
];
