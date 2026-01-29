import { View } from "react-native";
import { Meta, StoryObj } from "@storybook/react-native";
import { Checkbox } from "./Checkbox";

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

export const Unchecked: Story = {
  args: {
    label: "Unchecked",
    checked: false,
    onCheckedChange: (checked) => console.log("Checked:", checked),
  },
};

export const DisableUnchecked: Story = {
  args: {
    label: "Disable Unchecked",
    checked: false,
    disabled: true,
    onCheckedChange: (checked) => console.log("Checked:", checked),
  },
};

export const Checked: Story = {
  args: {
    label: "Checked",
    checked: true,
    onCheckedChange: (checked) => console.log("Checked:", checked),
  },
};

export const DisableChecked: Story = {
  args: {
    label: "Disable Checked",
    checked: true,
    disabled: true,
    onCheckedChange: (checked) => console.log("Checked:", checked),
  },
};

export const Intermediate: Story = {
  args: {
    label: "Intermediate",
    checked: true,
    indeterminate: true,
    onCheckedChange: (checked) => console.log("Checked:", checked),
  },
};

export const DisableIntermediate: Story = {
  args: {
    label: "Disable Intermediate",
    checked: true,
    indeterminate: true,
    disabled: true,
    onCheckedChange: (checked) => console.log("Checked:", checked),
  },
};
