import { View } from 'react-native';
import { Text } from '@/components';

interface AuthContentProps {
  title: string;
  description: string;
}

export default function AuthContent({ title, description }: AuthContentProps) {
  return (
    <View className="mb-6">
      <Text variant="heading1" className="text-foreground font-bold mb-2">
        {title}
      </Text>
      <Text variant="bodyText2" className="text-muted-foreground">
        {description}
      </Text>
    </View>
  );
}
