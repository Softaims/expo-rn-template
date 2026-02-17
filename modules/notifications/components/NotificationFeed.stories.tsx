import { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";
import { NotificationFeed } from "./NotificationFeed";
import { Notification } from "../types";
import { HeartIcon } from "@/assets/icons/HeartIcon";
import { ChatIcon } from "@/assets/icons/ChatIcon";

const meta = {
    title: "Notifications/NotificationFeed",
    component: NotificationFeed,
    decorators: [
        (Story) => (
            <View className="flex-1">
                <Story />
            </View>
        ),
    ],
} satisfies Meta<typeof NotificationFeed>;

export default meta;

type Story = StoryObj<typeof meta>;

const primaryNotifications: Notification[] = [
    {
        id: "1",
        title: "John Doe liked your post.",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        avatar: "https://www.cnet.com/a/img/resize/0e9874cc9d6b18489f832793796d285141496106/hub/2021/10/16/11804578-0dbc-42af-bcd1-3bc7b1394962/the-batman-2022-teaser-poster-batman-01-promo.jpg?auto=webp&fit=bounds&height=900&precrop=1881,1411,x423,y0&width=1200",
        createdAt: new Date(),
        onNotificationPress: () => { },
    },
    {
        id: "2",
        title: "John Doe liked your post.",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        avatar: "https://www.cnet.com/a/img/resize/0e9874cc9d6b18489f832793796d285141496106/hub/2021/10/16/11804578-0dbc-42af-bcd1-3bc7b1394962/the-batman-2022-teaser-poster-batman-01-promo.jpg?auto=webp&fit=bounds&height=900&precrop=1881,1411,x423,y0&width=1200",
        createdAt: new Date(),
        onNotificationPress: () => { },
    },
    {
        id: "3",
        title: "John Doe liked your post.",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        avatar: "https://www.cnet.com/a/img/resize/0e9874cc9d6b18489f832793796d285141496106/hub/2021/10/16/11804578-0dbc-42af-bcd1-3bc7b1394962/the-batman-2022-teaser-poster-batman-01-promo.jpg?auto=webp&fit=bounds&height=900&precrop=1881,1411,x423,y0&width=1200",
        createdAt: new Date(),
        onNotificationPress: () => { },
    },
    {
        id: "4",
        title: "John Doe liked your post.",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        avatar: "https://www.cnet.com/a/img/resize/0e9874cc9d6b18489f832793796d285141496106/hub/2021/10/16/11804578-0dbc-42af-bcd1-3bc7b1394962/the-batman-2022-teaser-poster-batman-01-promo.jpg?auto=webp&fit=bounds&height=900&precrop=1881,1411,x423,y0&width=1200",
        createdAt: new Date(),
        onNotificationPress: () => { },
    },
]

export const PrimaryNotificationFeed: Story = {
    args: {
        variant: "primary",
        notifications: primaryNotifications,
    },
    render: (args) => {
        return (
            <NotificationFeed {...args} />
        );
    },
};

export const SecondaryNotificationFeed: Story = {
    args: {
        variant: "secondary",
        notifications: [],
    },
    render: (args) => {
        const secondaryNotifications: Notification[] = [
            {
                id: "1",
                title: "John Doe liked your post.",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                avatar: "https://www.cnet.com/a/img/resize/0e9874cc9d6b18489f832793796d285141496106/hub/2021/10/16/11804578-0dbc-42af-bcd1-3bc7b1394962/the-batman-2022-teaser-poster-batman-01-promo.jpg?auto=webp&fit=bounds&height=900&precrop=1881,1411,x423,y0&width=1200",
                createdAt: new Date(2026, 0, 1),
                onNotificationPress: () => { },
                onAvatarPress: () => { },
                onPostPreviewPress: () => { },
                actionButtons: [
                    { title: "Like", onPress: () => { }, icon: <HeartIcon /> },
                    { title: "Chat", onPress: () => { }, icon: <ChatIcon /> },
                ],
                postPreviewUrl: "https://static01.nyt.com/images/2022/03/01/arts/batman-anatomy1/batman1-square640.jpg",
            },
            {
                id: "2",
                title: "John Doe liked your post.",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                avatar: "https://www.cnet.com/a/img/resize/0e9874cc9d6b18489f832793796d285141496106/hub/2021/10/16/11804578-0dbc-42af-bcd1-3bc7b1394962/the-batman-2022-teaser-poster-batman-01-promo.jpg?auto=webp&fit=bounds&height=900&precrop=1881,1411,x423,y0&width=1200",
                createdAt: new Date(2026, 1, 1),
                onNotificationPress: () => { },
                onAvatarPress: () => { },
                onPostPreviewPress: () => { },
                actionButtons: [
                    { title: "Like", onPress: () => { }, icon: <HeartIcon /> },
                ],
                postPreviewUrl: "https://static01.nyt.com/images/2022/03/01/arts/batman-anatomy1/batman1-square640.jpg",
            },
            {
                id: "3",
                title: "John Doe liked your post.",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                avatar: "https://www.cnet.com/a/img/resize/0e9874cc9d6b18489f832793796d285141496106/hub/2021/10/16/11804578-0dbc-42af-bcd1-3bc7b1394962/the-batman-2022-teaser-poster-batman-01-promo.jpg?auto=webp&fit=bounds&height=900&precrop=1881,1411,x423,y0&width=1200",
                createdAt: new Date(2026, 2, 1),
                onNotificationPress: () => { },
                onAvatarPress: () => { },
                onPostPreviewPress: () => { },
                actionButtons: [
                    { title: "Like", onPress: () => { }, icon: <HeartIcon /> },
                ],
                postPreviewUrl: "https://static01.nyt.com/images/2022/03/01/arts/batman-anatomy1/batman1-square640.jpg",
            },
            {
                id: "4",
                title: "John Doe liked your post.",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                avatar: "https://www.cnet.com/a/img/resize/0e9874cc9d6b18489f832793796d285141496106/hub/2021/10/16/11804578-0dbc-42af-bcd1-3bc7b1394962/the-batman-2022-teaser-poster-batman-01-promo.jpg?auto=webp&fit=bounds&height=900&precrop=1881,1411,x423,y0&width=1200",
                createdAt: new Date(2026, 3, 1),
                onNotificationPress: () => { },
                onAvatarPress: () => { },
                onPostPreviewPress: () => { },
                actionButtons: [
                    { title: "Like", onPress: () => { }, icon: <HeartIcon /> },
                    { title: "Chat", onPress: () => { }, icon: <ChatIcon /> },
                ],
                postPreviewUrl: "https://static01.nyt.com/images/2022/03/01/arts/batman-anatomy1/batman1-square640.jpg",
            },
        ]
        return (
            <NotificationFeed
                {...args}
                notifications={secondaryNotifications}
                listProps={{
                    contentContainerStyle: {
                    }
                }}
            />
        );
    },
};
