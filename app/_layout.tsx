import { AlertProvider } from "@/components/alerts";
import { useFonts } from "@/hooks/useFonts";
import { initSentry, wrapWithSentry, setSentryUser } from "@/modules/sentry";
import { AuthProvider, useAuth } from "@/modules/auth";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect } from "react";

// Initialize Sentry
initSentry();
// Prevent auto hide of splash screen
SplashScreen.preventAutoHideAsync();

function RootLayoutContent() {
  const { loaded: isFontsLoaded } = useFonts();
  const { user, isSignedIn, isLoaded: isAuthLoaded } = useAuth();

  // Hide splash screen when fonts and auth are loaded
  useEffect(() => {
    if (isFontsLoaded && isAuthLoaded) {
      SplashScreen.hideAsync();
    }
  }, [isFontsLoaded, isAuthLoaded]);

  useEffect(() => {
    if (!isAuthLoaded) return;

    // Set Sentry user when loaded
    if (isSignedIn && user) {
      setSentryUser({
        id: user.id,
        email: user.primaryEmailAddress?.emailAddress,
      });
    } else if (!isSignedIn) {
      setSentryUser(null);
    }
  }, [user, isAuthLoaded, isSignedIn]);

  // While auth state is loading, show nothing
  if (!isFontsLoaded || !isAuthLoaded) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={isSignedIn}>
        <Stack.Screen name="(tabs)" />
      </Stack.Protected>

      <Stack.Protected guard={!isSignedIn}>
        <Stack.Screen name="(splash)" />
        <Stack.Screen name="(auth)" />
      </Stack.Protected>

      <Stack.Screen name="(legal)" />

      <Stack.Protected guard={__DEV__}>
        <Stack.Screen name="storybook" />
      </Stack.Protected>
    </Stack>
  );
}

function RootLayout() {
  return (
    <GestureHandlerRootView>
      <AuthProvider>
        <BottomSheetModalProvider>
          <AlertProvider>
            <RootLayoutContent />
          </AlertProvider>
        </BottomSheetModalProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}

export default wrapWithSentry(RootLayout);