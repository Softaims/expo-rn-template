import { Tabs } from 'expo-router';

export default function HomeLayout() {
    return (
        <Tabs>
            <Tabs.Screen name="index" options={{ headerShown: false }} />
            <Tabs.Screen name="messages" options={{ headerShown: false }} />
        </Tabs>
    );
}