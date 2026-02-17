import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Meta, StoryObj } from "@storybook/react-native";
import { RangeSlider } from "./RangeSlider";

const THUMB_RADIUS = 12;

const meta = {
  title: "RangeSliders/RangeSlider",
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
      lowThumbStyle={{ backgroundColor: "#000" }}
      highThumbStyle={{ backgroundColor: "#000" }}
      railSelectedStyle={{ backgroundColor: "#000" }}
      onValueChanged={(newLow, newHigh) => {
        setLow(newLow);
        setHigh(newHigh);
        console.log(`Range: ${newLow} - ${newHigh}`);
      }}
    />
  );
};

export const Basic = () => <BasicExample />;

const SingleValueExample = () => {
  const [value, setValue] = useState(50);

  return (
    <RangeSlider
      min={0}
      max={100}
      step={1}
      single
      low={value}
      high={value}
      thumbStyle={{ backgroundColor: "#000" }}
      railSelectedStyle={{ backgroundColor: "red" }}
      onValueChanged={(newValue) => {
        setValue(newValue);
        console.log(`Value: ${newValue}`);
      }}
    />
  );
};

export const SingleValue = () => <SingleValueExample />;
