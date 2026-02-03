import { View } from "react-native";
import { Meta, StoryObj } from "@storybook/react-native";
import { BarFill } from "./BarFill";

const meta = {
  component: BarFill,
  argTypes: {
    progress: { control: { type: "number", min: 0, max: 100, step: 1 } },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof BarFill>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    progress: 60,
  },
};

export const WithLabel: Story = {
  args: {
    progress: 60,
    label: "Overall Progress: 60%",
    activeStyle: "bg-amber-500",
    inactiveStyle: "bg-gray-100",
    labelStyle: "text-sm text-amber-600 font-medium",
  },
};

export const WithTextInside: Story = {
  args: {
    progress: 75,
    label: "Loading...",
    activeStyle: "bg-blue-600",
    inactiveStyle: "bg-blue-100",
    labelStyle: "text-sm text-blue-700 mt-2",
  },
};

export const CustomStyled: Story = {
  args: {
    progress: 45,
    label: "Upload Progress",
    activeStyle: "bg-gradient-to-r from-green-400 to-green-600",
    inactiveStyle: "bg-green-50",
    labelStyle: "text-base text-green-700 font-bold",
  },
};

export const NoLabel: Story = {
  args: {
    progress: 60,
    activeStyle: "bg-amber-500",
    inactiveStyle: "bg-gray-100",
  },
};
