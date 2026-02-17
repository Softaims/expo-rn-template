import { View, Pressable } from 'react-native';
import { Text } from '@/components';

import type { AuthFooterProps } from "@/modules/auth/types";

export default function AuthFooter({ text, linkText, onNavigate }: AuthFooterProps) {
  return (
    <View className="px-6 py-4 flex-row justify-center items-center gap-1">
      <Text variant="bodyText2" className="text-muted-foreground">
        {text}
      </Text>
      <Pressable onPress={onNavigate}>
        <Text variant="bodyText2" className="text-foreground font-semibold underline">
          {linkText}
        </Text>
      </Pressable>
    </View>
  );
}
