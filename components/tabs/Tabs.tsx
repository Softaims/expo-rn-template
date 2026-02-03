import { Pressable, View } from "react-native";
import { cn } from "@/lib/utils";
import { Text } from "@/components";
import { useState } from "react";

export type TabItem = {
  label: string;
  value: string;
  icon?: React.ReactNode;
};

const tabVariants = {
  underline: {
    container: "flex-row border-b border-border",
    tab: {
      base: "px-4 py-3 border-b-2",
      active: "border-primary",
      inactive: "border-transparent",
    },
    text: {
      base: "",
      active: "text-foreground",
      inactive: "text-muted-foreground",
    },
  },
  filled: {
    container: "flex-row gap-2",
    tab: {
      base: "px-4 py-2 rounded-lg",
      active: "bg-primary",
      inactive: "bg-muted",
    },
    text: {
      base: "",
      active: "text-primary-foreground",
      inactive: "text-muted-foreground",
    },
  },
  "filled-rounded": {
    container: "flex-row gap-2",
    tab: {
      base: "px-4 py-2 rounded-lg",
      active: "bg-primary",
      inactive: "bg-muted",
    },
    text: {
      base: "",
      active: "text-primary-foreground",
      inactive: "text-muted-foreground",
    },
  },
  pill: {
    container: "flex-row gap-2",
    tab: {
      base: "px-4 py-2 rounded-full",
      active: "bg-primary",
      inactive: "bg-muted",
    },
    text: {
      base: "",
      active: "text-primary-foreground",
      inactive: "text-muted-foreground",
    },
  },
  icon: {
    container: "flex-row border-b border-border",
    tab: {
      base: "px-6 py-3 flex-row items-center gap-2 border-b-2",
      active: "border-primary",
      inactive: "border-transparent",
    },
    text: {
      base: "",
      active: "text-foreground",
      inactive: "text-muted-foreground",
    },
  },
} as const;

export interface TabsProps {
  variant?: keyof typeof tabVariants;
  tabs: TabItem[];
  defaultValue?: string;
  onValueChange?: (value: string) => void;

  // Styling props
  containerStyles?: string;
  activeTabStyle?: string;
  inactiveTabStyle?: string;
  activeTextStyle?: string;
  inactiveTextStyle?: string;
}

export function Tabs({
  variant = "underline",
  tabs,
  defaultValue,
  onValueChange,
  containerStyles,
  activeTabStyle,
  inactiveTabStyle,
  activeTextStyle,
  inactiveTextStyle,
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue || tabs[0]?.value);

  const handleTabPress = (value: string) => {
    setActiveTab(value);
    onValueChange?.(value);
  };

  const variantStyles = tabVariants[variant];

  return (
    <View className={cn(variantStyles.container, containerStyles)}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.value;
        return (
          <Pressable
            key={tab.value}
            onPress={() => handleTabPress(tab.value)}
            className={cn(
              variantStyles.tab.base,
              isActive
                ? cn(variantStyles.tab.active, activeTabStyle)
                : cn(variantStyles.tab.inactive, inactiveTabStyle)
            )}
          >
            {tab.icon}
            <Text
              className={cn(
                variantStyles.text.base,
                isActive
                  ? cn(variantStyles.text.active, activeTextStyle)
                  : cn(variantStyles.text.inactive, inactiveTextStyle)
              )}
            >
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
