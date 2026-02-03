import { View } from "react-native";
import { Meta, StoryObj } from "@storybook/react-native";
import { Checkbox } from "./Checkbox";
import {
  CheckIcon,
  MinusIcon,
  ArrowRightIcon,
  CloseIcon,
  SendIcon,
} from "@/assets/icons";

const meta = {
  component: Checkbox,
  argTypes: {
    checked: {
      control: { type: "boolean" },
    },
    indeterminate: {
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
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

// -------------------
// Basic States
// -------------------

export const Unchecked: Story = {
  args: {
    label: "Unchecked",
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    label: "Checked",
    checked: true,

    containerStyles: "gap-4",
    checkedBoxStyle: "bg-green-500 border-green-500 w-6 h-6",
    // uncheckedBoxStyle: "border-gray-300 w-6 h-6",
  },

  // Use icons from figma
  render: (args) => (
    <Checkbox
      {...args}
      checkIcon={<CheckIcon width={12} height={12} color="#ffffff" />}
    />
  ),
};

export const Indeterminate: Story = {
  args: {
    label: "Indeterminate",
    indeterminate: true,
  },
  render: (args) => (
    <Checkbox
      {...args}
      indeterminateIcon={<MinusIcon width={12} height={12} color="#ffffff" />}
    />
  ),
};

// -------------------
// Disabled States
// -------------------

export const DisabledUnchecked: Story = {
  args: {
    label: "Disabled Unchecked",
    checked: false,
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: "Disabled Checked",
    checked: true,
    disabled: true,
  },
  render: (args) => (
    <Checkbox
      {...args}
      checkIcon={<CheckIcon width={12} height={12} color="#ffffff" />}
    />
  ),
};

export const DisabledIndeterminate: Story = {
  args: {
    label: "Disabled Indeterminate",
    indeterminate: true,
    disabled: true,
  },
  render: (args) => (
    <Checkbox
      {...args}
      indeterminateIcon={<MinusIcon width={12} height={12} color="#ffffff" />}
    />
  ),
};

// -------------------
// Custom Styling
// -------------------

export const CustomColors: Story = {
  args: {
    label: "Custom Colors",
    checked: true,
    checkedBoxStyle: "bg-green-500 border-green-500 w-6 h-6",
    uncheckedBoxStyle: "border-gray-300 w-6 h-6",
    labelStyle: "text-lg font-semibold text-green-600",
  },
  render: (args) => (
    <Checkbox
      {...args}
      checkIcon={<CheckIcon width={14} height={14} color="#ffffff" />}
    />
  ),
};

export const RoundedCheckbox: Story = {
  args: {
    label: "Rounded Checkbox",
    checked: true,
    checkedBoxStyle: "bg-purple-500 border-purple-500 rounded-full w-7 h-7",
    uncheckedBoxStyle: "border-purple-300 rounded-full w-7 h-7",
    labelStyle: "text-purple-600 font-medium",
  },
  render: (args) => (
    <Checkbox
      {...args}
      checkIcon={<CheckIcon width={14} height={14} color="#ffffff" />}
    />
  ),
};

export const CustomIndeterminate: Story = {
  args: {
    label: "Custom Indeterminate",
    indeterminate: true,
    indeterminateBoxStyle: "bg-orange-500 border-orange-500 w-6 h-6",
    labelStyle: "text-orange-600 font-semibold",
  },
  render: (args) => (
    <Checkbox
      {...args}
      indeterminateIcon={<MinusIcon width={12} height={12} color="#ffffff" />}
    />
  ),
};

// -------------------
// Custom Icons
// -------------------

export const ArrowIcon: Story = {
  args: {
    label: "Arrow Check Icon",
    checked: true,
    checkedBoxStyle: "bg-blue-600 border-blue-600 rounded-full",
    labelStyle: "text-blue-600 font-bold",
  },
  render: (args) => (
    <Checkbox
      {...args}
      checkIcon={<ArrowRightIcon width={14} height={14} color="#ffffff" />}
    />
  ),
};

export const SendIconCheckbox: Story = {
  args: {
    label: "Send Task",
    checked: true,
    checkedBoxStyle: "bg-purple-500 border-purple-500 rounded-full w-7 h-7",
    uncheckedBoxStyle: "border-purple-300 rounded-full w-7 h-7",
    labelStyle: "text-purple-600 font-medium",
  },
  render: (args) => (
    <Checkbox
      {...args}
      checkIcon={<SendIcon width={12} height={12} color="#ffffff" />}
    />
  ),
};

export const CloseIconIndeterminate: Story = {
  args: {
    label: "Custom Indeterminate Icon",
    indeterminate: true,
    indeterminateBoxStyle: "bg-red-500 border-red-500 rounded-lg",
    labelStyle: "text-red-600",
  },
  render: (args) => (
    <Checkbox
      {...args}
      indeterminateIcon={<CloseIcon width={12} height={12} color="#ffffff" />}
    />
  ),
};

// -------------------
// No Label
// -------------------

export const NoLabel: Story = {
  args: {
    checked: true,
  },
  render: (args) => (
    <Checkbox
      {...args}
      checkIcon={<CheckIcon width={12} height={12} color="#ffffff" />}
    />
  ),
};

// -------------------
// Large Size
// -------------------

export const LargeCheckbox: Story = {
  args: {
    label: "Large Checkbox",
    checked: true,
    checkedBoxStyle: "bg-blue-500 border-blue-500 w-8 h-8",
    uncheckedBoxStyle: "border-gray-300 w-8 h-8",
    labelStyle: "text-xl font-bold",
  },
  render: (args) => (
    <Checkbox
      {...args}
      checkIcon={<CheckIcon width={16} height={16} color="#ffffff" />}
    />
  ),
};
