import { useThemedStackScreenOptions } from "@/lib/theme";
import { Stack } from "expo-router";

export default function SettingsLayout() {
  const screenOptions = useThemedStackScreenOptions();
  return (
    <Stack screenOptions={screenOptions}>
      <Stack.Screen name="settings" options={{ headerShown: false }} />
      <Stack.Screen name="changePassword" options={{ headerShown: false }} />
      <Stack.Screen name="editProfile" options={{ headerShown: false }} />
      <Stack.Screen name="faq" options={{ headerShown: false }} />
      <Stack.Screen name="contactUs" options={{ headerShown: false }} />
    </Stack>
  );
}
