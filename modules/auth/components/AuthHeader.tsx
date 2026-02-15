import { View } from 'react-native';
import { Text } from '@/components';
import { PocketCoachIcon } from '@/assets/icons';

export default function AuthHeader() {
  return (
    <View className="flex-row items-center gap-2 mb-[30px]">
      <PocketCoachIcon />
      <Text variant="heading3" className="text-foreground font-bold">
        RN Template
      </Text>
    </View>
  );
}