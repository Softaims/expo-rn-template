import { View, Text } from "react-native";
import { cn } from "@/lib/utils";

// Example steps structure:
// const steps = [
//   {
//     id: 1,
//     title: "One", // optional
//     textInside: "1", // optional - text to display inside the thumb
//   },
//   {
//     id: 2,
//     title: "Two",
//     textInside: "2",
//   },
//   {
//     id: 3,
//     title: "Three",
//     textInside: "3",
//   }
// ]

export interface Step {
  id: number;
  title?: string;
  textInside?: string;
}

export interface StepperProps {
  steps: Step[];
  currentStep: number;
  containerStyles?: string;

  // Thumb styles for the dots
  activeThumbStyle?: string;
  inactiveThumbStyle?: string;
  currentThumbStyle?: string;

  // Progress bar line styles
  progressbarActiveStyle?: string;
  progressbarInactiveStyle?: string;

  // Label/Title styles below dots
  activeTitleStyle?: string;
  inactiveTitleStyle?: string;

  // Text inside thumb styles
  activeThumbLabelStyle?: string;
  inactiveThumbLabelStyle?: string;
}

export function Stepper({
  steps,
  currentStep,
  containerStyles,
  activeThumbStyle,
  inactiveThumbStyle,
  currentThumbStyle,
  progressbarActiveStyle,
  progressbarInactiveStyle,
  activeTitleStyle,
  inactiveTitleStyle,
  activeThumbLabelStyle,
  inactiveThumbLabelStyle,
}: StepperProps) {
  const totalSteps = steps.length;
  const current = Math.max(1, Math.min(currentStep, totalSteps));

  // Default styles
  const defaultActiveThumbStyle = "bg-primary border-primary";
  const defaultInactiveThumbStyle = "bg-muted border-muted";
  const defaultCurrentThumbStyle = "bg-white";
  const defaultProgressbarActiveStyle = "bg-primary";
  const defaultProgressbarInactiveStyle = "bg-muted";

  const renderStepperDots = () => {
    const dotsAndLines = [];
    const labels = [];

    for (let i = 0; i < totalSteps; i++) {
      const step = steps[i];
      const stepNumber = i + 1;
      const isActive = stepNumber <= current;
      const isCurrent = stepNumber === current;

      // Dot/Thumb
      dotsAndLines.push(
        <View key={step.id} className="items-center flex-1">
          <View
            className={cn(
              "rounded-full border-2 items-center justify-center w-[26px] h-[26px]",
              isActive
                ? cn(defaultActiveThumbStyle, activeThumbStyle)
                : cn(defaultInactiveThumbStyle, inactiveThumbStyle),
            )}
          >
            {step.textInside ? (
              <Text
                className={cn(
                  "absolute text-xs font-medium",
                  isActive
                    ? activeThumbLabelStyle
                    : inactiveThumbLabelStyle
                )}
              >
                {step.textInside}
              </Text>
            ) : isCurrent ? (
              <View
                className={cn("rounded-full w-[14px] h-[14px]", defaultCurrentThumbStyle, currentThumbStyle)}
              />
            ) : null}
          </View>
        </View>,
      );

      // Label
      labels.push(
        <View key={`label-${step.id}`} className="flex-1">
          {step.title && (
            <Text
              className={cn(
                "text-xs mt-2 text-center",
                isActive
                  ? cn("text-foreground", activeTitleStyle)
                  : cn("text-muted-foreground", inactiveTitleStyle)
              )}
            >
              {step.title}
            </Text>
          )}
        </View>
      );

      // Connector line (except after last item)
      if (i < totalSteps - 1) {
        dotsAndLines.push(
          <View
            key={`line-${step.id}`}
            className={cn(
              "h-[5px] flex-1 mx-1",
              stepNumber < current
                ? cn(defaultProgressbarActiveStyle, progressbarActiveStyle)
                : cn(defaultProgressbarInactiveStyle, progressbarInactiveStyle),
            )}
          />,
        );

        // Empty space for label alignment
        labels.push(
          <View key={`label-space-${step.id}`} className="flex-1" />
        );
      }
    }

    return (
      <View className="w-full">
        <View className="flex-row items-center w-full">{dotsAndLines}</View>
        <View className="flex-row w-full">{labels}</View>
      </View>
    );
  };

  return (
    <View className={cn("w-full", containerStyles)}>
      {renderStepperDots()}
    </View>
  );
}
