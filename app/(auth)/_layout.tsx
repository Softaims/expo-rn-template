import { Stack, Redirect } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
export default function AuthLayout() {
  const { isSignedIn } = useAuth();
  if (isSignedIn) {
    console.log("assdsda sadasdas");
    return <Redirect href="/(tabs)" />;
  }
  return (
    <Stack screenOptions={{ animation: 'none' }}>
      <Stack.Screen name="splash/index" options={{ headerShown: false }} />
      <Stack.Screen name="login/index" options={{ headerShown: false }} />
      <Stack.Screen name="signup/index" options={{ headerShown: false }} />
      <Stack.Screen name="forgot-password/index" options={{ headerShown: false }} />
      <Stack.Screen name="otp-verification/index" options={{ headerShown: false }} />
      <Stack.Screen name="reset-password/index" options={{ headerShown: false }} />
    </Stack>
  );
}
