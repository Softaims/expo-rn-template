import { View } from "react-native";
import { Meta, StoryObj } from "@storybook/react-native";
import { Toggle } from "./Toggle";

const meta = {
  component: Toggle,
  argTypes: {
    value: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Toggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Inactive: Story = {
  args: {
    label: "Inactive",
    value: false,
    onValueChange: (value) => console.log("Toggle value:", value),
  },
};

export const Active: Story = {
  args: {
    label: "Active",
    value: true,
    onValueChange: (value) => console.log("Toggle value:", value),
  },
};

export const DisableInactive: Story = {
  args: {
    label: "Disable Inactive",
    value: false,
    disabled: true,
    onValueChange: (value) => console.log("Toggle value:", value),
  },
};

export const DisableActive: Story = {
  args: {
    label: "Disable Active",
    value: true,
    disabled: true,
    onValueChange: (value) => console.log("Toggle value:", value),
  },
};
