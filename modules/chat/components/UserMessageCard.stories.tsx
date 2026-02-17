import { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";
import { UserMessageCard } from "./UserMessageCard";
import { Text } from "@/components/text";
import { SwipeAction } from "@/components/gestures";

const meta = {
    title: "Chat/UserMessageCard",
    component: UserMessageCard,
    decorators: [
        (Story) => (
            <View className="flex-1 p-4">
                <Story />
            </View>
        ),
    ],
} satisfies Meta<typeof UserMessageCard>;

export default meta;

type Story = StoryObj<typeof meta>;

const dummy = {
    user: {
        id: "1",
        name: "John Doe",
        avatar: "https://www.cnet.com/a/img/resize/0e9874cc9d6b18489f832793796d285141496106/hub/2021/10/16/11804578-0dbc-42af-bcd1-3bc7b1394962/the-batman-2022-teaser-poster-batman-01-promo.jpg?auto=webp&fit=bounds&height=900&precrop=1881,1411,x423,y0&width=1200",
    },
    message: "Hello, how are you?",
    createdAt: new Date(),
    unreadMessagesCount: 0,
    onPress: () => { },
}

// Demo component using the static Alert API
export const Basic: Story = {
    args: {
        ...dummy,
    },
    render: () => {
        return (
            <UserMessageCard {...dummy} />
        )
    },
};

export const WithUnreadMessages: Story = {
    args: {
        ...dummy,
    },
    render: () => {
        return (
            <UserMessageCard {...dummy} unreadMessagesCount={1} />
        )
    },
};

export const WithSwipeActions: Story = {
    args: {
        ...dummy,
    },
    render: () => {
        const swipeActions: SwipeAction[] = [
            {
                icon: <Text className="text-muted-foreground text-lg">🔕</Text>,
                onPress: () => console.log("Mute pressed"),
                type: "default",
            },
            {
                icon: <Text className="text-destructive-foreground text-lg">🗑️</Text>,
                onPress: () => console.log("Delete pressed"),
                type: "destructive",
            },
        ];
        return (
            <UserMessageCard {...dummy} swipeActions={swipeActions} />
        )
    },
};

export const WithSwipeActionsAndUnread: Story = {
    args: {
        ...dummy,
        unreadMessagesCount: 3,
    },
    render: () => {
        const swipeActions: SwipeAction[] = [
            {
                icon: <Text className="text-muted-foreground text-lg">🔕</Text>,
                onPress: () => console.log("Mute pressed"),
                type: "default",
            },
            {
                icon: <Text className="text-destructive-foreground text-lg">🗑️</Text>,
                onPress: () => console.log("Delete pressed"),
                type: "destructive",
            },
        ];
        return (
            <UserMessageCard {...dummy} swipeActions={swipeActions} unreadMessagesCount={3} />
        )
    },
};
