import { cn } from "@/lib/utils";
import React, { createContext, useCallback, useContext, useState } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import Modal from "react-native-modal";

// ============ Types ============

type AnimationIn = "fadeIn" | "slideInUp" | "zoomIn" | "bounceIn";
type AnimationOut = "fadeOut" | "slideOutDown" | "zoomOut" | "bounceOut";

export interface AlertButton {
    text: string;
    onPress?: () => void;
    variant?: "primary" | "secondary" | "text";
    buttonContainerStyles?: string;
    buttonTitleStyles?: string;
}

export interface AlertOptions {
    // Backdrop
    backdropOpacity?: number;
    backdropColor?: string;
    dismissOnBackdropPress?: boolean;

    // Animation
    animationIn?: AnimationIn;
    animationOut?: AnimationOut;
    animationDuration?: number;

    // Styling
    containerStyles?: string;
    titleStyles?: string;
    messageStyles?: string;
    backdropStyles?: StyleProp<ViewStyle>;

    // Custom content (overrides title/message)
    customContent?: React.ReactNode;
}

interface AlertState {
    isVisible: boolean;
    title?: string;
    message?: string;
    buttons?: AlertButton[];
    options?: AlertOptions;
}

interface AlertContextType {
    alert: (title: string, message?: string, buttons?: AlertButton[], options?: AlertOptions) => void;
    custom: (content: React.ReactNode, options?: AlertOptions) => void;
    dismiss: () => void;
}

// ============ Context ============

const AlertContext = createContext<AlertContextType | null>(null);

// ============ Hook ============

export function useAlert(): AlertContextType {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error("useAlert must be used within an AlertProvider");
    }
    return context;
}

// ============ Static Alert API ============

let globalAlert: AlertContextType | null = null;

export const Alert = {
    alert: (title: string, message?: string, buttons?: AlertButton[], options?: AlertOptions) => {
        if (!globalAlert) {
            console.warn("AlertProvider not mounted. Wrap your app with <AlertProvider>.");
            return;
        }
        globalAlert.alert(title, message, buttons, options);
    },
    custom: (content: React.ReactNode, options?: AlertOptions) => {
        if (!globalAlert) {
            console.warn("AlertProvider not mounted. Wrap your app with <AlertProvider>.");
            return;
        }
        globalAlert.custom(content, options);
    },
    dismiss: () => {
        if (!globalAlert) {
            return;
        }
        globalAlert.dismiss();
    },
};

// ============ Provider Component ============

interface AlertProviderProps {
    children: React.ReactNode;
    // Default button renderer (can be customized)
    renderButton?: (button: AlertButton, index: number, dismiss: () => void) => React.ReactNode;
}

export function AlertProvider({ children, renderButton }: AlertProviderProps) {
    const [state, setState] = useState<AlertState>({
        isVisible: false,
    });

    const dismiss = useCallback(() => {
        setState((prev) => ({ ...prev, isVisible: false }));
    }, []);

    const alert = useCallback(
        (title: string, message?: string, buttons?: AlertButton[], options?: AlertOptions) => {
            setState({
                isVisible: true,
                title,
                message,
                buttons: buttons || [{ text: "OK" }],
                options,
            });
        },
        []
    );

    const custom = useCallback((content: React.ReactNode, options?: AlertOptions) => {
        setState({
            isVisible: true,
            options: { ...options, customContent: content },
        });
    }, []);

    // Set global reference
    React.useEffect(() => {
        globalAlert = { alert, custom, dismiss };
        return () => {
            globalAlert = null;
        };
    }, [alert, custom, dismiss]);

    const handleBackdropPress = () => {
        if (state.options?.dismissOnBackdropPress !== false) {
            dismiss();
        }
    };

    const handleButtonPress = (button: AlertButton) => {
        button.onPress?.();
        dismiss();
    };

    const defaultRenderButton = (button: AlertButton, index: number) => {
        const isSecondary = button.variant === "secondary" || button.variant === "text";
        return (
            <View
                key={index}
                className={cn(
                    "py-3 px-4 rounded-lg flex-1 items-center",
                    isSecondary ? "bg-transparent" : "bg-primary",
                    button?.buttonContainerStyles || ""
                )}
                onTouchEnd={() => handleButtonPress(button)}
            >
                <View>
                    <DefaultText
                        className={cn(
                            "font-semibold text-base",
                            isSecondary ? "text-primary" : "text-white",
                            button?.buttonTitleStyles || ""
                        )}
                    >
                        {button.text}
                    </DefaultText>
                </View>
            </View>
        );
    };

    const buttonRenderer = renderButton || defaultRenderButton;

    const {
        backdropOpacity = 0.5,
        backdropColor = "#000",
        animationIn = "fadeIn",
        animationOut = "fadeOut",
        animationDuration = 300,
        containerStyles,
        titleStyles,
        messageStyles,
        customContent,
    } = state.options || {};

    return (
        <AlertContext.Provider value={{ alert, custom, dismiss }}>
            {children}
            <Modal
                isVisible={state.isVisible}
                onBackdropPress={handleBackdropPress}
                backdropOpacity={backdropOpacity}
                backdropColor={backdropColor}
                animationIn={animationIn}
                animationOut={animationOut}
                animationInTiming={animationDuration}
                animationOutTiming={animationDuration}
                useNativeDriver
                statusBarTranslucent
            >
                <View className={cn("items-center justify-center bg-white rounded-[10px] p-6 ", containerStyles)}>
                    {customContent ? (
                        customContent
                    ) : (
                        <>
                            {state.title && (
                                <DefaultText
                                    className={cn(
                                        "text-lg font-semibold text-center mb-2",
                                        titleStyles
                                    )}
                                >
                                    {state.title}
                                </DefaultText>
                            )}
                            {state.message && (
                                <DefaultText
                                    className={cn(
                                        "text-base text-gray-600 text-center mb-4",
                                        messageStyles
                                    )}
                                >
                                    {state.message}
                                </DefaultText>
                            )}
                            {state.buttons && state.buttons.length > 0 && (
                                <View
                                    className={cn(
                                        "flex-row gap-3",
                                        state.buttons.length === 1 && "justify-center"
                                    )}
                                >
                                    {state.buttons.map((button, index) =>
                                        buttonRenderer(button, index, dismiss)
                                    )}
                                </View>
                            )}
                        </>
                    )}
                </View>
            </Modal>
        </AlertContext.Provider>
    );
}

// Simple Text component to avoid circular dependency
function DefaultText({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    const { Text } = require("react-native");
    return <Text className={className}>{children}</Text>;
}
