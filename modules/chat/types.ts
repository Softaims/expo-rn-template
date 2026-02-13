import { BubbleProps, DayProps, IMessage, InputToolbarProps } from "react-native-gifted-chat";
import { SwipeAction } from "@/components/gestures";

export interface ChatFeedProps {
    messages: IMessage[];
    onMessagesChange: (messages: IMessage[]) => void;
    userId: number;
    userAvatar?: string;
    userName?: string;
    placeholder?: string;
    onLongPressMessage?: (context: unknown, message: IMessage) => void;
    renderCustomBubble?: (props: BubbleProps<IMessage>) => React.ReactNode;
    renderCustomDay?: (props: DayProps) => React.ReactNode;
    renderCustomInputToolbar?: (props: InputToolbarProps<IMessage>) => React.ReactNode;
    showAvatar?: boolean;
    enableSwipeToReply?: boolean;
    swipeDirection?: 'left' | 'right';
}

export interface ChatFeedHeaderProps {
    name: string;
    userName: string;
    avatar: string;
    onPressBack?: () => void;
    onPressProfile?: () => void;
    onBlockUser?: () => void;
    onReportUser?: () => void;
    onClearChat?: () => void;
}

export interface User {
    id: string;
    name: string;
    avatar: string;
}

export interface UserMessageCardProps {
    user: User;
    message: string;
    createdAt: Date;
    unreadMessagesCount: number;
    onPress: () => void;
    swipeActions?: SwipeAction[];
}