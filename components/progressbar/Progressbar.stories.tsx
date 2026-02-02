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
    size: "md",
    activeStyle: "bg-blue-500 border-blue-500",
    inactiveStyle: "bg-gray-200 border-gray-300",
    currentStyle: "bg-white",
  },
};

export const CircleSteps: Story = {
  args: {
    variant: "circleSteps",
    currentStep: 3,
    totalSteps: 5,
    labels: ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5"],
    size: "md",
    activeStyle: "bg-green-500 border-green-500",
    inactiveStyle: "bg-gray-200 border-gray-300",
    textInsideStyle: "text-white font-semibold",
  },
};

export const BarFill: Story = {
  args: {
    variant: "barFill",
    progress: 60,
    label: "Overall Progress: 60%",
    activeStyle: "bg-amber-500",
    inactiveStyle: "bg-gray-100",
    labelStyle: "text-sm text-amber-600 font-medium",
  },
};

export const BarGroup: Story = {
  args: {
    variant: "barGroup",
    progress: 50,
    currentStep: 4,
    totalSteps: 8,
    activeStyle: "bg-red-500",
    inactiveStyle: "bg-gray-200",
    currentStyle: "bg-white border-2 border-red-500",
  },
};

// -------------------
// Text Inside Progress
// -------------------

export const BarFillWithText: Story = {
  args: {
    variant: "barFill",
    progress: 75,
    textInside: "75%",
    label: "Loading...",
    activeStyle: "bg-blue-600",
    inactiveStyle: "bg-blue-100",
    textInsideStyle: "text-white font-bold text-xs",
    labelStyle: "text-sm text-blue-700 mt-2",
  },
};

export const StepperDotsWithText: Story = {
  args: {
    variant: "stepperDots",
    currentStep: 3,
    totalSteps: 5,
    textInside: ["1", "2", "3", "4", "5"],
    activeStyle: "bg-purple-500 border-purple-500",
    inactiveStyle: "bg-gray-200 border-gray-300",
    textInsideStyle: "text-white text-xs font-bold",
    size: "lg",
  },
};

export const CircleStepsWithIcons: Story = {
  args: {
    variant: "circleSteps",
    currentStep: 3,
    totalSteps: 5,
    textInside: ["✓", "✓", "✓", "4", "5"],
    activeStyle: "bg-teal-500 border-teal-500",
    inactiveStyle: "bg-gray-100 border-gray-300",
    textInsideStyle: "text-white font-bold",
  },
};

// -------------------
// Sizes
// -------------------

export const SmallStepper: Story = {
  args: {
    variant: "stepperDots",
    currentStep: 2,
    totalSteps: 5,
    size: "sm",
    activeStyle: "bg-indigo-500 border-indigo-500",
    inactiveStyle: "bg-gray-200 border-gray-300",
  },
};

export const LargeStepper: Story = {
  args: {
    variant: "stepperDots",
    currentStep: 3,
    totalSteps: 5,
    size: "lg",
    activeStyle: "bg-pink-500 border-pink-500",
    inactiveStyle: "bg-gray-200 border-gray-300",
  },
};

export const SmallCircle: Story = {
  args: {
    variant: "circleSteps",
    currentStep: 2,
    totalSteps: 5,
    size: "sm",
    activeStyle: "bg-green-500 border-green-500",
    inactiveStyle: "bg-gray-200 border-gray-300",
  },
};

export const LargeCircle: Story = {
  args: {
    variant: "circleSteps",
    currentStep: 3,
    totalSteps: 5,
    size: "lg",
    activeStyle: "bg-green-500 border-green-500",
    inactiveStyle: "bg-gray-200 border-gray-300",
  },
};

// -------------------
// Custom Styling Examples
// -------------------

export const CustomStyledStepper: Story = {
  args: {
    variant: "stepperDots",
    currentStep: 3,
    totalSteps: 5,
    labels: ["Start", "Process", "Review", "Test", "Deploy"],
    activeStyle: "bg-gradient-to-r from-blue-500 to-purple-500 border-purple-500",
    inactiveStyle: "bg-gray-100 border-gray-300",
    currentStyle: "bg-yellow-300",
    labelStyle: "text-xs text-purple-600 font-semibold mt-2",
  },
};

export const CustomStyledBarFill: Story = {
  args: {
    variant: "barFill",
    progress: 45,
    label: "Upload Progress",
    textInside: "45%",
    activeStyle: "bg-gradient-to-r from-green-400 to-green-600",
    inactiveStyle: "bg-green-50",
    textInsideStyle: "text-white font-extrabold",
    labelStyle: "text-base text-green-700 font-bold",
  },
};

export const CustomStyledCircle: Story = {
  args: {
    variant: "circleSteps",
    currentStep: 2,
    totalSteps: 4,
    labels: ["Plan", "Build", "Test", "Launch"],
    activeStyle: "bg-orange-500 border-orange-500 shadow-lg",
    inactiveStyle: "bg-white border-gray-300 shadow-sm",
    textInsideStyle: "text-white font-black text-lg",
    labelStyle: "text-sm text-orange-600 font-semibold mt-3",
  },
};

// -------------------
// No Labels Examples
// -------------------

export const NoLabelsStepper: Story = {
  args: {
    variant: "stepperDots",
    currentStep: 3,
    totalSteps: 5,
    activeStyle: "bg-blue-500 border-blue-500",
    inactiveStyle: "bg-gray-200 border-gray-300",
  },
};

export const NoLabelsBarFill: Story = {
  args: {
    variant: "barFill",
    progress: 60,
    activeStyle: "bg-amber-500",
    inactiveStyle: "bg-gray-100",
  },
};

export const NoLabelsCircle: Story = {
  args: {
    variant: "circleSteps",
    currentStep: 2,
    totalSteps: 4,
    activeStyle: "bg-purple-500 border-purple-500",
    inactiveStyle: "bg-gray-200 border-gray-300",
  },
};
