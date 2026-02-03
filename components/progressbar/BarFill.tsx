import { View, Text } from "react-native";
import { cn } from "@/lib/utils";

export interface BarFillProps {
  progress: number;
  containerStyles?: string;

  activeStyle?: string;
  inactiveStyle?: string;

  label?: string;
  labelStyle?: string;
}

export function BarFill({
  progress = 0,
  containerStyles,
  activeStyle,
  inactiveStyle,
  label,
  labelStyle,
}: BarFillProps) {
  const effectiveProgress = Math.min(Math.max(progress, 0), 100);

  // Default styles
  const defaultActiveStyle = "bg-primary";
  const defaultInactiveStyle = "bg-muted";

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
