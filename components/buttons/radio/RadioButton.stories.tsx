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
    // inactiveCircleStyle:"border-green-500",
    // inactiveDotStyle:"bg-green-500",
  },
};

export const InactiveSelected: Story = {
  args: {
    label: "Inactive Selected",
    selected: true,
    inactive: true,
  },
};
