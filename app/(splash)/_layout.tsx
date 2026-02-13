import { Stack, Redirect } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export default function SplashLayout() {
  const { isSignedIn, isLoaded } = useAuth();

  console.log("isLoaded:", isLoaded, "isSignedIn:", isSignedIn);

  // Wait for Clerk to finish loading session
  if (!isLoaded) {
    return null;
  }

  if (isSignedIn) {
    return <Redirect href="/(tabs)/(settings)/settings" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
