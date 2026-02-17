import { TextInput } from "@/components/inputs/TextInput";
import { Text } from "@/components/text";
import { fontFamilies } from "@/hooks/useFonts";
import { cn } from "@/lib/utils";
import * as Clipboard from 'expo-clipboard';
import { useCallback, useState } from 'react';
import { StyleSheet, View } from "react-native";
import { showSuccessAlert } from "@/components/alerts";
import { Bubble, BubbleProps, DayProps, GiftedChat, IMessage, InputToolbarProps, ReplyMessage } from 'react-native-gifted-chat';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChatFeedProps } from "../types";

export function ChatFeed({
    messages,
    onMessagesChange,
    userId,
    userAvatar,
    userName = 'You',
    placeholder = 'Type Something..',
    onLongPressMessage: customOnLongPressMessage,
    renderCustomBubble,
    renderCustomDay,
    renderCustomInputToolbar,
    showAvatar = false,
    enableSwipeToReply = false,
    swipeDirection = 'right',
}: ChatFeedProps) {
    const [inputText, setInputText] = useState('');
    const [replyMessage, setReplyMessage] = useState<ReplyMessage | null>(null);
    const insets = useSafeAreaInsets();

    const onSend = useCallback((newMessages: IMessage[] = []) => {
        onMessagesChange(GiftedChat.append(messages, newMessages));
        setInputText('');
        setReplyMessage(null);
    }, [messages, onMessagesChange]);

    const handleSend = useCallback(() => {
        if (inputText.trim()) {
            const newMessage: IMessage = {
                _id: Math.random().toString(36).substring(7),
                text: inputText.trim(),
                createdAt: new Date(),
                user: {
                    _id: userId,
                    name: userName,
                    avatar: userAvatar,
                },
                ...(replyMessage ? { replyMessage } : {}),
            };
            onSend([newMessage]);
        }
    }, [inputText, onSend, replyMessage, userId, userName, userAvatar]);

    const handleSwipeToReply = useCallback((message: IMessage) => {
        setReplyMessage({
            _id: message._id,
            text: message.text,
            user: message.user,
            image: message.image,
            audio: message.audio,
        });
    }, []);

    const handleClearReply = useCallback(() => {
        setReplyMessage(null);
    }, []);

    const handleLongPressMessage = useCallback(async (context: unknown, message: IMessage) => {
        if (customOnLongPressMessage) {
            customOnLongPressMessage(context, message);
            return;
        }
        if (message.text) {
            await Clipboard.setStringAsync(message.text);
            showSuccessAlert({
                title: 'Copied!',
                message: 'Message copied to clipboard',
                buttonText: 'OK',
            });
        }
    }, [customOnLongPressMessage]);

    const renderBubble = (props: BubbleProps<IMessage>) => {
        if (renderCustomBubble) {
            return renderCustomBubble(props);
        }

        const date = new Date(props.currentMessage.createdAt);
        const timeString = date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });

        return (
            <View>
                <Bubble
                    {...props}
                    wrapperStyle={{
                        right: styles.rightBubble,
                        left: styles.leftBubble,
                    }}
                    textStyle={{
                        right: styles.rightBubbleText,
                        left: styles.leftBubbleText,
                    }}
                />
                <Text className={cn("text-[12px] text-secondary", props.position === 'right' ? 'text-right' : 'text-left')}>{timeString}</Text>
            </View>
        );
    };

    const renderTime = () => null;

    const renderDay = (props: DayProps) => {
        if (renderCustomDay) {
            return renderCustomDay(props);
        }

        if (!props.createdAt) return null;

        const now = new Date();
        const date = new Date(props.createdAt);

        const isToday =
            date.getDate() === now.getDate() &&
            date.getMonth() === now.getMonth() &&
            date.getFullYear() === now.getFullYear();

        const dateString = isToday
            ? 'Today'
            : date.toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            });

        return (
            <View className="flex-row items-center justify-center my-[20px]">
                <View className="h-[1px] bg-border flex-1 mx-[12px]" />
                <Text className="text-[13px] text-secondary font-semibold">{dateString}</Text>
                <View className="h-[1px] bg-border flex-1 mx-[12px]" />
            </View>
        );
    };

    const renderInputToolbar = (props: InputToolbarProps<IMessage>) => {
        if (renderCustomInputToolbar) {
            return renderCustomInputToolbar(props);
        }

        return (
            <View style={[styles.inputContainer, { paddingBottom: insets.bottom + 8 }]}>
                {replyMessage && (
                    <View style={styles.replyPreview}>
                        <View style={styles.replyPreviewContent}>
                            <Text className="text-[12px] text-primary font-semibold">
                                Replying to {replyMessage.user.name}
                            </Text>
                            <Text className="text-[12px] text-gray-500" numberOfLines={1}>
                                {replyMessage.text}
                            </Text>
                        </View>
                        <Text
                            className="text-[16px] text-gray-400 px-2"
                            onPress={handleClearReply}
                        >
                            ✕
                        </Text>
                    </View>
                )}
                <TextInput
                    type="chat"
                    placeholder={placeholder}
                    placeholderTextColor="#9CA3AF"
                    value={inputText}
                    onChangeText={setInputText}
                    inputContainerStyles="bg-white border-border rounded-full px-4"
                    inputStyles="text-[14px]"
                    onRightIconPress={handleSend}
                />
            </View>
        );
    };

    return (
        <GiftedChat
            messages={messages}
            onSend={onSend}
            user={{
                _id: userId,
                avatar: userAvatar,
            }}
            renderBubble={renderBubble}
            renderTime={renderTime}
            renderInputToolbar={renderInputToolbar}
            minInputToolbarHeight={replyMessage ? 120 : 80}
            messagesContainerStyle={styles.messagesContainer}
            isSendButtonAlwaysVisible
            onLongPressMessage={handleLongPressMessage}
            isAvatarVisibleForEveryMessage={showAvatar}
            renderAvatar={showAvatar ? undefined : null}
            renderDay={renderDay}
            keyboardAvoidingViewProps={{
                keyboardVerticalOffset: 36,
            }}
            reply={{
                message: replyMessage,
                onClear: handleClearReply,
                swipe: {
                    isEnabled: enableSwipeToReply,
                    direction: swipeDirection,
                    onSwipe: handleSwipeToReply,
                },
            }}
            listProps={{
                showsVerticalScrollIndicator: false,
            }}
        />
    );
}

const styles = StyleSheet.create({
    messagesContainer: {
        borderWidth: 0,
        paddingHorizontal: 12
    },
    rightBubble: {
        backgroundColor: '#000000',
        borderRadius: 10,
        borderTopRightRadius: 0,
        paddingHorizontal: 4,
        paddingVertical: 2,
        marginVertical: 6
    },
    leftBubble: {
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        borderBottomLeftRadius: 0,
        paddingHorizontal: 4,
        paddingVertical: 2,
        marginVertical: 6
    },
    rightBubbleText: {
        color: '#FFFFFF',
        fontSize: 14,
        lineHeight: 20,
        fontFamily: fontFamilies.medium,
    },
    leftBubbleText: {
        color: '#1F2937',
        fontSize: 14,
        lineHeight: 20,
        fontFamily: fontFamilies.medium,
    },
    inputContainer: {
        paddingHorizontal: 16,
        paddingTop: 12,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 0,
    },
    replyPreview: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginBottom: 8,
        borderLeftWidth: 3,
        borderLeftColor: '#1F2937',
    },
    replyPreviewContent: {
        flex: 1,
    },
});
