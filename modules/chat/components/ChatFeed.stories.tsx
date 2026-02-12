import { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";
import { useState } from "react";
import { ChatFeed } from "./ChatFeed";
import { IMessage } from "react-native-gifted-chat";

const meta = {
    title: "Chat/ChatFeed",
    component: ChatFeed,
    decorators: [
        (Story) => (
            <View className="flex-1">
                <Story />
            </View>
        ),
    ],
} satisfies Meta<typeof ChatFeed>;

export default meta;

type Story = StoryObj<typeof meta>;

const USER_ID = 1;
const OTHER_USER_ID = 2;

const AVATAR_URL = "https://www.cnet.com/a/img/resize/0e9874cc9d6b18489f832793796d285141496106/hub/2021/10/16/11804578-0dbc-42af-bcd1-3bc7b1394962/the-batman-2022-teaser-poster-batman-01-promo.jpg?auto=webp&fit=bounds&height=900&precrop=1881,1411,x423,y0&width=1200";

const IMAGE_URL = "https://www.cnet.com/a/img/resize/0e9874cc9d6b18489f832793796d285141496106/hub/2021/10/16/11804578-0dbc-42af-bcd1-3bc7b1394962/the-batman-2022-teaser-poster-batman-01-promo.jpg?auto=webp&fit=bounds&height=900&precrop=1881,1411,x423,y0&width=1200";

const sampleMessages: IMessage[] = [
    {
        _id: 1,
        text: "That's Great, Good to hear This",
        createdAt: new Date(2026, 1, 10, 9, 25),
        user: {
            _id: USER_ID,
            name: 'You',
            avatar: AVATAR_URL,
        },
    },
    {
        _id: 2,
        text: "",
        image: IMAGE_URL,
        createdAt: new Date(2026, 1, 10, 9, 24),
        user: {
            _id: OTHER_USER_ID,
            name: 'Jhon abraham',
            avatar: AVATAR_URL,
        },
    },
    {
        _id: 3,
        text: "That's really great... I really love it",
        createdAt: new Date(2026, 1, 10, 9, 24),
        user: {
            _id: OTHER_USER_ID,
            name: 'Jhon abraham',
            avatar: AVATAR_URL,
        },
    },
    {
        _id: 4,
        text: "Thank you! Glad you liked it. Are you into snowboarding too?",
        createdAt: new Date(2024, 0, 15, 8, 25),
        user: {
            _id: USER_ID,
            name: 'You',
            avatar: AVATAR_URL,
        },
    },
    {
        _id: 5,
        text: "Check out this cool poster!",
        createdAt: new Date(2024, 0, 15, 8, 24),
        user: {
            _id: USER_ID,
            name: 'You',
            avatar: AVATAR_URL,
        },
    },
    {
        _id: 6,
        text: "Hey! Just checking in to see how you're doing 😊 Hope everything is going great on your side",
        createdAt: new Date(2024, 0, 15, 8, 23),
        user: {
            _id: OTHER_USER_ID,
            name: 'Jhon abraham',
            avatar: AVATAR_URL,
        },
    },
    {
        _id: 7,
        text: "",
        image: IMAGE_URL,
        createdAt: new Date(2024, 0, 15, 8, 22),
        user: {
            _id: OTHER_USER_ID,
            name: 'Jhon abraham',
            avatar: AVATAR_URL,
        },
    },
    {
        _id: 8,
        text: "Hello! Jhon abraham",
        createdAt: new Date(2024, 0, 15, 8, 21),
        user: {
            _id: USER_ID,
            name: 'You',
            avatar: AVATAR_URL,
        },
    },
];

export const DefaultChatFeed: Story = {
    args: {
        messages: sampleMessages,
        onMessagesChange: () => { },
        userId: USER_ID,
        userAvatar: AVATAR_URL,
        userName: "You",
    },
    render: (args) => {
        const [messages, setMessages] = useState<IMessage[]>(sampleMessages);
        return (
            <ChatFeed
                {...args}
                messages={messages}
                onMessagesChange={setMessages}
                userId={USER_ID}
                userAvatar={AVATAR_URL}
            />
        );
    },
};
