import React from "react";
import { View, Text, StyleSheet } from "react-native";
import RangeSliderLib from "react-native-sticky-range-slider";

const THUMB_RADIUS = 12;

export interface RangeSliderProps {
  min: number;
  max: number;
  step?: number;
  low: number;
  high: number;
  onValueChanged: (low: number, high: number) => void;

  // Custom styling
  thumbRadius?: number;
  lowThumbColor?: string;
  highThumbColor?: string;
  railColor?: string;
  railSelectedColor?: string;

  // Custom renderers (optional)
  renderThumb?: (type: "high" | "low") => React.ReactElement;
  renderRail?: () => React.ReactElement;
  renderRailSelected?: () => React.ReactElement;
  renderLowValue?: (value: number) => React.ReactElement;
  renderHighValue?: (value: number) => React.ReactElement;
}

export function RangeSlider({
  min,
  max,
  step = 1,
  low,
  high,
  onValueChanged,
  thumbRadius = THUMB_RADIUS,
  lowThumbColor = "#8b5cf6",
  highThumbColor = "#3b82f6",
  railColor = "#e5e7eb",
  railSelectedColor = "#3b82f6",
  renderThumb,
  renderRail,
  renderRailSelected,
  renderLowValue,
  renderHighValue,
}: RangeSliderProps) {
  // Default thumb component
  const DefaultThumb = (type: "high" | "low") => (
    <View
      style={[
        styles.thumb,
        {
          width: thumbRadius * 2,
          height: thumbRadius * 2,
          borderRadius: thumbRadius,
          backgroundColor: type === "high" ? highThumbColor : lowThumbColor,
        },
      ]}
    />
  );

  // Default rail component
  const DefaultRail = () => (
    <View style={[styles.rail, { backgroundColor: railColor }]} />
  );

  // Default selected rail component
  const DefaultRailSelected = () => (
    <View style={[styles.railSelected, { backgroundColor: railSelectedColor }]} />
  );

  // Default value renderers
  const DefaultLowValue = (value: number) => (
    <Text style={styles.valueText}>{value}</Text>
  );

  const DefaultHighValue = (value: number) => (
    <Text style={styles.valueText}>{value}</Text>
  );

  return (
    <RangeSliderLib
      min={min}
      max={max}
      step={step}
      low={low}
      high={high}
      renderThumb={renderThumb || DefaultThumb}
      renderRail={renderRail || DefaultRail}
      renderRailSelected={renderRailSelected || DefaultRailSelected}
      renderLowValue={renderLowValue || DefaultLowValue}
      renderHighValue={renderHighValue || DefaultHighValue}
      onValueChanged={onValueChanged}
    />
  );
}

const styles = StyleSheet.create({
  thumb: {
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
  },
  railSelected: {
    height: 4,
    borderRadius: 2,
  },
  valueText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937",
  },
});
