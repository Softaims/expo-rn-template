import { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";
import { useState } from "react";
import { OTPInput } from "./OTPInput";

const meta = {
  title: "Inputs/OTPInput",
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

export const OTP: Story = {
    args: {
      otp: "",
      setOtp: () => {},
    },
    render: (args) => {
      const [otp, setOtp] = useState("");
      return <OTPInput {...args} otp={otp} setOtp={setOtp} />;
    },
  };
