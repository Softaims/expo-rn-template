import { View } from "react-native";
import { Meta, StoryObj } from "@storybook/react-native";
import { ProgressBar } from "./Progressbar";

const meta = {
  component: ProgressBar,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["stepperDots", "barFill", "barGroup", "circleSteps"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    progress: { control: { type: "number", min: 0, max: 100, step: 1 } },
    currentStep: { control: { type: "number", min: 1 } },
    totalSteps: { control: { type: "number", min: 1 } },
    showLabels: { control: { type: "boolean" } },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof ProgressBar>;

export default meta;

type Story = StoryObj<typeof meta>;

// -------------------
// Basic Variants
// -------------------

export const StepperDots: Story = {
  args: {
    variant: "stepperDots",
    currentStep: 2,
    totalSteps: 5,
    labels: ["One", "Two", "Three", "Four", "Five"],
    showLabels: true,
    size: "md",
    activeColor: "#3b82f6",
    inactiveColor: "#d1d5db",
  },
};

export const CircleSteps: Story = {
  args: {
    variant: "circleSteps",
    currentStep: 3,
    totalSteps: 5,
    labels: ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5"],
    showLabels: true,
    size: "md",
    activeColor: "#10b981",
    inactiveColor: "#d1d5db",
  },
};

export const BarFill: Story = {
  args: {
    variant: "barFill",
    progress: 60,
    labels: ["Start", "Middle", "End"],
    showLabels: true,
    activeColor: "#f59e0b",
    inactiveColor: "#d1d5db",
  },
};

export const BarGroup: Story = {
  args: {
    variant: "barGroup",
    progress: 50,
    currentStep: 4,
    totalSteps: 8,
    // labels: ["1", "2", "3", "4", "5", "6", "7", "8"],
    showLabels: true,
    activeColor: "#ef4444",
    inactiveColor: "#d1d5db",
  },
};

// -------------------
// Sizes
// -------------------

export const SmallStepper: Story = {
  args: { ...StepperDots.args, size: "sm" },
};

export const LargeStepper: Story = {
  args: { ...StepperDots.args, size: "lg" },
};

export const SmallCircle: Story = {
  args: { ...CircleSteps.args, size: "sm" },
};

export const LargeCircle: Story = {
  args: { ...CircleSteps.args, size: "lg" },
};

// -------------------
// Labels Toggle
// -------------------

export const NoLabelsStepper: Story = {
  args: { ...StepperDots.args, showLabels: false },
};

export const NoLabelsBarFill: Story = {
  args: { ...BarFill.args, showLabels: false },
};
