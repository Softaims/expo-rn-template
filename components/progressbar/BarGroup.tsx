import { View, Text } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
  interpolate,
  interpolateColor,
  SharedValue,
  Easing,
} from "react-native-reanimated";
import { cn } from "@/lib/utils";
import { useColorScheme } from "nativewind";

// Example steps structure:
// const steps = [
//   {
//     id: 1,
//     textInside: "1", // optional - text to display inside bar
//   },
//   {
//     id: 2,
//     textInside: "2",
//   },
//   {
//     id: 3,
//     textInside: "3",
//   }
// ]

export interface BarStep {
  id: number;
  textInside?: string;
}

export interface BarGroupProps {
  steps?: BarStep[];
  totalSteps?: number; // Only used if steps is not provided
  currentStep: number;
  progress: number;
  containerStyles?: string;

  // Thumb styles for individual bars
  activeThumbStyle?: string;
  inactiveThumbStyle?: string;
  currentThumbStyle?: string;

  // Text inside bars style
  textInsideStyle?: string;

  // Variant: "dot" (default) or "bar" (active becomes wider)
  variant?: "dot" | "bar";

  // Animated step value for smooth transitions
  animatedStep?: SharedValue<number>;
}

const TIMING_CONFIG = {
  duration: 300,
  easing: Easing.bezier(0.25, 0.1, 0.25, 1),
};

// Animated bar item component for smooth transitions
function AnimatedBarItem({
  stepNumber,
  animatedStep,
  isActive,
}: {
  stepNumber: number;
  animatedStep: SharedValue<number>;
  isActive: boolean;
}) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  // Colors based on theme
  const primaryColor = isDark ? "#FFFFFF" : "#000000";
  const mutedColor = isDark ? "#374151" : "#E5E7EB";

  const animatedStyle = useAnimatedStyle(() => {
    // Calculate how "active" this step should be (0 to 1)
    const distance = Math.abs(animatedStep.value - stepNumber);
    const activeProgress = interpolate(distance, [0, 0.5, 1], [1, 0.3, 0], "clamp");

    // Interpolate width: 8 (dot) to 32 (bar)
    const width = interpolate(activeProgress, [0, 1], [8, 32]);

    // Interpolate color
    const backgroundColor = interpolateColor(
      activeProgress,
      [0, 1],
      [mutedColor, primaryColor]
    );

    return {
      width,
      backgroundColor,
    };
  });

  return (
    <Animated.View
      style={animatedStyle}
      className="h-2 rounded-full items-center justify-center"
    />
  );
}

export function BarGroup({
  steps,
  totalSteps = 8,
  currentStep,
  progress = 0,
  containerStyles,
  activeThumbStyle,
  inactiveThumbStyle,
  currentThumbStyle,
  textInsideStyle,
  variant = "dot",
  animatedStep,
}: BarGroupProps) {
  const effectiveProgress = Math.min(Math.max(progress, 0), 100);

  // Use steps if provided, otherwise generate based on totalSteps
  const barSteps: BarStep[] = steps || Array.from({ length: totalSteps }, (_, i) => ({ id: i + 1 }));
  const numSteps = barSteps.length;
  const current = Math.max(1, Math.min(currentStep, numSteps));

  // Default styles
  const defaultActiveThumbStyle = "bg-primary border-primary";
  const defaultInactiveThumbStyle = "bg-muted border-muted";
  const defaultCurrentThumbStyle = "bg-white border-primary border-[1px] ";

  if (variant === "bar") {
    // If animatedStep is provided, use animated bars
    if (animatedStep) {
      return (
        <View className={cn("w-full", containerStyles)}>
          <View className="flex-row items-center gap-3">
            {barSteps.map((step, i) => {
              const stepNumber = i + 1;
              return (
                <AnimatedBarItem
                  key={step.id}
                  stepNumber={stepNumber}
                  animatedStep={animatedStep}
                  isActive={stepNumber === current}
                />
              );
            })}
          </View>
        </View>
      );
    }

    // Bar variant without animation: only current step is wider with primary color
    return (
      <View className={cn("w-full", containerStyles)}>
        <View className="flex-row items-center gap-3">
          {barSteps.map((step, i) => {
            const stepNumber = i + 1;
            const isCurrent = stepNumber === current;

            return (
              <View
                key={step.id}
                className={cn(
                  isCurrent ? "h-2 w-8 rounded-full" : "h-2 w-2 rounded-full",
                  "items-center justify-center",
                  isCurrent
                    ? cn(defaultActiveThumbStyle, activeThumbStyle)
                    : cn(defaultInactiveThumbStyle, inactiveThumbStyle),
                )}
              >
                {step.textInside && (
                  <Text className={cn("text-xs font-medium", textInsideStyle)}>
                    {step.textInside}
                  </Text>
                )}
              </View>
            );
          })}
        </View>
      </View>
    );
  }

  // Default "dot" variant with progress-based filling
  return (
    <View className={cn("w-full", containerStyles)}>
      <View className="flex-row items-center gap-3">
        {barSteps.map((step, i) => {
          const stepNumber = i + 1;
          const filled = stepNumber / numSteps <= effectiveProgress / 100;
          const isCurrent = stepNumber === current;

          return (
            <View
              key={step.id}
              className={cn(
                "h-2 w-2 rounded-full items-center justify-center",
                isCurrent
                  ? cn(defaultCurrentThumbStyle, currentThumbStyle)
                  : filled
                    ? cn(defaultActiveThumbStyle, activeThumbStyle)
                    : cn(defaultInactiveThumbStyle, inactiveThumbStyle),
              )}
            >
              {step.textInside && (
                <Text className={cn("text-xs font-medium", textInsideStyle)}>
                  {step.textInside}
                </Text>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
}
