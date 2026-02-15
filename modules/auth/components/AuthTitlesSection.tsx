import { View } from "react-native";
import { Text } from "@/components";
import { cn } from "@/lib/utils";

interface AuthTitlesSectionProps {
  title: string;
  description: string;
}

export default function AuthTitlesSection({
  title,
  description,
}: AuthTitlesSectionProps) {
  return (
    <View className="mb-[30px] gap-[10px]">
      <Text
        variant="heading1"
        className={cn("text-foreground font-bold")}
      >
        {title}
      </Text>
      <Text
        variant="bodyText2"
        className={cn("text-muted-foreground")}
      >
        {description}
      </Text>
    </View>
  );
}