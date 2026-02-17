import { View, Text } from "react-native";
import { cn } from "@/lib/utils";

export interface BarFillProps {
  progress: number;
  containerStyles?: string;

  activeStyle?: string;
  inactiveStyle?: string;

  label?: string;
  labelStyle?: string;

  // Variant with thumb/knob like range slider
  variant?: "bar" | "slider";
  thumbStyle?: string;
}

export function BarFill({
  progress = 0,
  containerStyles,
  activeStyle,
  inactiveStyle,
  label,
  labelStyle,
  variant = "bar",
  thumbStyle,
}: BarFillProps) {
  const effectiveProgress = Math.min(Math.max(progress, 0), 100);

  // Default styles
  const defaultActiveStyle = "bg-primary";
  const defaultInactiveStyle = "bg-muted";

  if (variant === "slider") {
    return (
      <View className={cn("w-full", containerStyles)}>
        <View className="relative w-full h-6 justify-center">
          {/* Rail background */}
          <View
            className={cn(
              "h-1 rounded-full w-full",
              defaultInactiveStyle,
              inactiveStyle
            )}
          />
          {/* Rail selected (active) */}
          <View
            className={cn(
              "h-1 rounded-full absolute left-0",
              defaultActiveStyle,
              activeStyle
            )}
            style={{
              width: `${effectiveProgress}%`,
            }}
          />
          {/* Thumb */}
          <View
            className={cn(
              "w-6 h-6 rounded-full bg-foreground absolute shadow-lg",
              thumbStyle
            )}
            style={{
              left: `${effectiveProgress}%`,
              transform: [{ translateX: -12 }], // Half of thumb width
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          />
        </View>
        {label && (
          <Text
            className={cn(
              "text-sm text-muted-foreground mt-2",
              labelStyle,
            )}
          >
            {label}
          </Text>
        )}
      </View>
    );
  }

  // Default "bar" variant
  return (
    <View className={cn("w-full", containerStyles)}>
      <View
        className={cn(
          "h-2.5 rounded-full overflow-hidden relative w-full",
          cn(defaultInactiveStyle, inactiveStyle)
        )}
      >
        <View
          className={cn("h-full rounded-full", defaultActiveStyle, activeStyle)}
          style={{
            width: `${effectiveProgress}%`,
          }}
        />
      </View>
      {label && (
        <Text
          className={cn(
            "text-sm text-muted-foreground mt-2",
            labelStyle,
          )}
        >
          {label}
        </Text>
      )}
    </View>
  );
}
