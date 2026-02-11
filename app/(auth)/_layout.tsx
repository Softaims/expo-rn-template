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
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="forgot-password" />
      <Stack.Screen name="otp-verification" />
      <Stack.Screen name="reset-password" />
    </Stack>
  );
}
