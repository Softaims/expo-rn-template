import { AlertProvider } from "@/components/alerts";
import { useFonts } from "@/hooks/useFonts";
import { ClerkProvider } from "@clerk/clerk-expo";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import * as Sentry from "@sentry/react-native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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

export default Sentry.wrap(function RootLayout() {
  const { loaded, error } = useFonts();

  if (!loaded && !error) {
    return null;
  }

  if (loaded || error) {
    SplashScreen.hideAsync();
  }
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

  // try {
  //     throw new Error('Test handled error');
  //   } catch (e) {
  //     Sentry.captureException(e);
  //   }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ClerkProvider publishableKey={publishableKey}>
        <BottomSheetModalProvider>
          <AlertProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(splash)" />
              <Stack.Screen name="(auth)" />
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="(legal)" />
              <Stack.Protected guard={__DEV__}>
                <Stack.Screen name="storybook" />
              </Stack.Protected>
            </Stack>
          </AlertProvider>
        </BottomSheetModalProvider>
      </ClerkProvider>
    </GestureHandlerRootView>
  );
});
