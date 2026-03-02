import { Stack } from "expo-router";

export default function DummyServiceLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
    )
}