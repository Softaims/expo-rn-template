import { View } from "react-native";
import { Text } from "@/components";
import { PocketCoachIcon } from "@/assets/icons";
import { useTheme } from "@/lib/theme";
import { styles } from "./AuthHeader.styles";

export default function AuthHeader() {
  const { colors } = useTheme();

  return (
    <View style={styles.row}>
      <PocketCoachIcon />
      <Text variant="heading3" style={{ color: colors.text }}>
        RN Template
      </Text>
    </View>
  );
}
