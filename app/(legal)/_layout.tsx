import { useThemedStackScreenOptions } from "@/lib/theme";
import { Stack } from "expo-router";

export default function LegalLayout() {
  const screenOptions = useThemedStackScreenOptions({
    animation: "none",
    headerShown: false,
  });
  return (
    <Stack screenOptions={screenOptions}>
      <Stack.Screen name="termsAndConditions/index" />
      <Stack.Screen name="privacyPolicy/index" />
    </Stack>
  );
}
