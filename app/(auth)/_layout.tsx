import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ contentStyle: { backgroundColor: '#fff' }, headerShown: false }}>
      <Stack.Screen name="login/index" />
      <Stack.Screen name="signup/index" />
      <Stack.Screen name="forgotPassword/index" />
      <Stack.Screen name="otpVerification/index" />
      <Stack.Screen name="resetPassword/index" />
    </Stack>
  );
}
