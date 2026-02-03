import { View } from "react-native";
import { Meta, StoryObj } from "@storybook/react-native";
import { BarGroup } from "./BarGroup";

const meta = {
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
  },
};

export const CustomStyled: Story = {
  args: {
    progress: 50,
    currentStep: 4,
    totalSteps: 8,
    activeThumbStyle: "bg-red-500",
    inactiveThumbStyle: "bg-gray-200",
    currentThumbStyle: "bg-white border-2 border-red-500",
  },
};

export const WithTextInside: Story = {
  args: {
    steps: [
      { id: 1, textInside: "1" },
      { id: 2, textInside: "2" },
      { id: 3, textInside: "3" },
      { id: 4, textInside: "4" },
      { id: 5, textInside: "5" },
      { id: 6, textInside: "6" },
      { id: 7, textInside: "7" },
      { id: 8, textInside: "8" },
    ],
    progress: 50,
    currentStep: 4,
    textInsideStyle: "text-white font-bold text-xs",
    activeThumbStyle: "bg-blue-500",
    inactiveThumbStyle: "bg-gray-200",
  },
};
