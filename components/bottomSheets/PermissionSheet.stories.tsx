import { Meta, StoryObj } from "@storybook/react-native";
import { Pressable, Text, View } from "react-native";
import { PermissionSheet } from "./PermissionSheet";
import { useState } from "react";

const meta = {
    title: "BottomSheets/PermissionSheet",
    component: PermissionSheet,
    decorators: [
        (Story) => (
            <View>
                <Story />
            </View>
        ),
    ],
} satisfies Meta<typeof PermissionSheet>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CameraPermissionSheetWithImage: Story = {
    args: {
        type: 'camera',
        variant: 'modal-with-image',
        isVisible: true,
        setIsVisible: () => { },
    },
    render: (args) => {
        const [isVisible, setIsVisible] = useState(args.isVisible);
        return (
            <>
                <Pressable onPress={() => { setIsVisible(true); }}>
                    <Text>Open Bottom Sheet</Text>
                </Pressable>
                <PermissionSheet
                    {...args}
                    isVisible={isVisible}
                    setIsVisible={setIsVisible}
                />
            </>
        );
    },
};
export const LocationPermissionSheetWithImage: Story = {
    args: {
        type: 'location',
        variant: 'modal-with-image',
        isVisible: true,
        setIsVisible: () => { },
    },
    render: (args) => {
        const [isVisible, setIsVisible] = useState(args.isVisible);
        return (
            <>
                <Pressable onPress={() => { setIsVisible(true); }}>
                    <Text>Open Bottom Sheet</Text>
                </Pressable>
                <PermissionSheet
                    {...args}
                    isVisible={isVisible}
                    setIsVisible={setIsVisible}
                />
            </>
        );
    },
};
export const MicrophonePermissionSheetWithImage: Story = {
    args: {
        type: 'microphone',
        variant: 'modal-with-image',
        isVisible: true,
        setIsVisible: () => { },
    },
    render: (args) => {
        const [isVisible, setIsVisible] = useState(args.isVisible);
        return (
            <>
                <Pressable onPress={() => { setIsVisible(true); }}>
                    <Text>Open Bottom Sheet</Text>
                </Pressable>
                <PermissionSheet
                    {...args}
                    isVisible={isVisible}
                    setIsVisible={setIsVisible}
                />
            </>
        );
    },
};
export const NotificationPermissionSheetWithImage: Story = {
    args: {
        isVisible: true,
        setIsVisible: () => { },
        type: 'notification',
        variant: 'modal-with-image',
    },
    render: (args) => {
        const [isVisible, setIsVisible] = useState(args.isVisible);
        return (
            <>
                <Pressable onPress={() => { setIsVisible(true); }}>
                    <Text>Open Bottom Sheet</Text>
                </Pressable>
                <PermissionSheet
                    {...args}
                    isVisible={isVisible}
                    setIsVisible={setIsVisible}
                />
            </>
        );
    },
};


export const LocationPermissionSheet: Story = {
    args: {
        type: 'location',
        variant: 'modal',
        isVisible: true,
        setIsVisible: () => { },
    },
    render: (args) => {
        const [isVisible, setIsVisible] = useState(args.isVisible);
        return (
            <>
                <Pressable onPress={() => { setIsVisible(true); }}>
                    <Text>Open Bottom Sheet</Text>
                </Pressable>
                <PermissionSheet
                    {...args}
                    isVisible={isVisible}
                    setIsVisible={setIsVisible}
                />
            </>
        );
    },
};
export const CameraPermissionSheet: Story = {
    args: {
        type: 'camera',
        variant: 'modal',
        isVisible: true,
        setIsVisible: () => { },
    },
    render: (args) => {
        const [isVisible, setIsVisible] = useState(args.isVisible);
        return (
            <>
                <Pressable onPress={() => { setIsVisible(true); }}>
                    <Text>Open Bottom Sheet</Text>
                </Pressable>
                <PermissionSheet
                    {...args}
                    isVisible={isVisible}
                    setIsVisible={setIsVisible}
                />
            </>
        );
    },
};
export const MicrophonePermissionSheet: Story = {
    args: {
        type: 'microphone',
        variant: 'modal',
        isVisible: true,
        setIsVisible: () => { },
    },
    render: (args) => {
        const [isVisible, setIsVisible] = useState(args.isVisible);
        return (
            <>
                <Pressable onPress={() => { setIsVisible(true); }}>
                    <Text>Open Bottom Sheet</Text>
                </Pressable>
                <PermissionSheet
                    {...args}
                    isVisible={isVisible}
                    setIsVisible={setIsVisible}
                />
            </>
        );
    },
};
export const NotificationPermissionSheet: Story = {
    args: {
        isVisible: true,
        setIsVisible: () => { },
        type: 'notification',
        variant: 'modal',
    },
    render: (args) => {
        const [isVisible, setIsVisible] = useState(args.isVisible);
        return (
            <>
                <Pressable onPress={() => { setIsVisible(true); }}>
                    <Text>Open Bottom Sheet</Text>
                </Pressable>
                <PermissionSheet
                    {...args}
                    isVisible={isVisible}
                    setIsVisible={setIsVisible}
                />
            </>
        );
    },
};