import { View } from "react-native";
import { Meta, StoryObj } from "@storybook/react-native";
import { RadioButton } from "./RadioButton";

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

export const Unselected: Story = {
  args: {
    label: "Unselected",
    selected: false,
    onSelect: () => console.log("Radio selected"),
  },
};

export const Selected: Story = {
  args: {
    label: "Selected",
    selected: true,
    onSelect: () => console.log("Radio selected"),
  },
};

export const InactiveUnselected: Story = {
  args: {
    label: "Inactive Unselected",
    selected: false,
    inactive: true,
    onSelect: () => console.log("Radio selected"),
  },
};

export const InactiveSelected: Story = {
  args: {
    label: "Inactive Selected",
    selected: true,
    inactive: true,
    onSelect: () => console.log("Radio selected"),
  },
};
