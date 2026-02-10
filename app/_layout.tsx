import { Stack } from 'expo-router';
import { useFonts } from '@/hooks/useFonts';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { AlertProvider } from '@/components/alerts';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const { loaded, error } = useFonts();

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }

    return (
        <BottomSheetModalProvider>
            <AlertProvider>
                <Stack>
                    <Stack.Screen name="index" options={{ headerShown: false }} />
                    <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    <Stack.Protected guard={__DEV__}>
                        <Stack.Screen name="storybook" />
                    </Stack.Protected>
                </Stack>
            </AlertProvider>
        </BottomSheetModalProvider>
    );
}
