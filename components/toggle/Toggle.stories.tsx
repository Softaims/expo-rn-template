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

// -------------------
// Basic States
// -------------------

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

// -------------------
// Disabled States
// -------------------

export const DisabledInactive: Story = {
  args: {
    label: "Disabled Inactive",
    value: false,
    disabled: true,
  },
};

export const DisabledActive: Story = {
  args: {
    label: "Disabled Active",
    value: true,
    disabled: true,
  },
};
