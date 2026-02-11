import { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";
import { ChatFeedHeader } from "./ChatFeedHeader";

const meta = {
    title: "Chat/ChatFeedHeader",
    component: ChatFeedHeader,
    decorators: [
        (Story) => (
            <View className="flex-1">
                <Story />
            </View>
        ),
    ],
} satisfies Meta<typeof ChatFeedHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultChatFeedHeader: Story = {
    args: {
        name: "John Doe",
        userName: "john.doe",
        avatar: "https://www.cnet.com/a/img/resize/0e9874cc9d6b18489f832793796d285141496106/hub/2021/10/16/11804578-0dbc-42af-bcd1-3bc7b1394962/the-batman-2022-teaser-poster-batman-01-promo.jpg?auto=webp&fit=bounds&height=900&precrop=1881,1411,x423,y0&width=1200",
    },
    render: (args) => {
        return (
            <ChatFeedHeader {...args} />
        );
    },
};
