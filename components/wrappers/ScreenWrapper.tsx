import { useTheme } from "@/lib/theme";
import { ScrollView, View, ViewStyle, StyleProp } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./styles";

export interface ScreenWrapperProps {
  children: React.ReactNode;
  containerClassName?: string;
  /** @deprecated Use `containerClassName`. */
  containerStyles?: string;
  containerStyle?: StyleProp<ViewStyle>;
  scrollEnabled?: boolean;
  headerTransparent?: boolean;
}

export function ScreenWrapper({
  children,
  containerClassName,
  containerStyles,
  containerStyle,
  scrollEnabled = false,
  headerTransparent = false,
}: ScreenWrapperProps) {
  const { colors, spacing } = useTheme();
  const { top, bottom } = useSafeAreaInsets();

  const paddingTop = headerTransparent ? top * 1.8 : top;
  const paddingBottom = headerTransparent ? 16 : bottom;

  const className = containerClassName ?? containerStyles;

  const paddingStyle: ViewStyle = {
    paddingHorizontal: spacing.page,
    paddingTop,
    paddingBottom,
    backgroundColor: colors.background,
  };

  if (scrollEnabled) {
    const contentStyle: StyleProp<ViewStyle> = [
      styles.scrollContentGrow,
      paddingStyle,
      containerStyle,
    ];
    return (
      <ScrollView
        style={[styles.rootFlex, { backgroundColor: colors.background }]}
        contentContainerStyle={contentStyle}
        showsVerticalScrollIndicator={false}
        className={className}
      >
        {children}
      </ScrollView>
    );
  }

  const inner: StyleProp<ViewStyle> = [
    styles.rootFlex,
    paddingStyle,
    containerStyle,
  ];

  return (
    <View style={inner} className={className}>
      {children}
    </View>
  );
}
