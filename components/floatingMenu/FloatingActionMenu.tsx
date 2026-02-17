import { Text } from "@/components/text";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
    interpolate,
    SharedValue,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";

export interface MenuOption {
    icon?: React.ReactNode;
    label: string;
    onPress?: () => void;
    destructive?: boolean;
}

export interface FloatingActionMenuProps {
    isOpen: boolean;
    onToggle: () => void;
    options: MenuOption[];
    trigger: React.ReactNode;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const FloatingActionMenu = ({
    isOpen,
    onToggle,
    options,
    trigger,
}: FloatingActionMenuProps) => {
    const animation = useSharedValue(0);

    React.useEffect(() => {
        animation.value = withSpring(isOpen ? 1 : 0, {
            damping: 15,
            stiffness: 200,
        });
    }, [isOpen]);

    const backdropStyle = useAnimatedStyle(() => ({
        opacity: animation.value * 0.3,
        pointerEvents: isOpen ? "auto" : "none",
    }));

    return (
        <View>
            <Pressable onPress={onToggle}>
                {trigger}
            </Pressable>

            {/* Backdrop */}
            <AnimatedPressable
                onPress={onToggle}
                style={[styles.backdrop, backdropStyle]}
            />

            {/* Menu Items */}
            <View style={[styles.menuContainer, { backgroundColor: isOpen ? '#ffffff' : 'transparent' }]} pointerEvents={isOpen ? "auto" : "none"}>
                {options.map((option, index) => (
                    <FloatingMenuItem
                        key={option.label}
                        option={option}
                        index={index}
                        totalItems={options.length}
                        animation={animation}
                        onPress={() => {
                            option.onPress?.();
                            onToggle();
                        }}
                    />
                ))}
            </View>
        </View>
    );
};

interface FloatingMenuItemProps {
    option: MenuOption;
    index: number;
    totalItems: number;
    animation: SharedValue<number>;
    onPress: () => void;
}

const FloatingMenuItem = ({
    option,
    index,
    totalItems,
    animation,
    onPress,
}: FloatingMenuItemProps) => {
    const animatedStyle = useAnimatedStyle(() => {
        const reverseIndex = totalItems - 1 - index;
        const delay = reverseIndex * 0.1;
        const progress = Math.max(0, Math.min(1, (animation.value - delay) / (1 - delay * totalItems / (totalItems + 1))));

        const translateY = interpolate(
            animation.value,
            [0, 1],
            [20, 0]
        );

        const opacity = interpolate(
            animation.value,
            [0, 0.3, 1],
            [0, 0, 1]
        );

        const scale = interpolate(
            animation.value,
            [0, 1],
            [0.8, 1]
        );

        return {
            opacity,
            transform: [
                { translateY },
                { scale },
            ],
        };
    });

    return (
        <AnimatedPressable
            onPress={onPress}
            style={[styles.menuItem, animatedStyle]}
            className="bg-background"
        >
            {option?.icon && option?.icon}
            <Text
                variant="bodyText1"
                className={option.destructive ? "text-destructive" : "text-primary"}
            >
                {option.label}
            </Text>
        </AnimatedPressable>
    );
};

const styles = StyleSheet.create({
    backdrop: {
        position: "absolute",
        top: -1000,
        left: -1000,
        right: -1000,
        bottom: -1000,
        backgroundColor: "#000",
        zIndex: 1,
    },
    menuContainer: {
        position: "absolute",
        top: 50,
        right: 0,
        zIndex: 2,
        minWidth: 160,
        borderRadius: 10,
        overflow: 'hidden'
    },
    menuItem: {
        paddingHorizontal: 20,
        paddingVertical: 14,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
});
