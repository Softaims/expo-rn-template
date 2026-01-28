// components/input.stories.tsx
import { View } from "react-native";
import { Meta, StoryObj } from "@storybook/react-native";
import { Button } from "./Button";

const meta = {
  component: Button,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ['primary-lg', 'primary-md', 'primary-sm', 'secondary-lg', 'secondary-md', 'secondary-sm'],
    },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: "Button",
    onPress: () => { },
    disabled: false,
    loading: false,
  },
};