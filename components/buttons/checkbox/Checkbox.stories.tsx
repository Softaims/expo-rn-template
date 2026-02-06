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
    checkedBoxStyle: "bg-primary border-primary h-6",
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

// export const SendIconCheckbox: Story = {
//   args: {
//     label: "Send Task",
//     checked: true,
//     checkedBoxStyle: "bg-purple-500 border-purple-500 rounded-full w-7 h-7",
//     uncheckedBoxStyle: "border-purple-300 rounded-full w-7 h-7",
//     labelStyle: "text-purple-600 font-medium",
//   },
//   render: (args) => (
//     <Checkbox
//       {...args}
//       checkIcon={<SendIcon width={12} height={12} color="#ffffff" />}
//     />
//   ),
// };
