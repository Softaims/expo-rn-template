import { Tabs } from 'expo-router';

export default function HomeLayout() {
    return (
        <Tabs>
            <Tabs.Screen name="(chat)" options={{ headerShown: false }} />
        </Tabs>
    );
}