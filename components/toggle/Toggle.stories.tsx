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

// -------------------
// Custom Styling
// -------------------

export const CustomColors: Story = {
  args: {
    label: "Custom Colors",
    value: true,
    activeTrackStyle: "bg-green-500 w-14 h-7",
    inactiveTrackStyle: "bg-gray-300 w-14 h-7",
    activeThumbStyle: "w-6 h-6 bg-white shadow-lg",
    inactiveThumbStyle: "w-6 h-6 bg-white",
    labelStyle: "text-lg font-semibold text-green-600",
  },
};

export const LargeToggle: Story = {
  args: {
    label: "Large Toggle",
    value: true,
    activeTrackStyle: "bg-blue-500 w-16 h-8 rounded-xl",
    inactiveTrackStyle: "bg-gray-200 w-16 h-8 rounded-xl",
    activeThumbStyle: "w-7 h-7 bg-white rounded-lg",
    inactiveThumbStyle: "w-7 h-7 bg-white rounded-lg",
    labelStyle: "text-xl font-bold",
  },
};

export const SmallToggle: Story = {
  args: {
    label: "Small Toggle",
    value: true,
    activeTrackStyle: "bg-orange-500 w-10 h-5",
    inactiveTrackStyle: "bg-gray-300 w-10 h-5",
    activeThumbStyle: "w-4 h-4 bg-white",
    inactiveThumbStyle: "w-4 h-4 bg-white",
    labelStyle: "text-sm",
  },
};

export const PurpleTheme: Story = {
  args: {
    label: "Purple Theme",
    value: false,
    activeTrackStyle: "bg-purple-500",
    inactiveTrackStyle: "bg-purple-200",
    activeThumbStyle: "bg-white shadow-md",
    labelStyle: "text-purple-600 tracking-wider",
  },
};

export const CustomDisabled: Story = {
  args: {
    label: "Custom Disabled",
    value: true,
    disabled: true,
    disabledTrackStyle: "bg-gray-200 opacity-40",
    disabledThumbStyle: "bg-gray-400 opacity-60",
    disabledLabelStyle: "text-gray-400 opacity-50",
  },
};

// -------------------
// No Label
// -------------------

export const NoLabel: Story = {
  args: {
    value: true,
    activeTrackStyle: "bg-pink-500",
    inactiveTrackStyle: "bg-gray-300",
  },
};

// -------------------
// Different Track Colors
// -------------------

export const RedToggle: Story = {
  args: {
    label: "Red Toggle",
    value: true,
    activeTrackStyle: "bg-red-500",
    inactiveTrackStyle: "bg-red-200",
    labelStyle: "text-red-600 font-semibold",
  },
};

export const TealToggle: Story = {
  args: {
    label: "Teal Toggle",
    value: true,
    activeTrackStyle: "bg-teal-500",
    inactiveTrackStyle: "bg-teal-200",
    activeThumbStyle: "bg-white shadow-xl",
    labelStyle: "text-teal-600 font-semibold",
  },
};

export const RoundedThumb: Story = {
  args: {
    label: "Square Thumb",
    value: true,
    activeTrackStyle: "bg-indigo-500",
    inactiveTrackStyle: "bg-gray-200",
    activeThumbStyle: "bg-white rounded-sm w-5 h-5",
    inactiveThumbStyle: "bg-white rounded-sm w-5 h-5",
    labelStyle: "text-indigo-600",
  },
};
