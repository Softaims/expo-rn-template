import { Pressable, Text, View } from "react-native";
import { cn } from "@/lib/utils";
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
      base: "font-semibold",
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
      base: "font-semibold",
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
      base: "font-semibold",
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
      base: "font-semibold",
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
      base: "font-semibold",
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
  className?: string;
}

export function Tabs({
  variant = "underline",
  tabs,
  defaultValue,
  onValueChange,
  className,
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue || tabs[0]?.value);

  const handleTabPress = (value: string) => {
    setActiveTab(value);
    onValueChange?.(value);
  };

  const styles = tabVariants[variant];

  return (
    <View className={cn(styles.container, className)}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.value;
        return (
          <Pressable
            key={tab.value}
            onPress={() => handleTabPress(tab.value)}
            className={cn(
              styles.tab.base,
              isActive ? styles.tab.active : styles.tab.inactive
            )}
          >
            {tab.icon && <View>{tab.icon}</View>}
            <Text
              className={cn(
                styles.text.base,
                isActive ? styles.text.active : styles.text.inactive
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
