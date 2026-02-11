import { Stack, Redirect } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
export default function AuthLayout() {
  const { isSignedIn } = useAuth();
  if (isSignedIn) {
    console.log("assdsda sadasdas");
    return <Redirect href="/(tabs)" />;
  }
  return (
    <Stack screenOptions={{ animation: "none", headerShown: false }}>
      <Stack.Screen name="login/index" />
      <Stack.Screen name="signup/index" />
      <Stack.Screen name="forgot-password/index" />
      <Stack.Screen name="otp-verification/index" />
      <Stack.Screen name="reset-password/index" />
    </Stack>
  );
}
