import type { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import type { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import type { ViewStyle } from "react-native";
import { useTheme } from "./ThemeProvider";

/** Root / screen background token — use when building custom screen wrappers. */
export function useThemedScreenBackground(): string {
  const { colors } = useTheme();
  return colors.background;
}

export function useThemedStackScreenOptions(
  options?: NativeStackNavigationOptions
): NativeStackNavigationOptions {
  const { colors } = useTheme();
  const prev = options?.contentStyle;
  const base =
    prev && typeof prev === "object" && !Array.isArray(prev)
      ? (prev as ViewStyle)
      : {};
  return {
    ...options,
    contentStyle: {
      backgroundColor: colors.background,
      ...base,
    },
  };
}

export function useThemedTabsScreenOptions(
  options?: BottomTabNavigationOptions
): BottomTabNavigationOptions {
  const { colors } = useTheme();
  const prev = options?.sceneStyle;
  const base =
    prev && typeof prev === "object" && !Array.isArray(prev)
      ? (prev as ViewStyle)
      : {};
  return {
    ...options,
    sceneStyle: {
      backgroundColor: colors.background,
      ...base,
    },
  };
}
