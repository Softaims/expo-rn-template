import { TextInput } from "@/components/inputs/TextInput";
import { Text } from "@/components/text";
import { useTheme } from "@/lib/theme";
import * as Clipboard from "expo-clipboard";
import { useCallback, useMemo, useState } from "react";
import { View } from "react-native";
import {
  chatDayLabel,
  chatDayRule,
  chatInputToolbarExt,
  chatReplyClose,
  chatReplyPreviewTint,
  chatReplySubtitle,
  chatReplyTitle,
  chatTimestamp,
  createStyles as createChatFeedStyles,
  styles as chatFeedLayoutStyles,
} from "./ChatFeed.styles";
import { showSuccessAlert } from "@/components/alerts";
import {
  Bubble,
  BubbleProps,
  DayProps,
  GiftedChat,
  IMessage,
  InputToolbarProps,
  ReplyMessage,
} from "react-native-gifted-chat";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChatFeedProps } from "../types";

export function ChatFeed({
  messages,
  onMessagesChange,
  userId,
  userAvatar,
  userName = "You",
  placeholder = "Type Something..",
  onLongPressMessage: customOnLongPressMessage,
  renderCustomBubble,
  renderCustomDay,
  renderCustomInputToolbar,
  showAvatar = false,
  enableSwipeToReply = false,
  swipeDirection = "right",
}: ChatFeedProps) {
  const { colors } = useTheme();
  const [inputText, setInputText] = useState("");
  const [replyMessage, setReplyMessage] = useState<ReplyMessage | null>(null);
  const insets = useSafeAreaInsets();

  const styles = useMemo(
    () => createChatFeedStyles(colors),
    [colors]
  );

  const onSend = useCallback(
    (newMessages: IMessage[] = []) => {
      onMessagesChange(GiftedChat.append(messages, newMessages));
      setInputText("");
      setReplyMessage(null);
    },
    [messages, onMessagesChange]
  );

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

  const handleLongPressMessage = useCallback(
    async (context: unknown, message: IMessage) => {
      if (customOnLongPressMessage) {
        customOnLongPressMessage(context, message);
        return;
      }
      if (message.text) {
        await Clipboard.setStringAsync(message.text);
        showSuccessAlert({
          title: "Copied!",
          message: "Message copied to clipboard",
          buttonText: "OK",
        });
      }
    },
    [customOnLongPressMessage]
  );

  const renderBubble = (props: BubbleProps<IMessage>) => {
    if (renderCustomBubble) {
      return renderCustomBubble(props);
    }

    const date = new Date(props.currentMessage.createdAt);
    const timeString = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const isRight = props.position === "right";

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
        <Text variant="bodyText3" style={chatTimestamp(colors, isRight)}>
          {timeString}
        </Text>
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
      ? "Today"
      : date.toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });

    return (
      <View style={chatFeedLayoutStyles.dayOuter}>
        <View style={chatDayRule(colors)} />
        <Text variant="bodyText2" style={chatDayLabel(colors)}>
          {dateString}
        </Text>
        <View style={chatDayRule(colors)} />
      </View>
    );
  };

  const renderInputToolbar = (props: InputToolbarProps<IMessage>) => {
    if (renderCustomInputToolbar) {
      return renderCustomInputToolbar(props);
    }

    return (
      <View
        style={[
          styles.inputContainer,
          chatInputToolbarExt(colors, insets.bottom),
        ]}
      >
        {replyMessage && (
          <View style={[styles.replyPreview, chatReplyPreviewTint(colors)]}>
            <View style={styles.replyPreviewContent}>
              <Text variant="bodyText3" style={chatReplyTitle(colors)}>
                Replying to {replyMessage.user.name}
              </Text>
              <Text
                variant="bodyText3"
                style={chatReplySubtitle(colors)}
                numberOfLines={1}
              >
                {replyMessage.text}
              </Text>
            </View>
            <Text
              variant="subheading3"
              style={chatReplyClose(colors)}
              onPress={handleClearReply}
            >
              ✕
            </Text>
          </View>
        )}
        <TextInput
          type="chat"
          placeholder={placeholder}
          placeholderTextColor={colors.mutedForeground}
          value={inputText}
          onChangeText={setInputText}
          inputContainerStyle={styles.chatComposerField}
          inputStyle={styles.chatComposerInput}
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
