import { View } from "react-native";
import { Meta, StoryObj } from "@storybook/react-native";
import { Toggle } from "./Toggle";

const meta = {
  title: "Toggles/Toggle",
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


export const DisabledInactive: Story = {
  args: {
    label: "Disable Inactive",
    value: false,
    disabled: true,
    disabledInactiveTrackStyle: "bg-gray-300",
    disabledInactiveThumbStyle: "bg-white shadow-sm",
    disabledLabelStyle: "text-gray-500",
  },
};

export const DisabledActive: Story = {
  args: {
    label: "Disable Active",
    value: true,
    disabled: true,
    disabledActiveTrackStyle: "bg-white shadow-sm",
    disabledActiveThumbStyle: "bg-gray-300",
    disabledLabelStyle: "text-gray-500",
  },
};
