import { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";
import { NotificationCard } from "./NotificationCard";
import { Notification } from "../types";
import { HeartIcon } from "@/assets/icons";

const meta = {
    title: "Notifications/NotificationCard",
    component: NotificationCard,
    decorators: [
        (Story) => (
            <View className="flex-1">
                <Story />
            </View>
        ),
    ],
} satisfies Meta<typeof NotificationCard>;

export default meta;

type Story = StoryObj<typeof meta>;

const primaryNotification: Notification = {
    id: "1",
    title: "John Doe liked your post.",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    avatar: "https://www.cnet.com/a/img/resize/0e9874cc9d6b18489f832793796d285141496106/hub/2021/10/16/11804578-0dbc-42af-bcd1-3bc7b1394962/the-batman-2022-teaser-poster-batman-01-promo.jpg?auto=webp&fit=bounds&height=900&precrop=1881,1411,x423,y0&width=1200",
    createdAt: new Date(),
    onNotificationPress: () => { },
}

export const PrimaryNotificationCard: Story = {
    args: {
        variant: "primary",
        notification: primaryNotification,
    },
    render: (args) => {
        return (
            <NotificationCard {...args} />
        );
    },
};

const secondaryNotification: Notification = {
    id: "2",
    title: "John Doe liked your post.",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    avatar: "https://www.cnet.com/a/img/resize/0e9874cc9d6b18489f832793796d285141496106/hub/2021/10/16/11804578-0dbc-42af-bcd1-3bc7b1394962/the-batman-2022-teaser-poster-batman-01-promo.jpg?auto=webp&fit=bounds&height=900&precrop=1881,1411,x423,y0&width=1200",
    onAvatarPress: () => { },
    postPreviewUrl: "https://www.cnet.com/a/img/resize/0e9874cc9d6b18489f832793796d285141496106/hub/2021/10/16/11804578-0dbc-42af-bcd1-3bc7b1394962/the-batman-2022-teaser-poster-batman-01-promo.jpg?auto=webp&fit=bounds&height=900&precrop=1881,1411,x423,y0&width=1200",
    onPostPreviewPress: () => { },
    actionButtons: [
        { title: "Like", onPress: () => { } },
        { title: "Reply", onPress: () => { } },
    ],
    createdAt: new Date(),
    onNotificationPress: () => { },
}

export const SecondaryNotificationCard: Story = {
    args: {
        variant: "secondary",
        notification: secondaryNotification,
    },
    render: (args) => {
        return (
            <NotificationCard {...args} />
        );
    },
};

const secondaryNotificationWithActionButtonsIconss: Notification = {
    id: "3",
    title: "John Doe liked your post.",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    avatar: "https://www.cnet.com/a/img/resize/0e9874cc9d6b18489f832793796d285141496106/hub/2021/10/16/11804578-0dbc-42af-bcd1-3bc7b1394962/the-batman-2022-teaser-poster-batman-01-promo.jpg?auto=webp&fit=bounds&height=900&precrop=1881,1411,x423,y0&width=1200",
    onAvatarPress: () => { },
    postPreviewUrl: "https://www.cnet.com/a/img/resize/0e9874cc9d6b18489f832793796d285141496106/hub/2021/10/16/11804578-0dbc-42af-bcd1-3bc7b1394962/the-batman-2022-teaser-poster-batman-01-promo.jpg?auto=webp&fit=bounds&height=900&precrop=1881,1411,x423,y0&width=1200",
    onPostPreviewPress: () => { },
    actionButtons: [],
    createdAt: new Date(),
    onNotificationPress: () => { },
}

export const secondaryNotificationWithActionButtonsIcons: Story = {
    args: {
        variant: "secondary",
        notification: secondaryNotificationWithActionButtonsIconss,
    },
    render: (args) => {
        return (
            <NotificationCard
                {...args}
                notification={
                    {
                        ...secondaryNotificationWithActionButtonsIconss,
                        actionButtons: [
                            { title: "Like", onPress: () => { }, icon: <HeartIcon /> },
                        ]
                    }
                }
            />
        );
    },
};
