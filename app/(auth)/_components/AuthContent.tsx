import { View } from "react-native";
import { Text } from "@/components/text";
import { cn } from "@/lib/utils";

interface AuthContentProps {
  title: string;
  description: string;
  textClassName?: string;
}

export default function AuthContent({
  title,
  description,
  textClassName,
}: AuthContentProps) {
  return (
    <View>
      <Text
        variant="heading1"
        className={cn("text-foreground font-bold mb-2", textClassName)}
      >
        {title}
      </Text>
      <Text
        variant="bodyText2"
        className={cn("text-muted-foreground", textClassName)}
      >
        {description}
      </Text>
    </View>
  );
}
