import { Stack } from "expo-router";
import { ScreenWrapper } from "@/components";

export const NotificationScreen = () => {
    return (
        <ScreenWrapper>
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerTransparent: true,
                    headerTitle: "Notifications",
                }}
            />
        </ScreenWrapper>
    );
}