import { View } from "react-native";
import { Text } from "@/components";
import { cn } from "@/lib/utils";

import type { AuthTitlesSectionProps } from "@/modules/auth/types";

export default function AuthTitlesSection({
  title,
  description,
  titleStyles,
  descriptionStyles,
}: AuthTitlesSectionProps) {
  return (
    <View className="mb-[30px] gap-[10px]">
      <Text
        variant="heading1"
        className={cn("text-foreground font-bold", titleStyles)}
      >
        {title}
      </Text>
      <Text
        variant="bodyText2"
        className={cn("text-muted-foreground", descriptionStyles)}
      >
        {description}
      </Text>
    </View>
  );
}