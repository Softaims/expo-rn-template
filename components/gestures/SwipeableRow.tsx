import React from "react";
import { Pressable, View } from "react-native";
import { Text } from "@/components/text";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    runOnJS,
    interpolate,
    Extrapolation,
    SharedValue,
} from "react-native-reanimated";

const BUTTON_WIDTH = 40;

export interface SwipeAction {
    title?: string;
    icon: React.ReactNode;
    onPress?: () => void;
    type: 'default' | 'destructive' | 'primary';
}

export interface SwipeableRowProps {
    children: React.ReactNode;
    actions?: SwipeAction[];
    onPress?: () => void;
    buttonWidth?: number;
    enabled?: boolean;
}

const SwipeActionButton = ({ action, index, totalButtons, translateX, buttonWidth }: {
    action: SwipeAction;
    index: number;
    totalButtons: number;
    translateX: SharedValue<number>;
    buttonWidth: number;
}) => {
    const animatedStyle = useAnimatedStyle(() => {
        const maxTranslate = totalButtons * buttonWidth;
        const buttonOffset = (totalButtons - index) * buttonWidth;

        const scale = interpolate(
            Math.abs(translateX.value),
            [0, buttonOffset, maxTranslate],
            [0, 1, 1],
            Extrapolation.CLAMP
        );

        return {
            transform: [{ scale }],
            opacity: interpolate(
                Math.abs(translateX.value),
                [0, buttonWidth / 2],
                [0, 1],
                Extrapolation.CLAMP
            ),
        };
    });

    const getBackgroundColor = () => {
        switch (action.type) {
            case 'destructive':
                return 'bg-destructive';
            case 'primary':
                return 'bg-primary';
            default:
                return 'bg-muted';
        }
    };

    const getTextColor = () => {
        switch (action.type) {
            case 'destructive':
                return 'text-destructive-foreground';
            case 'primary':
                return 'text-primary-foreground';
            default:
                return 'text-muted-foreground';
        }
    };

    return (
        <Animated.View style={animatedStyle}>
            <Pressable
                onPress={action.onPress}
                className={`h-full items-center justify-center rounded-[10px] ${getBackgroundColor()}`}
                style={{ width: buttonWidth }}
            >
                {action.icon}
                {action.title && <Text variant="bodyText2" className={getTextColor()}>{action.title}</Text>}
            </Pressable>
        </Animated.View>
    );
};

export const SwipeableRow = ({
    children,
    actions = [],
    onPress,
    buttonWidth = BUTTON_WIDTH,
    enabled = true,
}: SwipeableRowProps) => {
    const hasActions = actions.length > 0 && enabled;
    const translateX = useSharedValue(0);
    const maxSwipeDistance = actions.length * buttonWidth;

    const resetPosition = () => {
        translateX.value = withSpring(0, { damping: 20, stiffness: 200 });
    };

    const panGesture = Gesture.Pan()
        .activeOffsetX([-10, 10])
        .onUpdate((event) => {
            if (!hasActions) return;
            // Only allow swiping left (negative values)
            const newValue = Math.min(0, Math.max(-maxSwipeDistance, event.translationX));
            translateX.value = newValue;
        })
        .onEnd(() => {
            if (!hasActions) return;
            // Snap to open or closed position
            if (Math.abs(translateX.value) > maxSwipeDistance / 2) {
                translateX.value = withSpring(-maxSwipeDistance, { damping: 20, stiffness: 200 });
            } else {
                runOnJS(resetPosition)();
            }
        });

    const tapGesture = Gesture.Tap()
        .onStart(() => {
            if (translateX.value !== 0) {
                runOnJS(resetPosition)();
            } else if (onPress) {
                runOnJS(onPress)();
            }
        });

    const composedGesture = Gesture.Race(panGesture, tapGesture);

    const animatedContentStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    const animatedActionsStyle = useAnimatedStyle(() => ({
        width: interpolate(
            Math.abs(translateX.value),
            [0, maxSwipeDistance],
            [0, maxSwipeDistance],
            Extrapolation.CLAMP
        ),
    }));

    return (
        <View className="overflow-hidden">
            <Animated.View
                style={animatedActionsStyle}
                className="absolute right-0 top-0 bottom-0 flex-row justify-end"
            >
                {actions.map((action, index) => (
                    <SwipeActionButton
                        key={index}
                        action={action}
                        index={index}
                        totalButtons={actions.length}
                        translateX={translateX}
                        buttonWidth={buttonWidth}
                    />
                ))}
            </Animated.View>

            <GestureDetector gesture={composedGesture}>
                <Animated.View style={animatedContentStyle} className="bg-background">
                    {children}
                </Animated.View>
            </GestureDetector>
        </View>
    );
};
