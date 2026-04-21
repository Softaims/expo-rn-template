import { useThemedStackScreenOptions } from "@/lib/theme";
import { Stack } from "expo-router";

export default function AuthLayout() {
  const screenOptions = useThemedStackScreenOptions({ headerShown: false });
  return (
    <Stack screenOptions={screenOptions}>
      <Stack.Screen name="login/index" />
      <Stack.Screen name="signup/index" />
      <Stack.Screen name="forgotPassword/index" />
      <Stack.Screen name="otpVerification/index" />
      <Stack.Screen name="resetPassword/index" />
    </Stack>
  );
}
