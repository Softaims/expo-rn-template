import { Pressable, View, ViewStyle, TextStyle } from "react-native";
import { cn } from "@/lib/utils";
import { Text } from "@/components/text/Text";
import { fontFamilies } from "@/hooks/useFonts";
import { useState } from "react";
import { getElementClasses, getElementTextStyle } from "@/lib/component-styles";

// Helper to get view style safely
const getViewStyle = (styles: any, key: string): ViewStyle | undefined => {
  return styles?.[key] as ViewStyle | undefined;
};

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

type TabsElements = "container" | "tab" | "tabIconWrapper" | "tabText";

export interface TabsProps {
  variant?: keyof typeof tabVariants;
  tabs: TabItem[];
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  style?: ViewStyle;
  classes?: Partial<Record<TabsElements, string>>;
  styles?: {
    container?: ViewStyle;
    tab?: ViewStyle;
    tabIconWrapper?: ViewStyle;
    tabText?: TextStyle;
  };
}

export function Tabs({
  variant = "underline",
  tabs,
  defaultValue,
  onValueChange,
  className,
  style,
  classes,
  styles,
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue || tabs[0]?.value);

  const handleTabPress = (value: string) => {
    setActiveTab(value);
    onValueChange?.(value);
  };

  const variantStyles = tabVariants[variant];

  return (
    <View
      className={getElementClasses(
        classes,
        "container",
        cn(variantStyles.container, className)
      )}
      style={[style, getViewStyle(styles, "container")]}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.value;
        return (
          <Pressable
            key={tab.value}
            onPress={() => handleTabPress(tab.value)}
            className={getElementClasses(
              classes,
              "tab",
              cn(
                variantStyles.tab.base,
                isActive ? variantStyles.tab.active : variantStyles.tab.inactive
              )
            )}
            style={getViewStyle(styles, "tab")}
          >
            {tab.icon && (
              <View
                className={getElementClasses(classes, "tabIconWrapper", "")}
                style={getViewStyle(styles, "tabIconWrapper")}
              >
                {tab.icon}
              </View>
            )}
            <Text
              className={getElementClasses(
                classes,
                "tabText",
                cn(
                  variantStyles.text.base,
                  isActive ? variantStyles.text.active : variantStyles.text.inactive
                )
              )}
              style={[
                { fontFamily: fontFamilies.semibold },
                getElementTextStyle(styles, "tabText"),
              ]}
            >
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
