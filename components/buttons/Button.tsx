import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";

type ButtonProps = {
    variant?: "primary-lg" | "primary-md" | "primary-sm" | "secondary-lg" | "secondary-md" | "secondary-sm";
    onPress: () => void;
    title: string;
    disabled?: boolean;
    loading?: boolean;
}

export function Button({ variant = "primary-lg", onPress, title, disabled, loading }: ButtonProps) {
    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            style={[styles.buttonContainer]}>
            {
                loading ?
                    <ActivityIndicator size="small" color="white" />
                    : <Text style={[styles.text]}>{title}</Text>
            }
        </Pressable>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 10,
    },
    primaryButtonLarge: {
        backgroundColor: "#478761",
        height: 50,
    },
    primaryButtonMedium: {
        backgroundColor: "#478761",
        height: 42,
    },
    primaryButtonSmall: {
        backgroundColor: "#478761",
        height: 38,
    },

    secondaryButtonLarge: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: "#478761",
        height: 50,
    },
    secondaryButtonMedium: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: "#478761",
        height: 42,
    },
    secondaryButtonSmall: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: "#478761",
        height: 38,
    },

    text: {
        fontSize: 18,
        fontWeight: "700",
        color: "white",
    },
    primaryText: {
        color: "white",
    },
    secondaryText: {
        color: "#478761",
    },
});