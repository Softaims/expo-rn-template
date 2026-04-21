import React, { useMemo } from "react";
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";
import RangeSliderLib from "react-native-sticky-range-slider";
import { useTheme } from "@/lib/theme";

const THUMB_RADIUS = 12;

export interface RangeSliderProps {
  min: number;
  max: number;
  step?: number;
  low: number;
  high: number;
  single?: boolean;
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
  single = false,
  onValueChanged,
  thumbStyle,
  lowThumbStyle,
  highThumbStyle,
  railStyle,
  valueTextStyle,
  renderThumb,
  renderRail,
  renderRailSelected,
  renderLowValue,
  renderHighValue,
}: RangeSliderProps) {
  const { colors, typography } = useTheme();

  const valueTextResolved = useMemo(
    (): TextStyle => ({
      ...typography.textVariants.subheading3,
      color: colors.text,
    }),
    [colors, typography]
  );

  // Default thumb component
  const DefaultThumb = (type: "high" | "low") => (
    <View
      style={[
        styles.thumb,
        { backgroundColor: colors.foreground, shadowColor: colors.foreground },
        thumbStyle,
        type === "high" ? highThumbStyle : lowThumbStyle,
      ]}
    />
  );

  // In single mode with disableRange, the library renders:
  //   rail = full background, railSelected = from low thumb to max
  // Single: rail (#e5e7eb fill) visible from min to thumb, railSelected transparent
  // Range:  rail (#e5e7eb background), railSelected (black between thumbs)
  const DefaultRail = () => (
    <View style={[styles.rail, { backgroundColor: colors.border }, railStyle]} />
  );

  const DefaultRailSelected = () => (
    <View
      style={[
        styles.railSelected,
        { backgroundColor: colors.foreground },
      ]}
    />
  );

  // Default value renderers
  const DefaultLowValue = (value: number) => (
    <Text style={[valueTextResolved, valueTextStyle]}>{value}</Text>
  );

  const DefaultHighValue = (value: number) => {
    if (single) return <></>;
    return <Text style={[valueTextResolved, valueTextStyle]}>{value}</Text>;
  };

  return (
    <RangeSliderLib
      min={min}
      max={max}
      step={step}
      disableRange={single}
      low={single ? high : low}
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
});
