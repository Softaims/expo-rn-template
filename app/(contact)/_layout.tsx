import { Stack } from "expo-router";

export default function ContactLayout() {
  return (
    <Stack screenOptions={{ animation: "none", headerShown: false }}>
      <Stack.Screen name="contact-us/index" />
    </Stack>
  );
}
