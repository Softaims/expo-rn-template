import { View, ViewStyle, Text } from "react-native";
import { cn } from "@/lib/utils"; // Assuming you have this utility (like clsx/tailwind-merge)

const progressVariants = {
  base: "w-full",
  variant: {
    // Variant 1: Classic step dots connected by lines (○ → ● → ○ ...)
    stepperDots: "flex-row items-center justify-between",

    // Variant 2: Solid horizontal bars of different lengths
    barFill: "",

    // Variant 3: Multiple short bars / grouped indicators (like mini progress items)
    barGroup: "flex-row items-center gap-1.5",

    // Variant 4: Circle + dot hybrid (numbered or dotted steps)
    circleSteps: "flex-row items-center justify-between",

    // Variant 5: Connected line with progress dots (modern minimal stepper)
    lineProgress: "flex-row items-center",
  },
} as const;

const labelVariants = {
  variant: {
    stepperDots: "text-xs text-muted-foreground mt-1.5",
    barFill: "text-sm text-foreground mt-2",
    barGroup: "text-xs text-muted-foreground",
    circleSteps: "text-sm font-medium",
    lineProgress: "text-sm text-muted-foreground mt-1",
  },
} as const;

export interface ProgressBarProps {
  variant?: keyof typeof progressVariants.variant;
  progress?: number; // 0–100 for linear / fill types
  currentStep?: number; // 1-based current step
  totalSteps?: number; // total number of steps (for steppers)
  labels?: string[]; // optional labels under steps (e.g. ["Pattern", "Goal", "Users", ...])
  size?: "sm" | "md" | "lg";
  className?: string;
  style?: ViewStyle;
  activeColor?: string; // override active color
  inactiveColor?: string;
  showLabels?: boolean;
}

export function ProgressBar({
  variant = "stepperDots",
  progress = 0,
  currentStep = 1,
  totalSteps = 5,
  labels,
  size = "md",
  className,
  style,
  activeColor = "#3b82f6", // blue-500 like primary
  inactiveColor = "#d1d5db", // gray-300
  showLabels = true,
}: ProgressBarProps) {
  const effectiveProgress = Math.min(Math.max(progress, 0), 100);
  const stepCount = totalSteps || 5;
  const current = Math.max(1, Math.min(currentStep, stepCount));

  const getSizeStyle = () => {
    if (size === "sm") return { dotSize: 10, lineHeight: 4, fontSize: 12 };
    if (size === "lg") return { dotSize: 20, lineHeight: 6, fontSize: 16 };
    return { dotSize: 14, lineHeight: 5, fontSize: 14 }; // md default
  };

  const { dotSize, lineHeight, fontSize } = getSizeStyle();

  const renderStepperDots = () => {
    const items = [];
    for (let i = 1; i <= stepCount; i++) {
      const isActive = i <= current;
      const isCurrent = i === current;

      items.push(
        <View key={i} className="items-center flex-1">
          <View
            className={cn(
              "rounded-full border-2 items-center justify-center",
              isActive
                ? "border-primary bg-primary"
                : "border-muted bg-background",
            )}
            style={{
              width: dotSize + 8,
              height: dotSize + 8,
              borderColor: isActive ? activeColor : inactiveColor,
              backgroundColor: isActive ? activeColor : "transparent",
            }}
          >
            {isCurrent && (
              <View
                className="rounded-full bg-white border-blue-50"
                style={{ width: dotSize, height: dotSize }}
              />
            )}
          </View>

          {/* {showLabels && labels && labels[i - 1] && (
            <Text
              className={cn(labelVariants.variant[variant], "text-center mt-4")}
              style={{ fontSize }}
            >
              {labels[i - 1]}
            </Text>
          )} */}
        </View>,
      );

      // Connector line (except after last item)
      if (i < stepCount) {
        items.push(
          <View
            key={`line-${i}`}
            className="flex-1 mx-1"
            style={{
              height: lineHeight,
              backgroundColor: i < current ? activeColor : inactiveColor,
            }}
          />,
        );
      }
    }
    return <View className="flex-row items-center w-full">{items}</View>;
  };

  const renderBarFill = () => {
    // Variant 2 style – one long bar with fill
    return (
      <View
        className={cn("h-2.5 rounded-full overflow-hidden bg-muted", className)}
        style={style}
      >
        <View
          className="h-full rounded-full"
          style={{
            width: `${effectiveProgress}%`,
            backgroundColor: activeColor,
          }}
        />
      </View>
    );
  };

  const renderBarGroup = () => {
    // Variant 3 style – many small bars
    const barCount = 8; // example – can be dynamic
    return (
      <View
        className={cn("flex-row items-center gap-1", className)}
        style={style}
      >
        {Array.from({ length: barCount }).map((_, i) => {
          const stepNumber = i + 1;
          const filled = (i + 1) / barCount <= effectiveProgress / 100;
          const isCurrent = stepNumber === current;
          const borderWidth = isCurrent ? 2 : 0;

          return (
            <View
              key={i}
              className="h-6 w-6 rounded-full"
              style={{
                backgroundColor: isCurrent
                  ? "#fff"
                  : filled
                    ? activeColor
                    : inactiveColor,
                borderWidth: borderWidth,
                borderColor: isCurrent ? activeColor : "transparent",
              }}
            />
          );
        })}
      </View>
    );
  };

  const renderCircleSteps = () => {
    // Variant 4 style – numbered circles
    const items = [];
    for (let i = 1; i <= stepCount; i++) {
      const isActive = i <= current;
      items.push(
        <View key={i} className="items-center flex-1">
          <View
            className={cn(
              "rounded-full w-10 h-10 items-center justify-center border-2",
              isActive
                ? "bg-primary border-primary"
                : "bg-background border-muted",
            )}
            style={{ borderColor: isActive ? activeColor : inactiveColor }}
          >
            <Text
              className={cn(
                "font-medium",
                isActive ? "text-primary-foreground" : "text-muted-foreground",
              )}
              style={{ fontSize: fontSize + 2 }}
            >
              {i}
            </Text>
          </View>
        </View>,
      );

      if (i < stepCount) {
        items.push(
          <View
            key={`conn-${i}`}
            className="flex-1 h-1 mx-2"
            style={{
              backgroundColor: i < current ? activeColor : inactiveColor,
            }}
          />,
        );
      }
    }
    return <View className="flex-row items-center w-full">{items}</View>;
  };

  const renderContent = () => {
    switch (variant) {
      case "stepperDots":
        return renderStepperDots();
      case "barFill":
        return renderBarFill();
      case "barGroup":
        return renderBarGroup();
      case "circleSteps":
        return renderCircleSteps();
      default:
        return renderStepperDots();
    }
  };

  return (
    <View
      className={cn(
        progressVariants.base,
        progressVariants.variant[variant],
        className,
      )}
      style={style}
    >
      {renderContent()}

      {showLabels &&
        labels &&
        variant !== "stepperDots" &&
        variant !== "circleSteps" && (
          <View className="flex-row justify-between mt-2">
            {labels.map((label, i) => (
              <Text
                key={i}
                className="text-xs text-muted-foreground flex-1 text-center"
              >
                {label}
              </Text>
            ))}
          </View>
        )}
    </View>
  );
}
