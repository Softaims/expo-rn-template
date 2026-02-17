import { View } from "react-native";
import { Text } from "react-native";
import { SettingsItem } from "./SettingsItem";
import { useRoutingUtils } from "@/lib/routingUtils";
import { ChevronRightIcon } from "@/assets/icons";
import { Toggle } from "@/components";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { SettingsItemConfig, SettingsButtonSectionProps } from "../types";

export type { ActionHandlers, ToggleStates } from "../types";

const settingsButtonSectionVariants = {
    container: {
        primary: "",
        secondary: "bg-input border border-border rounded-[10px]",
    }
} as const;


export function SettingsButtonSection({ 
    title, 
    items, 
    variant = "seperate",
    actionHandlers = {},
    toggleStates = {},
}: SettingsButtonSectionProps) {
    const { push } = useRoutingUtils();

    const renderSettingsItem = (item: SettingsItemConfig) => {
        const toggleState = toggleStates[item.id];

        const onPress = () => {
            if (item.route) {
                push(item.route);
            } else if (item.actionKey && actionHandlers[item.actionKey]) {
                actionHandlers[item.actionKey]?.();
            }
        };

        let rightIcon: React.ReactNode = <ChevronRightIcon />;

        if (item.hasToggle && toggleState) {
            rightIcon = (
                <Toggle 
                    value={toggleState.value} 
                    onValueChange={toggleState.onValueChange} 
                />
            );
        }

        return (
            <SettingsItem
                key={item.id}
                leftIcon={item.icon}
                text={item.text}
                rightIcon={rightIcon}
                onPress={item.hasToggle ? undefined : onPress}
                variant={variant === "seperate" ? "primary" : "secondary"}
            />
        );
    };

    return (
        <View className="mb-[20px]">
            <Text className="text-lg font-semibold text-muted-foreground mb-4">
                {title}
            </Text>
            <View className={cn(
                settingsButtonSectionVariants.container[variant === 'seperate' ? 'primary' : 'secondary']
            )}>
                {items.map((item) => renderSettingsItem(item))}
            </View>
        </View>
    );
}