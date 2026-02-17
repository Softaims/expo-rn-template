import { Meta, StoryObj } from "@storybook/react-native";
import { useState } from "react";
import { View } from "react-native";
import { Checkbox } from "./Checkbox";

const meta = {
  title: "Buttons/Checkbox",
  component: Checkbox,
  argTypes: {
    value: {
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

// Interactive wrapper for stories
const InteractiveCheckbox = (args: any) => {
  const [checked, setChecked] = useState(args.value || false);
  return <Checkbox {...args} value={checked} onValueChange={setChecked} />;
};

// Basic States
export const Unchecked: Story = {
  args: {
    label: "Unchecked",
    value: false,
    onValueChange: () => {},
  },
  render: InteractiveCheckbox,
};

export const Checked: Story = {
  args: {
    label: "Checked",
    value: true,
    onValueChange: () => {},
  },
  render: InteractiveCheckbox,
};

export const Indeterminate: Story = {
  args: {
    label: "Indeterminate",
    value: false,
    indeterminate: true,
    onValueChange: () => {},
  },
  render: InteractiveCheckbox,
};

// Disabled States
export const DisabledUnchecked: Story = {
  args: {
    label: "Disabled Unchecked",
    value: false,
    disabled: true,
    onValueChange: () => {},
  },
};

export const DisabledChecked: Story = {
  args: {
    label: "Disabled Checked",
    value: true,
    disabled: true,
    onValueChange: () => {},
  },
};

export const DisabledIndeterminate: Story = {
  args: {
    label: "Disabled Indeterminate",
    value: false,
    indeterminate: true,
    disabled: true,
    onValueChange: () => {},
  },
};

// Custom Styling
export const CustomStyling: Story = {
  args: {
    label: "Custom Styled",
    value: true,
    checkedBoxStyle: "bg-purple-500 border-purple-500 rounded-lg",
    uncheckedBoxStyle: "border-purple-300 rounded-lg",
    labelStyle: "text-purple-600 font-semibold",
    onValueChange: () => {},
  },
  render: InteractiveCheckbox,
};
