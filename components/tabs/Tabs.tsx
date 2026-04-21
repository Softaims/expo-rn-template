import { Pressable, View } from "react-native";
import { Text } from "@/components/text";
import { useState, useMemo } from "react";
import { useTheme } from "@/lib/theme";
import type { StyleProp, ViewStyle, TextStyle } from "react-native";
import {
  type TabVariant,
  tabsContainer,
  tabVisual,
  tabLabelStyle,
} from "./styles";

export type TabItem = {
  label: string;
  value: string;
  icon?: (isActive: boolean) => React.ReactNode;
};

export interface TabsProps {
  variant?: TabVariant;
  tabs: TabItem[];
  defaultValue?: string;
  onValueChange?: (value: string) => void;

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
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState(defaultValue || tabs[0]?.value);

  const handleTabPress = (value: string) => {
    setActiveTab(value);
    onValueChange?.(value);
  };

  const containerStyle = useMemo(
    (): StyleProp<ViewStyle> => tabsContainer(variant, colors),
    [colors, variant]
  );

  const getTabStyle = (isActive: boolean): StyleProp<ViewStyle> => {
    return tabVisual(variant, isActive, colors);
  };

  const getTextStyle = (isActive: boolean): TextStyle => {
    return tabLabelStyle(variant, isActive, colors);
  };

  return (
    <View style={containerStyle} className={containerStyles}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.value;
        return (
          <Pressable
            key={tab.value}
            onPress={() => handleTabPress(tab.value)}
            style={getTabStyle(isActive)}
            className={isActive ? activeTabStyle : inactiveTabStyle}
          >
            {tab.icon?.(isActive)}

            <Text
              variant="bodyText1"
              style={getTextStyle(isActive)}
              className={isActive ? activeTextStyle : inactiveTextStyle}
            >
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
