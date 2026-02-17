import { AlertProvider } from "@/components/alerts";
import { useFonts } from "@/hooks/useFonts";
import { initSentry, wrapWithSentry, setSentryUser } from "@/modules/sentry";
import { AuthProvider, useAuth } from "@/modules/auth";
import { storage } from "@/lib/storage";
import { STORAGE_KEYS } from "@/lib/storageKeys";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";

// Initialize Sentry
initSentry();
// Prevent auto hide of splash screen
SplashScreen.preventAutoHideAsync();

function RootLayoutContent() {
  const { loaded: isFontsLoaded } = useFonts();
  const { user, isSignedIn, isLoaded: isAuthLoaded } = useAuth();
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean | null>(null);

  useEffect(() => {
    storage.get(STORAGE_KEYS.HAS_SEEN_ONBOARDING).then((value) => {
      setHasSeenOnboarding(value === "true");
    });
  }, []);

  // Hide splash screen when fonts, auth and storage are all ready
  useEffect(() => {
    if (isFontsLoaded && isAuthLoaded && hasSeenOnboarding !== null) {
      SplashScreen.hideAsync();
    }
  }, [isFontsLoaded, isAuthLoaded, hasSeenOnboarding]);

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

  if (!isFontsLoaded || !isAuthLoaded || hasSeenOnboarding === null) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false}} >
      <Stack.Protected guard={isSignedIn}>
        <Stack.Screen name="(tabs)" options={{animation: "none"}} />
      </Stack.Protected>

      <Stack.Protected guard={!isSignedIn && !hasSeenOnboarding}>
        <Stack.Screen name="(splash)" options={{ animation: "none" }} />
      </Stack.Protected>

      <Stack.Protected guard={!isSignedIn}>
        <Stack.Screen name="(auth)" options={{ animation: "none" }} />
      </Stack.Protected>

      <Stack.Screen name="(legal)" />

      <Stack.Protected guard={__DEV__}>
        <Stack.Screen name="storybook" options={{ headerShown: true }} />
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