import { useState } from "react";
import { View } from "react-native";
import { Meta, StoryObj } from "@storybook/react-native";
import { RadioButton } from "./RadioButton";

const meta = {
  title: "Buttons/RadioButton",
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

// Interactive wrapper for stories
const InteractiveRadio = (args: any) => {
  const [selected, setSelected] = useState(args.selected || false);
  return <RadioButton {...args} selected={selected} onSelect={() => setSelected(true)} />;
};

// Basic States
export const Unselected: Story = {
  args: {
    label: "Unselected",
    selected: false,
  },
  render: InteractiveRadio,
};

export const Selected: Story = {
  args: {
    label: "Selected",
    selected: true,
  },
  render: InteractiveRadio,
};

// Inactive States
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

const RadioGroup = () => {
  const [selected, setSelected] = useState("option1");

  return (
    <View className="gap-3">
      <RadioButton
        label="Option 1"
        selected={selected === "option1"}
        onSelect={() => setSelected("option1")}
      />
      <RadioButton
        label="Option 2"
        selected={selected === "option2"}
        onSelect={() => setSelected("option2")}
      />
      <RadioButton
        label="Option 3"
        selected={selected === "option3"}
        onSelect={() => setSelected("option3")}
      />
    </View>
  );
};

export const RadioGroupExample: Story = {
  render: RadioGroup,
};
