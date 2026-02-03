import { View, Text } from "react-native";
import { cn } from "@/lib/utils";

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
}: BarGroupProps) {
  const effectiveProgress = Math.min(Math.max(progress, 0), 100);

  // Use steps if provided, otherwise generate based on totalSteps
  const barSteps: BarStep[] = steps || Array.from({ length: totalSteps }, (_, i) => ({ id: i + 1 }));
  const numSteps = barSteps.length;
  const current = Math.max(1, Math.min(currentStep, numSteps));

  // Default styles
  const defaultActiveThumbStyle = "bg-primary border-primary";
  const defaultInactiveThumbStyle = "bg-muted border-muted";
  const defaultCurrentThumbStyle = "bg-white border-primary border-2";

  return (
    <View className={cn("w-full", containerStyles)}>
      <View className="flex-row items-center gap-1 w-full">
        {barSteps.map((step, i) => {
          const stepNumber = i + 1;
          const filled = stepNumber / numSteps <= effectiveProgress / 100;
          const isCurrent = stepNumber === current;

          return (
            <View
              key={step.id}
              className={cn(
                "h-6 w-6 rounded-full items-center justify-center flex-1",
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
