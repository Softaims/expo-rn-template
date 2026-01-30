import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Meta, StoryObj } from "@storybook/react-native";
import RangeSlider from "react-native-sticky-range-slider";

const THUMB_RADIUS = 12;

// Custom thumb component
const Thumb = (type: "high" | "low") => (
  <View
    style={[
      styles.thumb,
      { backgroundColor: type === "high" ? "#3b82f6" : "#8b5cf6" },
    ]}
  />
);

// Custom rail component
const Rail = () => <View style={styles.rail} />;

// Custom selected rail component
const RailSelected = () => <View style={styles.railSelected} />;

// Custom value renderers
const LowValue = (value: number) => (
  <Text style={styles.valueText}>{value}</Text>
);

const HighValue = (value: number) => (
  <Text style={styles.valueText}>{value}</Text>
);

const meta = {
  component: RangeSlider,
  decorators: [
    (Story) => (
      <View style={{ padding: 16, paddingVertical: 40 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof RangeSlider>;

export default meta;

type Story = StoryObj<typeof meta>;

const CustomStyledExample = () => {
  const [low, setLow] = useState(30);
  const [high, setHigh] = useState(70);

  return (
    <RangeSlider
      min={0}
      max={100}
      step={1}
      low={low}
      high={high}
      renderThumb={Thumb}
      renderRail={Rail}
      renderRailSelected={RailSelected}
      renderLowValue={LowValue}
      renderHighValue={HighValue}
      onValueChanged={(newLow, newHigh) => {
        setLow(newLow);
        setHigh(newHigh);
        console.log(`Custom Range: ${newLow} - ${newHigh}`);
      }}
    />
  );
};

export const CustomStyled: Story = {
  render: () => <CustomStyledExample />,
};

const styles = StyleSheet.create({
  thumb: {
    width: THUMB_RADIUS * 2,
    height: THUMB_RADIUS * 2,
    borderRadius: THUMB_RADIUS,
    borderWidth: 2,
    borderColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  rail: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#e5e7eb",
  },
  railSelected: {
    height: 4,
    backgroundColor: "#3b82f6",
    borderRadius: 2,
  },
  valueText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937",
  },
});
