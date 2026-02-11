import { View } from 'react-native';
import { Text } from '@/components/text';

interface SplashContentProps {
  title: string;
  description: string;
}

export default function SplashContent({ title, description }: SplashContentProps) {
  return (
    <View className="gap-4 px-8">
      <Text variant="heading1" className="text-center text-foreground">
        {title}
      </Text>
      <Text variant="bodyText1" className="text-center text-muted-foreground">
        {description}
      </Text>
    </View>
  );
}
