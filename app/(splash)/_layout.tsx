import { Stack } from "expo-router";

export default function SplashLayout() {
  return (
    <Stack screenOptions={{ contentStyle: { backgroundColor: '#fff' }, headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
