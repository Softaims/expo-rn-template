import { Stack } from "expo-router";

export default function SettingsLayout() {
  return (
    <Stack>
      <Stack.Screen name="SettingsScreen" options={{ headerShown: false }} />
    </Stack>
  );
}
