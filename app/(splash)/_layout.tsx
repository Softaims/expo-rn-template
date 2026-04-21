import { useThemedStackScreenOptions } from "@/lib/theme";
import { Stack } from "expo-router";

export default function SplashLayout() {
  const screenOptions = useThemedStackScreenOptions({ headerShown: false });
  return (
    <Stack screenOptions={screenOptions}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
