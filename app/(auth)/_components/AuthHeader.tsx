import { View } from 'react-native';
import { Text } from '@/components';
import { PocketCoachIcon } from '@/assets/icons';

export default function AuthHeader() {
  return (
    <View className="py-4">
      <View className="flex-row items-center gap-2">
        <PocketCoachIcon width={32} height={32} />
        <Text variant="heading3" className="text-foreground font-bold">
          Pocket Coach
        </Text>
      </View>
    </View>
  );
}
