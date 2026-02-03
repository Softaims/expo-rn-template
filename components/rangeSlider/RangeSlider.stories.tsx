import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Meta, StoryObj } from "@storybook/react-native";
import { RangeSlider } from "./RangeSlider";

const THUMB_RADIUS = 12;

// Custom thumb component
const CustomThumb = (type: "high" | "low") => (
  <View
    style={[
      styles.thumb,
      { backgroundColor: type === "high" ? "#3b82f6" : "#8b5cf6" },
    ]}
  />
);

// Custom rail component
const CustomRail = () => <View style={styles.rail} />;

// Custom selected rail component
const CustomRailSelected = () => <View style={styles.railSelected} />;

// Custom value renderers
const CustomLowValue = (value: number) => (
  <Text style={styles.valueText}>{value}</Text>
);

const CustomHighValue = (value: number) => (
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

const BasicExample = () => {
  const [low, setLow] = useState(20);
  const [high, setHigh] = useState(80);

  return (
    <RangeSlider
      min={0}
      max={100}
      step={1}
      low={low}
      high={high}
      onValueChanged={(newLow, newHigh) => {
        setLow(newLow);
        setHigh(newHigh);
        console.log(`Range: ${newLow} - ${newHigh}`);
      }}
    />
  );
};

export const Basic = () => <BasicExample />;

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
      renderThumb={CustomThumb}
      renderRail={CustomRail}
      renderRailSelected={CustomRailSelected}
      renderLowValue={CustomLowValue}
      renderHighValue={CustomHighValue}
      onValueChanged={(newLow, newHigh) => {
        setLow(newLow);
        setHigh(newHigh);
        console.log(`Custom Range: ${newLow} - ${newHigh}`);
      }}
    />
  );
};

export const CustomStyled = () => <CustomStyledExample />;

const ColorCustomExample = () => {
  const [low, setLow] = useState(25);
  const [high, setHigh] = useState(75);

  return (
    <RangeSlider
      min={0}
      max={100}
      step={5}
      low={low}
      high={high}
      lowThumbColor="#10b981"
      highThumbColor="#ef4444"
      railColor="#d1d5db"
      railSelectedColor="#6366f1"
      onValueChanged={(newLow, newHigh) => {
        setLow(newLow);
        setHigh(newHigh);
      }}
    />
  );
};

export const ColorCustom = () => <ColorCustomExample />;

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
