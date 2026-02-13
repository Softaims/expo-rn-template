import { Stack } from "expo-router";

export default function FAQLayout() {
  return (
    <Stack screenOptions={{ animation: "none", headerShown: false }}>
      <Stack.Screen name="faq/index" />
    </Stack>
  );
}
