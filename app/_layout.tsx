import { Stack, Slot } from 'expo-router';
import { useFonts } from '@/hooks/useFonts';
import * as SplashScreen from 'expo-splash-screen';
import { ClerkProvider } from '@clerk/clerk-expo';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const { loaded, error } = useFonts();

    if (!loaded && !error) {
        return null;
    }

    if (loaded || error) {
        SplashScreen.hideAsync();
    }
    const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

    return (
        <ClerkProvider publishableKey={publishableKey}>
            <Stack
              screenOptions={{
                headerShown: false,
              }}
            />
        </ClerkProvider>
    );
}
