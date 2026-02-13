import { Stack } from "expo-router";

export default function LegalLayout() {
  return (
    <Stack screenOptions={{ animation: "none", headerShown: false }}>
      <Stack.Screen name="terms-and-conditions/index" />
      <Stack.Screen name="privacy-policy/index" />
    </Stack>
  );
}
