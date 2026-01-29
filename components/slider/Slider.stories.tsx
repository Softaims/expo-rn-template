import { View } from "react-native";
import { Meta, StoryObj } from "@storybook/react-native";
import RangeSlider from "./Slider";

const meta = {
  component: RangeSlider,
  decorators: [
    (Story) => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof RangeSlider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PriceRangeSliderWide: Story = {
  args: {},
};

