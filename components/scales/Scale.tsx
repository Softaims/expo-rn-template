import { View } from 'react-native';
import { RulerPicker, RulerPickerProps } from 'react-native-ruler-picker';
import { Text } from '../text';
import { useMemo } from 'react';

export interface ScaleProps extends RulerPickerProps {
    variant: 'age' | 'height' | 'weight';
    label?: string;

}

export function Scale(props: ScaleProps) {

    const renderHeader = useMemo(() => {
        if (!props.label) return null;
        
        return (
            <View>
                <Text variant='subheading3'>{props.label}</Text>
            </View>
        )
    }, [props.label]);

    return (
        <View>
            {renderHeader}
            <RulerPicker
                min={props.min || 0}
                max={props.max || 240}
                step={props.step || 1}
                fractionDigits={0}
                initialValue={0}
                onValueChange={(number) => console.log(number)}
                onValueChangeEnd={(number) => console.log(number)}
                unit="cm"
            />
        </View>
    )
}

// import React, { useMemo } from "react";
// import { View } from "react-native";
// import { Gesture, GestureDetector } from "react-native-gesture-handler";
// import Animated, {
//     runOnJS,
//     useAnimatedStyle,
//     useSharedValue,
//     withSpring,
// } from "react-native-reanimated";
// import { Text } from "../text";

// // ============================================================================
// // Types & Defaults
// // ============================================================================

// export interface ScaleProps {
//   value: number;
//   onChange: (value: number) => void;
//   min?: number;
//   max?: number;
//   step?: number;
//   /** Orientation of the scale */
//   orientation?: "horizontal" | "vertical";
//   /** Label shown in the pill/tab (e.g., "Years", "CM", "Kg") */
//   label?: string;
//   /** Show adjacent values on sides (for horizontal) */
//   showSideValues?: boolean;
//   /** Show value labels on ruler ticks (for vertical) */
//   showTickLabels?: boolean;
//   // Configurable dimensions
//   /** Height of the ruler track (vertical) or width (horizontal) */
//   rulerSize?: number;
//   /** Spacing between ticks */
//   tickSpacing?: number;
//   /** Height/thickness of each tick */
//   tickHeight?: number;
//   // Styling (Tailwind class names)
//   containerClassName?: string;
//   labelClassName?: string;
//   labelPillClassName?: string;
//   valueClassName?: string;
//   tickClassName?: string;
//   thumbClassName?: string;
//   trackClassName?: string;
//   sideValueClassName?: string;
//   indicatorClassName?: string;
// }

// // Default configuration values
// const DEFAULT_TICK_HEIGHT = 2;
// const DEFAULT_TICK_SPACING = 12;
// const DEFAULT_RULER_SIZE_VERTICAL = 400;
// const DEFAULT_RULER_SIZE_HORIZONTAL = 200;

// // Tick widths for vertical scale
// const TICK_WIDTH_SMALL = 16;
// const TICK_WIDTH_MEDIUM = 28;
// const TICK_WIDTH_LARGE = 50;

// // Spring configuration
// const SPRING_CONFIG = {
//   damping: 20,
//   stiffness: 200,
// };

// // ============================================================================
// // Helper Functions (UI Thread Compatible)
// // ============================================================================

// /**
//  * Creates axis-agnostic configuration based on orientation
//  */
// function createAxisConfig(
//   isVertical: boolean,
//   rulerSize: number,
//   totalSteps: number,
//   stepSize: number
// ) {
//   const centerOffset = isVertical ? rulerSize / 2 : 0;
//   const maxTranslate = centerOffset;
//   const minTranslate = -totalSteps * stepSize + centerOffset;

//   return {
//     centerOffset,
//     maxTranslate,
//     minTranslate,
//   };
// }

// /**
//  * Converts a step index to translate position
//  * Works on UI thread (no JS dependencies)
//  */
// function stepIndexToTranslate(
//   stepIndex: number,
//   stepSize: number,
//   centerOffset: number
// ): number {
//   "worklet";
//   return -stepIndex * stepSize + centerOffset;
// }

// /**
//  * Converts translate position to step index
//  * Works on UI thread (no JS dependencies)
//  */
// function translateToStepIndex(
//   translateValue: number,
//   stepSize: number,
//   centerOffset: number
// ): number {
//   "worklet";
//   return Math.round((centerOffset - translateValue) / stepSize);
// }

// /**
//  * Clamps translate value within bounds
//  * Works on UI thread
//  */
// function clampTranslate(
//   translateValue: number,
//   minTranslate: number,
//   maxTranslate: number
// ): number {
//   "worklet";
//   return Math.max(minTranslate, Math.min(maxTranslate, translateValue));
// }

// /**
//  * Clamps step index within valid range
//  * Works on UI thread
//  */
// function clampStepIndex(stepIndex: number, totalSteps: number): number {
//   "worklet";
//   return Math.max(0, Math.min(totalSteps, stepIndex));
// }

// /**
//  * Converts step index to actual value
//  */
// function stepIndexToValue(stepIndex: number, min: number, step: number): number {
//   "worklet";
//   return min + stepIndex * step;
// }

// /**
//  * Converts value to step index
//  */
// function valueToStepIndex(value: number, min: number, step: number): number {
//   return Math.round((value - min) / step);
// }

// // ============================================================================
// // Tick Rendering
// // ============================================================================

// interface TickConfig {
//   totalSteps: number;
//   min: number;
//   step: number;
//   isVertical: boolean;
//   showTickLabels: boolean;
//   tickHeight: number;
//   tickSpacing: number;
//   tickClassName?: string;
// }

// function generateTicks(config: TickConfig): React.ReactNode[] {
//   const {
//     totalSteps,
//     min,
//     step,
//     isVertical,
//     showTickLabels,
//     tickHeight,
//     tickSpacing,
//     tickClassName,
//   } = config;

//   const ticks: React.ReactNode[] = [];

//   for (let i = 0; i <= totalSteps; i++) {
//     const tickValue = min + i * step;

//     if (isVertical) {
//       // Tick sizing based on step index:
//       // - Every 5th index = medium with label
//       // - Others = small
//       const isMedium = i % 5 === 0;

//       // Alternating color sections: every 10 indices alternate
//       const sectionIndex = Math.floor(i / 10);
//       const isAlternateSection = sectionIndex % 2 === 1;

//       const tickWidth = isMedium ? TICK_WIDTH_MEDIUM : TICK_WIDTH_SMALL;
//       const tickColor = isAlternateSection ? "bg-neutral-300" : "bg-neutral-400";

//       ticks.push(
//         <View
//           key={i}
//           className="flex-row items-center justify-end"
//           style={{ height: tickHeight + tickSpacing }}
//         >
//           {showTickLabels && isMedium && (
//             <Text className="text-sm text-neutral-400 mr-3 w-[36px] text-right">
//               {tickValue}
//             </Text>
//           )}
//           {showTickLabels && !isMedium && (
//             <View className="w-[36px] mr-3" />
//           )}
//           <View
//             className={`${tickColor} ${tickClassName || ""}`}
//             style={{ height: tickHeight, width: tickWidth }}
//           />
//         </View>
//       );
//     } else {
//       // Horizontal: every 5th index is major
//       const isMajor = i % 5 === 0;
//       ticks.push(
//         <View
//           key={i}
//           className={`bg-black rounded-sm ${tickClassName || ""}`}
//           style={{ width: tickHeight, height: isMajor ? 32 : 20 }}
//         />
//       );
//     }
//   }

//   return ticks;
// }

// // ============================================================================
// // Main Component
// // ============================================================================

// export function Scale({
//   value,
//   onChange,
//   min = 1,
//   max = 100,
//   step = 1,
//   orientation = "horizontal",
//   label = "",
//   showSideValues = true,
//   showTickLabels = true,
//   rulerSize: rulerSizeProp,
//   tickSpacing = DEFAULT_TICK_SPACING,
//   tickHeight = DEFAULT_TICK_HEIGHT,
//   containerClassName,
//   labelClassName,
//   labelPillClassName,
//   valueClassName,
//   tickClassName,
//   thumbClassName,
//   trackClassName,
//   sideValueClassName,
//   indicatorClassName,
// }: ScaleProps) {
//   const isVertical = orientation === "vertical";

//   // Resolve ruler size based on orientation
//   const rulerSize = rulerSizeProp ?? (isVertical ? DEFAULT_RULER_SIZE_VERTICAL : DEFAULT_RULER_SIZE_HORIZONTAL);

//   // Derived calculations
//   const totalSteps = Math.floor((max - min) / step);
//   const stepSize = tickHeight + tickSpacing;

//   // Axis configuration
//   const axisConfig = useMemo(
//     () => createAxisConfig(isVertical, rulerSize, totalSteps, stepSize),
//     [isVertical, rulerSize, totalSteps, stepSize]
//   );

//   // Shared values for animation
//   const translate = useSharedValue(
//     stepIndexToTranslate(valueToStepIndex(value, min, step), stepSize, axisConfig.centerOffset)
//   );
//   const startTranslate = useSharedValue(0);
//   const lastReportedStepIndex = useSharedValue(valueToStepIndex(value, min, step));

//   // Sync translate when value prop changes externally
//   const currentStepIndex = valueToStepIndex(value, min, step);
//   if (lastReportedStepIndex.value !== currentStepIndex) {
//     lastReportedStepIndex.value = currentStepIndex;
//     translate.value = stepIndexToTranslate(currentStepIndex, stepSize, axisConfig.centerOffset);
//   }

//   // Callback to update value (called from UI thread only when step changes)
//   const handleValueChange = (newStepIndex: number) => {
//     const clampedIndex = Math.max(0, Math.min(totalSteps, newStepIndex));
//     const newValue = min + clampedIndex * step;
//     if (newValue !== value) {
//       onChange(newValue);
//     }
//   };

//   // Pan gesture handler
//   const panGesture = useMemo(
//     () =>
//       Gesture.Pan()
//         .onStart(() => {
//           startTranslate.value = translate.value;
//         })
//         .onUpdate((event) => {
//           // Get delta based on orientation
//           const delta = isVertical ? event.translationY : event.translationX;
//           const newTranslate = startTranslate.value + delta;

//           // Clamp translate within bounds
//           translate.value = clampTranslate(
//             newTranslate,
//             axisConfig.minTranslate,
//             axisConfig.maxTranslate
//           );

//           // Calculate step index from current position
//           const stepIndex = translateToStepIndex(
//             translate.value,
//             stepSize,
//             axisConfig.centerOffset
//           );
//           const clampedStepIndex = clampStepIndex(stepIndex, totalSteps);

//           // Only call JS when step index actually changes
//           if (clampedStepIndex !== lastReportedStepIndex.value) {
//             lastReportedStepIndex.value = clampedStepIndex;
//             runOnJS(handleValueChange)(clampedStepIndex);
//           }
//         })
//         .onEnd(() => {
//           // Snap to nearest step
//           const stepIndex = translateToStepIndex(
//             translate.value,
//             stepSize,
//             axisConfig.centerOffset
//           );
//           const clampedStepIndex = clampStepIndex(stepIndex, totalSteps);
//           const snappedTranslate = stepIndexToTranslate(
//             clampedStepIndex,
//             stepSize,
//             axisConfig.centerOffset
//           );

//           translate.value = withSpring(snappedTranslate, SPRING_CONFIG);
//         }),
//     [isVertical, axisConfig, stepSize, totalSteps, min, step, value, onChange]
//   );

//   // Animated style for tick container
//   const ticksAnimatedStyle = useAnimatedStyle(() => ({
//     transform: isVertical
//       ? [{ translateY: translate.value }]
//       : [{ translateX: translate.value }],
//   }));

//   // Memoized tick generation
//   const ticks = useMemo(
//     () =>
//       generateTicks({
//         totalSteps,
//         min,
//         step,
//         isVertical,
//         showTickLabels,
//         tickHeight,
//         tickSpacing,
//         tickClassName,
//       }),
//     [totalSteps, min, step, isVertical, showTickLabels, tickHeight, tickSpacing, tickClassName]
//   );

//   // Side labels for horizontal mode
//   const leftValue = Math.max(min, value - step);
//   const rightValue = Math.min(max, value + step);

//   // ============================================================================
//   // Render: Vertical Layout
//   // ============================================================================

//   if (isVertical) {
//     return (
//       <View className={`items-center py-5 ${containerClassName || ""}`}>
//         {/* Label pill */}
//         {label && (
//           <View
//             className={`bg-neutral-100 px-10 py-3 rounded-full border border-neutral-200 mb-6 ${labelPillClassName || ""}`}
//           >
//             <Text className={`text-base font-medium text-neutral-500 ${labelClassName || ""}`}>
//               {label}
//             </Text>
//           </View>
//         )}

//         <View className="flex-row items-center">
//           {/* Current value display */}
//           <Text className={`text-4xl font-bold text-black mr-1 ${valueClassName || ""}`}>
//             {value}
//           </Text>

//           {/* Fixed center indicator (dot + line) */}
//           <View className={`flex-row items-center z-10 ${indicatorClassName || ""}`}>
//             <View className="w-2.5 h-2.5 rounded-full bg-black" />
//             <View style={{ width: TICK_WIDTH_LARGE, height: 2 }} className="bg-black" />
//           </View>

//           {/* Ruler - scale moves behind the fixed indicator */}
//           <View
//             className={`overflow-hidden ${trackClassName || ""}`}
//             style={{ height: rulerSize, width: 100, marginLeft: -TICK_WIDTH_LARGE }}
//           >
//             <GestureDetector gesture={panGesture}>
//               <Animated.View
//                 className="absolute top-0 right-0"
//                 style={ticksAnimatedStyle}
//               >
//                 {ticks}
//               </Animated.View>
//             </GestureDetector>
//           </View>
//         </View>
//       </View>
//     );
//   }

//   // ============================================================================
//   // Render: Horizontal Layout
//   // ============================================================================

//   return (
//     <View className={`items-center py-5 ${containerClassName || ""}`}>
//       {/* Label pill */}
//       {label && (
//         <View
//           className={`bg-neutral-100 px-10 py-3 rounded-full border border-neutral-200 mb-6 ${labelPillClassName || ""}`}
//         >
//           <Text className={`text-base font-medium text-neutral-500 ${labelClassName || ""}`}>
//             {label}
//           </Text>
//         </View>
//       )}

//       {/* Current value display */}
//       <Text className={`text-5xl font-semibold text-black mb-4 ${valueClassName || ""}`}>
//         {value}
//       </Text>

//       {/* Scale container */}
//       <View className="flex-row items-center gap-4">
//         {/* Left value indicator */}
//         {showSideValues && (
//           <Text className={`text-base text-neutral-400 w-[30px] text-center ${sideValueClassName || ""}`}>
//             {leftValue}
//           </Text>
//         )}

//         {/* Tick marks track */}
//         <View
//           className={`overflow-hidden justify-center items-center ${trackClassName || ""}`}
//           style={{ width: rulerSize, height: 50 }}
//         >
//           <GestureDetector gesture={panGesture}>
//             <Animated.View
//               className="flex-row items-end absolute"
//               style={[{ left: "50%", gap: tickSpacing }, ticksAnimatedStyle]}
//             >
//               {ticks}
//             </Animated.View>
//           </GestureDetector>

//           {/* Center indicator (thumb) */}
//           <View
//             className={`w-2.5 h-2.5 rounded-full bg-black absolute bottom-0 ${thumbClassName || ""}`}
//           />
//         </View>

//         {/* Right value indicator */}
//         {showSideValues && (
//           <Text className={`text-base text-neutral-400 w-[30px] text-center ${sideValueClassName || ""}`}>
//             {rightValue}
//           </Text>
//         )}
//       </View>
//     </View>
//   );
// }
