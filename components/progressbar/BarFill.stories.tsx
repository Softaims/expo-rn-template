import { View } from "react-native";
import { Meta, StoryObj } from "@storybook/react-native";
import { storyDecoratorStyle } from "@/lib/storybookLayout";
import { BarFill } from "./BarFill";

const meta = {
  title: "ProgressBars/BarFill",
  component: BarFill,
  argTypes: {
    progress: { control: { type: "number", min: 0, max: 100, step: 1 } },
  },
  decorators: [
    (Story) => (
      <View style={storyDecoratorStyle}>
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
    variant: "bar",
  },
};

export const SliderVariant: Story = {
  args: {
    progress: 60,
    variant: "slider",
  },
};
