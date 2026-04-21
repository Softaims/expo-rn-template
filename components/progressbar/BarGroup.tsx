import { View, Text } from "react-native";
import Animated, {
  useAnimatedStyle,
  interpolate,
  interpolateColor,
  SharedValue,
} from "react-native-reanimated";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";
import {
  barAnimatedHeights,
  barSolidLabel,
  barSolidSegment,
  dotLabel,
  dotThumb,
  styles,
} from "./BarGroup.styles";

export interface BarStep {
  id: number;
  textInside?: string;
}

export interface BarGroupProps {
  steps?: BarStep[];
  totalSteps?: number;
  currentStep: number;
  progress: number;
  containerStyles?: string;

  activeThumbStyle?: string;
  inactiveThumbStyle?: string;
  currentThumbStyle?: string;

  textInsideStyle?: string;

  variant?: "dot" | "bar";

  animatedStep?: SharedValue<number>;
}

function AnimatedBarItem({
  stepNumber,
  animatedStep,
}: {
  stepNumber: number;
  animatedStep: SharedValue<number>;
}) {
  const { colors } = useTheme();
  const primaryColor = colors.primary;
  const mutedColor = colors.border;
  const { dot, wide } = barAnimatedHeights();

  const animatedStyle = useAnimatedStyle(() => {
    const distance = Math.abs(animatedStep.value - stepNumber);
    const activeProgress = interpolate(distance, [0, 0.5, 1], [1, 0.3, 0], "clamp");

    const width = interpolate(activeProgress, [0, 1], [dot, wide]);

    const backgroundColor = interpolateColor(
      activeProgress,
      [0, 1],
      [mutedColor, primaryColor]
    );

    return {
      width,
      backgroundColor,
      height: dot,
      borderRadius: 9999,
      alignItems: "center",
      justifyContent: "center",
    };
  });

  return <Animated.View style={animatedStyle} />;
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
  const { colors } = useTheme();
  const effectiveProgress = Math.min(Math.max(progress, 0), 100);

  const barSteps: BarStep[] =
    steps || Array.from({ length: totalSteps }, (_, i) => ({ id: i + 1 }));
  const numSteps = barSteps.length;
  const current = Math.max(1, Math.min(currentStep, numSteps));

  if (variant === "bar") {
    if (animatedStep) {
      return (
        <View style={styles.fullWidth} className={containerStyles}>
          <View style={styles.row}>
            {barSteps.map((step, i) => {
              const stepNumber = i + 1;
              return (
                <AnimatedBarItem
                  key={step.id}
                  stepNumber={stepNumber}
                  animatedStep={animatedStep}
                />
              );
            })}
          </View>
        </View>
      );
    }

    return (
      <View style={styles.fullWidth} className={containerStyles}>
        <View style={styles.row}>
          {barSteps.map((step, i) => {
            const stepNumber = i + 1;
            const isCurrent = stepNumber === current;

            return (
              <View
                key={step.id}
                style={barSolidSegment(colors, isCurrent)}
                className={cn(
                  isCurrent ? activeThumbStyle : inactiveThumbStyle
                )}
              >
                {step.textInside && (
                  <Text
                    style={barSolidLabel(colors, isCurrent)}
                    className={textInsideStyle}
                  >
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

  return (
    <View style={styles.fullWidth} className={containerStyles}>
      <View style={styles.row}>
        {barSteps.map((step, i) => {
          const stepNumber = i + 1;
          const filled = stepNumber / numSteps <= effectiveProgress / 100;
          const isCurrent = stepNumber === current;

          return (
            <View
              key={step.id}
              style={dotThumb(colors, isCurrent, filled)}
              className={cn(
                isCurrent
                  ? currentThumbStyle
                  : filled
                    ? activeThumbStyle
                    : inactiveThumbStyle
              )}
            >
              {step.textInside && (
                <Text style={dotLabel(colors)} className={textInsideStyle}>
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
