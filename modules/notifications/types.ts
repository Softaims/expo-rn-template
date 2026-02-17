export interface ActionButton {
    title: string;
    onPress: () => void;
    icon?: React.ReactNode;
}

export interface Notification {
    id: string;
    title: string;
    description?: string;
    onNotificationPress?: () => void;
    avatar?: string;
    onAvatarPress?: () => void;
    postPreviewUrl?: string;
    onPostPreviewPress?: () => void;
    actionButtons?: ActionButton[];
    createdAt: Date;
}

export interface NotificationCardProps {
    variant: 'primary' | 'secondary';
    notification: Notification;
}