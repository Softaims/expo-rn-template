import { useFonts } from '@/hooks/useFonts';
import { ClerkProvider } from '@clerk/clerk-expo';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

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
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ClerkProvider publishableKey={publishableKey}>
                <BottomSheetModalProvider>
                    <Stack>
                        <Stack.Screen name="index" options={{ headerShown: false }} />
                        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                        <Stack.Protected guard={__DEV__}>
                            <Stack.Screen name="storybook" />
                        </Stack.Protected>
                    </Stack>
                </BottomSheetModalProvider>
            </ClerkProvider>
        </GestureHandlerRootView>
    );
}
