import { View } from "react-native";
import { Meta, StoryObj } from "@storybook/react-native";
import { Stepper } from "./Stepper";

const meta = {
  title: "ProgressBars/Stepper",
  component: Stepper,
  argTypes: {
    currentStep: { control: { type: "number", min: 1 } },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Stepper>;

export default meta;

type Story = StoryObj<typeof meta>;

// Example steps structure:
const steps = [
  { id: 1, title: "One", textInside: "1" },
  { id: 2, title: "Two", textInside: "2" },
  { id: 3, title: "Three", textInside: "3" },
  { id: 4, title: "Four", textInside: "4" },
];

const stepsWithoutTextInside = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

export const Basic: Story = {
  args: {
    steps: steps,
    currentStep: 2,
    activeThumbStyle: "bg-primary",
    inactiveThumbStyle: "bg-gray-200 border-gray-300",
    currentThumbStyle: "bg-muted border-primary border-[1px]",
    activeThumbLabelStyle: "text-white font-semibold",
    inactiveThumbLabelStyle: "text-muted-foreground font-semibold",
    currentThumbLabelStyle: "text-primary font-semibold",
    activeTitleStyle: "text-primary font-semibold",
    progressbarActiveStyle: "h-[1px]",
    progressbarInactiveStyle: "h-[1px]",
  },
};

export const WithoutSteps: Story = {
  args: {
    steps: stepsWithoutTextInside,
    currentStep: 2,
    activeThumbStyle: "bg-primary",
    inactiveThumbStyle: "border-gray-300",
    // currentThumbStyle: "bg-muted border-primary border-[1px]",
    activeThumbLabelStyle: "text-white font-semibold",
    // progressbarActiveStyle: "h-[1px]",
  },
};
