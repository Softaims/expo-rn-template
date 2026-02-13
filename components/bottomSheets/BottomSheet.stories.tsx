import { Meta, StoryObj } from "@storybook/react-native";
import { Pressable, Text, TextInput, View } from "react-native";
import { BottomSheet } from "./BottomSheet";
import { useState } from "react";

const meta = {
    title: "BottomSheets/BottomSheet",
    component: BottomSheet,
    decorators: [
        (Story) => (
            <View>
                <Story />
            </View>
        ),
    ],
} satisfies Meta<typeof BottomSheet>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultBottomSheet: Story = {
    args: {
        isVisible: true,
        setIsVisible: () => { },
        title: 'Bottom Sheet Title',
        description: 'Bottom Sheet Description',
        buttonTitle: 'Continue',
    },
    render: (args) => {
        const [isVisible, setIsVisible] = useState(args.isVisible);
        return (
            <>
                <Pressable onPress={() => { setIsVisible(true); }}>
                    <Text>Open Bottom Sheet</Text>
                </Pressable>
                <BottomSheet
                    {...args}
                    isVisible={isVisible}
                    setIsVisible={setIsVisible}
                    onBackdropPress={() => { console.log('backdrop pressed'); }}
                />
            </>
        );
    },
};