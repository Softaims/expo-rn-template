import { Stack } from "expo-router";

export default function LegalLayout() {
  return (
    <Stack screenOptions={{ animation: "none", headerShown: false }}>
      <Stack.Screen name="termsAndConditions/index" />
      <Stack.Screen name="privacyPolicy/index" />
    </Stack>
  );
}
