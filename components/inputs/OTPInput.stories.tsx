import { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";
import { OTPInput } from "./OTPInput";

const meta = {
    component: OTPInput,
    decorators: [
        (Story) => (
            <View style={{ padding: 16 }}>
                <Story />
            </View>
        ),
    ],
} satisfies Meta<typeof OTPInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultField: Story = {
    args: {
        otp:'12345',
        setOtp: () => {},
    },
};