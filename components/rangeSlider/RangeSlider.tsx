import React from "react";
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";
import RangeSliderLib from "react-native-sticky-range-slider";

const THUMB_RADIUS = 12;

export interface RangeSliderProps {
  min: number;
  max: number;
  step?: number;
  low: number;
  high: number;
  onValueChanged: (low: number, high: number) => void;

  // Custom styling (style objects only)
  thumbStyle?: ViewStyle;
  lowThumbStyle?: ViewStyle;
  highThumbStyle?: ViewStyle;
  railStyle?: ViewStyle;
  railSelectedStyle?: ViewStyle;
  valueTextStyle?: TextStyle;

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
  thumbStyle,
  lowThumbStyle,
  highThumbStyle,
  railStyle,
  railSelectedStyle,
  valueTextStyle,
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
        thumbStyle,
        type === "high" ? highThumbStyle : lowThumbStyle,
      ]}
    />
  );

  // Default rail component
  const DefaultRail = () => (
    <View style={[styles.rail, railStyle]} />
  );

  // Default selected rail component
  const DefaultRailSelected = () => (
    <View style={[styles.railSelected, railSelectedStyle]} />
  );

  // Default value renderers
  const DefaultLowValue = (value: number) => (
    <Text style={[styles.valueText, valueTextStyle]}>{value}</Text>
  );

  const DefaultHighValue = (value: number) => (
    <Text style={[styles.valueText, valueTextStyle]}>{value}</Text>
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
    width: THUMB_RADIUS * 2,
    height: THUMB_RADIUS * 2,
    borderRadius: THUMB_RADIUS,
    backgroundColor: "#000",
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
    borderRadius: 2,
    backgroundColor: "#000",
  },
  valueText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937",
  },
});
