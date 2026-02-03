import { View } from "react-native";
import { Meta, StoryObj } from "@storybook/react-native";
import { Stepper } from "./Stepper";

const meta = {
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
  {
    id: 1,
    title: "One",
  },
  {
    id: 2,
    title: "Two",
  },
  {
    id: 3,
    title: "Three",
  },
  {
    id: 4,
    title: "Four",
  },
];

const stepsWithoutTitles = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
];

const stepsWithTextInside = [
  { id: 1, textInside: "1" },
  { id: 2, textInside: "2" },
  { id: 3, textInside: "3" },
  { id: 4, textInside: "4" },
  { id: 5, textInside: "5" },
];

export const Basic: Story = {
  args: {
    steps: steps,
    currentStep: 2,
    activeThumbStyle: "bg-blue-500 border-blue-500",
    inactiveThumbStyle: "bg-gray-200 border-gray-300",
    currentThumbStyle: "bg-red-500 border-red-500 border-0",
  },
};

export const WithTextInside: Story = {
  args: {
    steps: stepsWithTextInside,
    currentStep: 3,
    activeThumbStyle: "bg-purple-500 border-purple-500",
    inactiveThumbStyle: "bg-gray-200 border-gray-300",
    activeThumbLabelStyle: "text-white text-xs font-bold",
    inactiveThumbLabelStyle: "text-gray-500 text-xs",
  },
};

export const CustomStyled: Story = {
  args: {
    steps: [
      { id: 1, title: "Start" },
      { id: 2, title: "Process" },
      { id: 3, title: "Review" },
      { id: 4, title: "Test" },
      { id: 5, title: "Deploy" },
    ],
    currentStep: 3,
    activeThumbStyle: "bg-gradient-to-r from-blue-500 to-purple-500 border-purple-500",
    inactiveThumbStyle: "bg-gray-100 border-gray-300",
    currentThumbStyle: "bg-yellow-300",
    activeTitleStyle: "text-purple-600 font-semibold",
    inactiveTitleStyle: "text-gray-400",
    progressbarActiveStyle: "bg-purple-500",
    progressbarInactiveStyle: "bg-gray-200",
  },
};

export const NoLabels: Story = {
  args: {
    steps: stepsWithoutTitles,
    currentStep: 3,
    activeThumbStyle: "bg-blue-500 border-blue-500",
    inactiveThumbStyle: "bg-gray-200 border-gray-300",
  },
};
