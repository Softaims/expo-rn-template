import { View } from "react-native";
import { Meta, StoryObj } from "@storybook/react-native";
import { BarGroup } from "./BarGroup";

const meta = {
  title: "ProgressBars/BarGroup",
  component: BarGroup,
  argTypes: {
    progress: { control: { type: "number", min: 0, max: 100, step: 1 } },
    currentStep: { control: { type: "number", min: 1 } },
    totalSteps: { control: { type: "number", min: 1 } },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof BarGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    progress: 50,
    currentStep: 4,
    totalSteps: 8,
    variant: "dot",
  },
};

export const BarVariantMiddle: Story = {
  args: {
    progress: 62.5,
    currentStep: 5,
    totalSteps: 8,
    variant: "bar",
  },
};