import { Stack } from 'expo-router';
import { Button } from '@/components';

export default function AuthLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Button title='xyz' />
        </Stack>
    );
}