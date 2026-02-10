import React, { useCallback, useEffect } from "react";
import { View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";
import { Text } from "../text";

export interface FeetInchesScaleProps {
  feet: number;
  inches: number;
  onChange: (feet: number, inches: number) => void;
  minFeet?: number;
  maxFeet?: number;
  // Styling (Tailwind class names)
  containerClassName?: string;
  labelClassName?: string;
  valueClassName?: string;
  pickerClassName?: string;
  selectedRowClassName?: string;
  itemClassName?: string;
  activeItemClassName?: string;
}

const ITEM_HEIGHT = 50;
const VISIBLE_ITEMS = 7;

export function FeetInchesScale({
  feet,
  inches,
  onChange,
  minFeet = 1,
  maxFeet = 9,
  containerClassName,
  labelClassName,
  valueClassName,
  pickerClassName,
  selectedRowClassName,
  itemClassName,
  activeItemClassName,
}: FeetInchesScaleProps) {
  return (
    <View className={`items-center py-5 ${containerClassName || ""}`}>
      <View className={`flex-row gap-10 ${pickerClassName || ""}`}>
        {/* Feet picker */}
        <ScrollPicker
          value={feet}
          min={minFeet}
          max={maxFeet}
          onChange={(val) => onChange(val, inches)}
          label="FT"
          valueClassName={valueClassName}
          labelClassName={labelClassName}
          selectedRowClassName={selectedRowClassName}
          itemClassName={itemClassName}
          activeItemClassName={activeItemClassName}
        />

        {/* Inches picker */}
        <ScrollPicker
          value={inches}
          min={0}
          max={11}
          onChange={(val) => onChange(feet, val)}
          label="In"
          valueClassName={valueClassName}
          labelClassName={labelClassName}
          selectedRowClassName={selectedRowClassName}
          itemClassName={itemClassName}
          activeItemClassName={activeItemClassName}
        />
      </View>
    </View>
  );
}

// Individual scroll picker
interface ScrollPickerProps {
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  label: string;
  valueClassName?: string;
  labelClassName?: string;
  selectedRowClassName?: string;
  itemClassName?: string;
  activeItemClassName?: string;
}

function ScrollPicker({
  value,
  min,
  max,
  onChange,
  label,
  valueClassName,
  labelClassName,
  selectedRowClassName,
  itemClassName,
  activeItemClassName,
}: ScrollPickerProps) {
  const translateY = useSharedValue(0);
  const startY = useSharedValue(0);

  const totalItems = max - min + 1;

  useEffect(() => {
    const index = value - min;
    translateY.value = -index * ITEM_HEIGHT;
  }, []);

  const updateValue = useCallback(
    (newValue: number) => {
      const clampedValue = Math.max(min, Math.min(max, Math.round(newValue)));
      if (clampedValue !== value) {
        onChange(clampedValue);
      }
    },
    [min, max, value, onChange]
  );

  const panGesture = Gesture.Pan()
    .onStart(() => {
      startY.value = translateY.value;
    })
    .onUpdate((event) => {
      const newTranslateY = startY.value + event.translationY;
      const maxTranslate = 0;
      const minTranslate = -(totalItems - 1) * ITEM_HEIGHT;
      translateY.value = Math.max(minTranslate, Math.min(maxTranslate, newTranslateY));

      const index = Math.round(-translateY.value / ITEM_HEIGHT);
      const newValue = min + index;
      runOnJS(updateValue)(newValue);
    })
    .onEnd(() => {
      const index = Math.round(-translateY.value / ITEM_HEIGHT);
      translateY.value = withSpring(-index * ITEM_HEIGHT, {
        damping: 20,
        stiffness: 200,
      });
    });

  const pickerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  // Generate items
  const items = [];
  for (let i = min; i <= max; i++) {
    items.push(
      <View
        key={i}
        className="justify-center items-center"
        style={{ height: ITEM_HEIGHT }}
      >
        <Text
          className={`text-2xl text-neutral-300 ${itemClassName || ""} ${
            i === value ? `text-3xl font-semibold text-black ${activeItemClassName || ""}` : ""
          }`}
        >
          {i}
        </Text>
      </View>
    );
  }

  return (
    <View className="w-20 items-center">
      <View
        className="overflow-hidden w-full"
        style={{ height: ITEM_HEIGHT * VISIBLE_ITEMS }}
      >
        <GestureDetector gesture={panGesture}>
          <Animated.View
            className="items-center"
            style={[{ marginTop: ITEM_HEIGHT * 3 }, pickerAnimatedStyle]}
          >
            {items}
          </Animated.View>
        </GestureDetector>

        {/* Selection indicator row */}
        <View
          className={`absolute left-0 right-0 justify-center items-center ${selectedRowClassName || ""}`}
          style={{ top: ITEM_HEIGHT * 3, height: ITEM_HEIGHT }}
          pointerEvents="none"
        >
          {/* Top line */}
          <View className="absolute top-0 left-0 right-0 h-px bg-neutral-200" />

          {/* Content */}
          <View className="flex-row items-baseline gap-1">
            <Text className={`text-3xl font-semibold text-black ${valueClassName || ""}`}>
              {value}
            </Text>
            <Text className={`text-sm font-medium text-neutral-500 ${labelClassName || ""}`}>
              {label}
            </Text>
          </View>

          {/* Bottom line */}
          <View className="absolute bottom-0 left-0 right-0 h-px bg-neutral-200" />
        </View>
      </View>
    </View>
  );
}
