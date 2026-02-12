import { Stack } from "expo-router";

export default function ChatLayout() {
    return (
        <Stack>
            <Stack.Screen name="RecentMessagesScreen" options={{ headerShown: true }} />
        </Stack>
    )
}