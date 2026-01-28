import { router } from 'expo-router';
import { View, Text, Pressable } from 'react-native';

export default function Auth() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Pressable onPress={() => router.push('/(tabs)')}>
                <Text>Login</Text>
            </Pressable>
        </View>
    );
}