import { Text } from "@/components/text";
import { SettingsItemProps } from "@/modules/settings/types";
import { Pressable, View } from "react-native";
import { getSettingsIcon } from "../config/settingsConfig";
import { useTheme } from "@/lib/theme";
import { styles } from "./SettingsItem.styles";

export function SettingsItem({
  leftIcon,
  text,
  rightIcon,
  onPress,
  disabled = false,
  containerStyles,
  leftIconStyles,
  textStyles,
  rightIconStyles,
  variant = "primary",
}: SettingsItemProps) {
  const { colors } = useTheme();
  const isDisabled = !!(disabled || !onPress);

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={[
        styles.pressableRow,
        {
          backgroundColor: colors.input,
          borderColor: colors.border,
          borderWidth: variant === "secondary" ? 0 : 1,
          opacity: isDisabled ? 0.5 : 1,
        },
      ]}
      className={containerStyles}
    >
      <View style={styles.left}>
        {leftIcon && (
          <View style={styles.iconBox} className={leftIconStyles}>
            {getSettingsIcon(leftIcon as string)}
          </View>
        )}
        <View style={styles.textCol}>
          <Text
            variant="subheading3"
            style={{ color: colors.text }}
            className={textStyles}
          >
            {text}
          </Text>
        </View>
      </View>
      {rightIcon && (
        <View style={styles.right} className={rightIconStyles}>
          {rightIcon}
        </View>
      )}
    </Pressable>
  );
}
