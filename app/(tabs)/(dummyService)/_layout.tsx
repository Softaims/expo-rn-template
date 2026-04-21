import { useThemedStackScreenOptions } from "@/lib/theme";
import { Stack } from "expo-router";

export default function DummyServiceLayout() {
  const screenOptions = useThemedStackScreenOptions();
  return (
    <Stack screenOptions={screenOptions}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
