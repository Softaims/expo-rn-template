import { View, ViewStyle, Text } from "react-native";
import { cn } from "@/lib/utils";

const progressVariants = {
  base: "w-full",
  variant: {
    stepperDots: "flex-row items-center justify-between",
    barFill: "",
    barGroup: "flex-row items-center gap-1.5",
    circleSteps: "flex-row items-center justify-between",
    lineProgress: "flex-row items-center",
  },
} as const;

export interface ProgressBarProps {
  variant?: keyof typeof progressVariants.variant;
  progress?: number;
  currentStep?: number;
  totalSteps?: number;
  label?: string;
  labels?: string[];
  size?: "sm" | "md" | "lg";
  className?: string;
  style?: ViewStyle;

  // Styling props
  activeStyle?: string;
  inactiveStyle?: string;
  currentStyle?: string;
  labelStyle?: string;
  textInsideStyle?: string;

  // Display options
  textInside?: string | string[];
}

export function ProgressBar({
  variant = "stepperDots",
  progress = 0,
  currentStep = 1,
  totalSteps = 5,
  label,
  labels,
  size = "md",
  className,
  style,
  activeStyle,
  inactiveStyle,
  currentStyle,
  labelStyle,
  textInsideStyle,
  textInside,
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

  // Default styles
  const defaultActiveStyle = "bg-primary border-primary";
  const defaultInactiveStyle = "bg-muted border-muted";
  const defaultCurrentStyle = "bg-white";

  const getTextInsideForIndex = (index: number): string | undefined => {
    if (!textInside) return undefined;
    if (typeof textInside === "string") return textInside;
    return textInside[index];
  };

  const renderStepperDots = () => {
    const items = [];
    for (let i = 1; i <= stepCount; i++) {
      const isActive = i <= current;
      const isCurrent = i === current;
      const text = getTextInsideForIndex(i - 1);

      items.push(
        <View key={i} className="items-center flex-1">
          <View
            className={cn(
              "rounded-full border-2 items-center justify-center",
              isActive
                ? activeStyle || defaultActiveStyle
                : inactiveStyle || defaultInactiveStyle,
            )}
            style={{
              width: dotSize + 8,
              height: dotSize + 8,
            }}
          >
            {isCurrent && (
              <View
                className={cn("rounded-full", currentStyle || defaultCurrentStyle)}
                style={{ width: dotSize, height: dotSize }}
              />
            )}
            {text && (
              <Text
                className={cn("absolute text-xs font-medium", textInsideStyle)}
              >
                {text}
              </Text>
            )}
          </View>
        </View>,
      );

      // Connector line (except after last item)
      if (i < stepCount) {
        items.push(
          <View
            key={`line-${i}`}
            className={cn(
              "flex-1 mx-1",
              i < current
                ? activeStyle || defaultActiveStyle
                : inactiveStyle || defaultInactiveStyle,
            )}
            style={{
              height: lineHeight,
            }}
          />,
        );
      }
    }
    return <View className="flex-row items-center w-full">{items}</View>;
  };

  const renderBarFill = () => {
    const text = typeof textInside === "string" ? textInside : undefined;

    return (
      <View
        className={cn(
          "h-2.5 rounded-full overflow-hidden relative",
          inactiveStyle || "bg-muted",
          className,
        )}
        style={style}
      >
        <View
          className={cn("h-full rounded-full", activeStyle || "bg-primary")}
          style={{
            width: `${effectiveProgress}%`,
          }}
        />
        {text && (
          <Text
            className={cn(
              "absolute inset-0 text-center text-xs font-medium",
              textInsideStyle,
            )}
            style={{ lineHeight: 10 }}
          >
            {text}
          </Text>
        )}
      </View>
    );
  };

  const renderBarGroup = () => {
    const barCount = 8;
    return (
      <View
        className={cn("flex-row items-center gap-1", className)}
        style={style}
      >
        {Array.from({ length: barCount }).map((_, i) => {
          const stepNumber = i + 1;
          const filled = (i + 1) / barCount <= effectiveProgress / 100;
          const isCurrent = stepNumber === current;
          const text = getTextInsideForIndex(i);

          return (
            <View
              key={i}
              className={cn(
                "h-6 w-6 rounded-full items-center justify-center",
                isCurrent
                  ? currentStyle || "bg-white border-2"
                  : filled
                    ? activeStyle || defaultActiveStyle
                    : inactiveStyle || defaultInactiveStyle,
              )}
            >
              {text && (
                <Text className={cn("text-xs font-medium", textInsideStyle)}>
                  {text}
                </Text>
              )}
            </View>
          );
        })}
      </View>
    );
  };

  const renderCircleSteps = () => {
    const items = [];
    for (let i = 1; i <= stepCount; i++) {
      const isActive = i <= current;
      const text = getTextInsideForIndex(i - 1) || String(i);

      items.push(
        <View key={i} className="items-center flex-1">
          <View
            className={cn(
              "rounded-full w-10 h-10 items-center justify-center border-2",
              isActive
                ? activeStyle || defaultActiveStyle
                : inactiveStyle || "bg-background border-muted",
            )}
          >
            <Text
              className={cn(
                "font-medium",
                textInsideStyle ||
                  (isActive ? "text-primary-foreground" : "text-muted-foreground"),
              )}
              style={{ fontSize: fontSize + 2 }}
            >
              {text}
            </Text>
          </View>
        </View>,
      );

      if (i < stepCount) {
        items.push(
          <View
            key={`conn-${i}`}
            className={cn(
              "flex-1 h-1 mx-2",
              i < current
                ? activeStyle || "bg-primary"
                : inactiveStyle || "bg-muted",
            )}
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

  const renderLabel = () => {
    // Single generic label for any variant
    if (label) {
      return (
        <Text
          className={cn(
            "text-sm text-muted-foreground mt-2",
            labelStyle,
          )}
        >
          {label}
        </Text>
      );
    }

    // Multiple labels
    if (labels && labels.length > 0) {
      return (
        <View className="flex-row justify-between mt-2">
          {labels.map((labelText, i) => (
            <Text
              key={i}
              className={cn(
                "text-xs text-muted-foreground flex-1 text-center",
                labelStyle,
              )}
            >
              {labelText}
            </Text>
          ))}
        </View>
      );
    }

    return null;
  };

  return (
    <View className={cn(progressVariants.base, className)}>
      <View
        className={cn(progressVariants.variant[variant])}
        style={style}
      >
        {renderContent()}
      </View>
      {renderLabel()}
    </View>
  );
}
