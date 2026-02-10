import { Meta, StoryObj } from "@storybook/react-native";
import { Pressable, View } from "react-native";
import { Text } from "../text";
import { Alert, AlertProvider, useAlert } from "./Alert";

const meta = {
    title: "Alerts/Alert",
    component: AlertProvider,
    decorators: [
        (Story) => (
            <AlertProvider>
                <View className="flex-1 p-4">
                    <Story />
                </View>
            </AlertProvider>
        ),
    ],
} satisfies Meta<typeof AlertProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

// Demo component using the static Alert API
export const Basic: Story = {
    args: {
        children: null,
    },
    render: () => {
        return (
            <Pressable
                onPress={() => {
                    Alert.alert("Hello!", "This is a basic alert message.");
                }}
                className="bg-primary px-6 py-3 rounded-lg"
            >
                <Text className="text-white font-semibold text-center">
                    Alert.alert()
                </Text>
            </Pressable>
        )
    },
};

// Demo with custom buttons
export const WithTwoButtons: Story = {
    args: {
        children: null,
    },
    render: () => {
        return (
            <Pressable
                onPress={() => {
                    Alert.alert(
                        "Confirm Action",
                        "Are you sure you want to proceed?",
                        [
                            { text: "Cancel", variant: "secondary" },
                            { text: "Confirm", onPress: () => console.log("Confirmed!") },
                        ],
                        {

                        }
                    );
                }}
                className="bg-primary px-6 py-3 rounded-lg"
            >
                <Text className="text-white font-semibold text-center">
                    Two Buttons
                </Text>
            </Pressable>
        )
    },
};

// Demo using the hook
export const UsingHook: Story = {
    args: {
        children: null,
    },
    render: () => {
        const { alert } = useAlert();

        return (
            <Pressable
                onPress={() => {
                    alert(
                        "Using Hook",
                        "This alert was triggered using the useAlert() hook.",
                        [{ text: "Got it!" }]
                    );
                }}
                className="bg-primary px-6 py-3 rounded-lg"
            >
                <Text className="text-white font-semibold text-center">
                    useAlert() Hook
                </Text>
            </Pressable>
        );
    },
};

// Demo with custom animation
export const SlideInAnimation: Story = {
    args: {
        children: null,
    },
    render: () => {
        return (
            <Pressable
                onPress={() => {
                    Alert.alert(
                        "Slide Animation",
                        "This alert slides in from the bottom.",
                        [{ text: "Close" }],
                        {
                            animationIn: "slideInUp",
                            animationOut: "slideOutDown",
                        }
                    );
                }}
                className="bg-primary px-6 py-3 rounded-lg"
            >
                <Text className="text-white font-semibold text-center">
                    Slide Animation
                </Text>
            </Pressable>
        );
    },
};

// Demo with zoom animation
export const ZoomAnimation: Story = {
    args: {
        children: null,
    },
    render: () => {
        return (
            <Pressable
                onPress={() => {
                    Alert.alert(
                        "Zoom Animation",
                        "This alert zooms in and out.",
                        [{ text: "Close" }],
                        {
                            animationIn: "zoomIn",
                            animationOut: "zoomOut",
                        }
                    );
                }}
                className="bg-primary px-6 py-3 rounded-lg"
            >
                <Text className="text-white font-semibold text-center">
                    Zoom Animation
                </Text>
            </Pressable>
        );
    },
};

// Demo with custom content
export const CustomContent: Story = {
    args: {
        children: null,
    },
    render: () => {
        return (
            <Pressable
                onPress={() => {
                    Alert.custom(
                        <View className="items-center">
                            <View className="w-16 h-16 bg-green-100 rounded-full items-center justify-center mb-4">
                                <Text className="text-3xl">✓</Text>
                            </View>
                            <Text className="text-lg font-semibold mb-2">Success!</Text>
                            <Text className="text-gray-600 text-center mb-4">
                                Your action was completed successfully.
                            </Text>
                            <Pressable
                                onPress={() => Alert.dismiss()}
                                className="bg-primary px-8 py-3 rounded-lg"
                            >
                                <Text className="text-white font-semibold">Continue</Text>
                            </Pressable>
                        </View>
                    );
                }}
                className="bg-primary px-6 py-3 rounded-lg"
            >
                <Text className="text-white font-semibold text-center">
                    Custom Content
                </Text>
            </Pressable>
        );
    },
};
