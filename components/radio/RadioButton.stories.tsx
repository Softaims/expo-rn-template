import React from "react";
import { View } from "react-native";
import { Meta, StoryObj } from "@storybook/react-native";
import { RadioButton } from "./RadioButton";
import {
  CheckIcon,
  SendIcon,
  ArrowRightIcon,
} from "@/assets/icons";

const meta = {
  component: RadioButton,
  argTypes: {
    selected: {
      control: { type: "boolean" },
    },
    inactive: {
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
} satisfies Meta<typeof RadioButton>;

export default meta;

type Story = StoryObj<typeof meta>;

// -------------------
// Basic States
// -------------------

export const Unselected: Story = {
  args: {
    label: "Unselected",
    selected: false,
  },
};

export const Selected: Story = {
  args: {
    label: "Selected",
    selected: true,
  },
};

// -------------------
// Inactive States
// -------------------

export const InactiveUnselected: Story = {
  args: {
    label: "Inactive Unselected",
    selected: false,
    inactive: true,
  },
};

export const InactiveSelected: Story = {
  args: {
    label: "Inactive Selected",
    selected: true,
    inactive: true,
  },
};

// -------------------
// Custom Styling
// -------------------

export const CustomColors: Story = {
  args: {
    label: "Custom Colors",
    selected: true,
    selectedCircleStyle: "border-blue-600 w-6 h-6",
    unselectedCircleStyle: "border-gray-300 w-6 h-6",
    selectedDotStyle: "bg-blue-600 w-3 h-3",
    labelStyle: "text-lg font-semibold text-blue-600",
  },
};

export const LargeRadio: Story = {
  args: {
    label: "Large Radio",
    selected: true,
    selectedCircleStyle: "border-purple-500 w-8 h-8",
    unselectedCircleStyle: "border-purple-300 w-8 h-8",
    selectedDotStyle: "bg-purple-500 w-4 h-4",
    labelStyle: "text-xl font-bold text-purple-600",
  },
};

export const SquareRadio: Story = {
  args: {
    label: "Square Radio",
    selected: true,
    selectedCircleStyle: "border-purple-500 rounded-none w-6 h-6",
    unselectedCircleStyle: "border-purple-300 rounded-none w-6 h-6",
    selectedDotStyle: "bg-purple-500 w-3 h-3 rounded-none",
    labelStyle: "text-purple-600",
  },
};

export const CustomInactive: Story = {
  args: {
    label: "Custom Inactive",
    selected: true,
    inactive: true,
    inactiveCircleStyle: "border-gray-300 opacity-50 w-6 h-6",
    inactiveDotStyle: "bg-gray-400 w-3 h-3",
    inactiveLabelStyle: "text-gray-400 opacity-50",
  },
};

// -------------------
// Custom Icons
// -------------------

export const CheckIconRadio: Story = {
  args: {
    label: "Check Icon",
    selected: true,
    selectedCircleStyle: "border-green-500 w-7 h-7",
    labelStyle: "text-green-600 font-bold",
  },
  render: (args) => (
    <RadioButton
      {...args}
      selectedIcon={<CheckIcon width={14} height={14} color="#22c55e" />}
    />
  ),
};

export const SendIconRadio: Story = {
  args: {
    label: "Send Option",
    selected: true,
    selectedCircleStyle: "border-orange-500 w-8 h-8",
    labelStyle: "text-orange-600 font-medium text-lg",
  },
  render: (args) => (
    <RadioButton
      {...args}
      selectedIcon={<SendIcon width={16} height={16} color="#f97316" />}
    />
  ),
};

export const ArrowIconRadio: Story = {
  args: {
    label: "Arrow Option",
    selected: true,
    selectedCircleStyle: "border-blue-500 w-7 h-7",
    labelStyle: "text-blue-600 font-semibold",
  },
  render: (args) => (
    <RadioButton
      {...args}
      selectedIcon={<ArrowRightIcon width={14} height={14} color="#3b82f6" />}
    />
  ),
};

// -------------------
// No Label
// -------------------

export const NoLabel: Story = {
  args: {
    selected: true,
    selectedCircleStyle: "border-pink-500 w-6 h-6",
    selectedDotStyle: "bg-pink-500 w-3 h-3",
  },
};

// -------------------
// Radio Group Example
// -------------------

const RadioGroupExample = () => {
  const [selectedValue, setSelectedValue] = React.useState("option1");

  return (
    <View style={{ gap: 12 }}>
      <RadioButton
        label="Option 1"
        selected={selectedValue === "option1"}
        onSelect={() => setSelectedValue("option1")}
      />
      <RadioButton
        label="Option 2"
        selected={selectedValue === "option2"}
        onSelect={() => setSelectedValue("option2")}
      />
      <RadioButton
        label="Option 3"
        selected={selectedValue === "option3"}
        onSelect={() => setSelectedValue("option3")}
      />
    </View>
  );
};

export const RadioGroup: Story = {
  args: {
    label: "Option",
    selected: false,
  },
  render: () => <RadioGroupExample />,
};
