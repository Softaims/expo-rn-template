import { View, Pressable } from "react-native";
import { Text } from "@/components";
import { useTheme } from "@/lib/theme";

import type { AuthFooterProps } from "@/modules/auth/types";
import { styles } from "./AuthFooter.styles";

export default function AuthFooter({ text, linkText, onNavigate }: AuthFooterProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.row}>
      <Text variant="bodyText2" style={{ color: colors.mutedForeground }}>
        {text}
      </Text>
      <Pressable onPress={onNavigate}>
        <Text
          variant="bodyText2"
          style={[
            styles.link,
            { color: colors.text },
          ]}
        >
          {linkText}
        </Text>
      </Pressable>
    </View>
  );
}
