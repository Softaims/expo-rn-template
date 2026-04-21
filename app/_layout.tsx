import { AlertProvider } from "@/components/alerts";
import { useFonts } from "@/hooks/useFonts";
import { ThemeProvider, useTheme } from "@/lib/theme";
import { initSentry, wrapWithSentry, setSentryUser } from "@/modules/sentry";
import { AuthProvider, useAuth } from "@/modules/auth";
import { useOnboardingStore } from "@/modules/appState";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

// Initialize Sentry
initSentry();
// Prevent auto hide of splash screen
SplashScreen.preventAutoHideAsync();

function ThemedRootShell({ children }: { children: React.ReactNode }) {
  const { colors } = useTheme();
  return (
    <GestureHandlerRootView
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      {/* Dark status-bar *icons* — matches white-shaded surfaces in both theme modes */}
      <StatusBar style="dark" />
      {children}
    </GestureHandlerRootView>
  );
}

function RootLayoutContent() {
  const { loaded: isFontsLoaded } = useFonts();
  const { colors } = useTheme();
  const { user, isSignedIn, isLoaded: isAuthLoaded } = useAuth();
  const hasSeenOnboarding = useOnboardingStore(
    (state) => state.hasSeenOnboarding
  );

  // Hide splash screen when fonts, auth and storage are all ready
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

  if (!isFontsLoaded || !isAuthLoaded) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Protected guard={isSignedIn}>
        <Stack.Screen name="(tabs)" options={{ animation: "none" }} />
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
    <ThemeProvider>
      <ThemedRootShell>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <BottomSheetModalProvider>
              <AlertProvider>
                <RootLayoutContent />
              </AlertProvider>
            </BottomSheetModalProvider>
          </AuthProvider>
        </QueryClientProvider>
      </ThemedRootShell>
    </ThemeProvider>
  );
}

export default wrapWithSentry(RootLayout);
