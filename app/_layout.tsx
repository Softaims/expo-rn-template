import { AlertProvider } from "@/components/alerts";
import { useFonts } from "@/hooks/useFonts";
import { ClerkProvider, useAuth, useUser } from "@clerk/clerk-expo";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import * as Sentry from "@sentry/react-native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import { tokenCache } from "@clerk/clerk-expo/token-cache";

Sentry.init({
  dsn: "https://8f30047611e9a0499a44b1dd8bcc1963@o4510871958323200.ingest.de.sentry.io/4510871958716496",

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [
    Sentry.mobileReplayIntegration(),
    Sentry.feedbackIntegration(),
  ],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

SplashScreen.preventAutoHideAsync();

// Inner component that handles routing based on auth state
function RootLayoutContent() {
  const { user } = useUser();
  const { isSignedIn, isLoaded } = useAuth();
  console.log("isSignedIn:", isSignedIn);

  // Set Sentry user when loaded
  useEffect(() => {
    if (isLoaded) {
      if (user) {
        Sentry.setUser({
          id: user.id,
          email: user.primaryEmailAddress?.emailAddress,
        });
      } else {
        Sentry.setUser(null);
      }
    }
  }, [user, isLoaded]);

  // While auth state is loading, show nothing
  if (!isLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-background px-4">
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={isSignedIn}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(legal)" />
        </Stack.Protected>

        <Stack.Protected guard={!isSignedIn}>
          <Stack.Screen name="(splash)" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(legal)" />
        </Stack.Protected>

        {/* <Stack.Protected guard={__DEV__}>
          <Stack.Screen name="storybook" />
        </Stack.Protected> */}
      </Stack>
    </SafeAreaView>
  );
}

export default Sentry.wrap(function RootLayout() {
  const { loaded, error } = useFonts();

  if (!loaded && !error) {
    return null;
  }

  if (loaded || error) {
    SplashScreen.hideAsync();
  }
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
        <BottomSheetModalProvider>
          <AlertProvider>
            <RootLayoutContent />
          </AlertProvider>
        </BottomSheetModalProvider>
      </ClerkProvider>
    </GestureHandlerRootView>
  );
});
