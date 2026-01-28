// components/input.stories.tsx
import { View } from "react-native";
import { Meta, StoryObj } from "@storybook/react-native";
import { Input } from "./input";

const meta = {
    component: Input,
    decorators: [
      (Story) => (
        <View style={{ padding: 16 }}>
          <Story />
        </View>
      ),
    ],
  } satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {
        label: "First Name",
        placeholder: "John",
        error: "",
        disabled: false,
    },
};