import { useFonts } from '@/hooks/useFonts';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const { loaded, error } = useFonts();

    if (!loaded && !error) {
        return null;
    }

    if (loaded || error) {
        SplashScreen.hideAsync();
    }
    // const publishableKey =!;

    return (
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
    );
}
