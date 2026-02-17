import { View } from "react-native";
import { Text } from "@/components/text";
import { cn } from "@/lib/utils";
import type { LegalContentSectionProps } from "@/modules/legal/types";

export function LegalContentSection({
  number,
  title,
  content,
  bullets,
  containerStyles,
}: LegalContentSectionProps) {
  return (
    <View className={cn("mb-6", containerStyles)}>
      <Text className="text-base font-bold text-foreground mb-2">
        {number ? `${number}. ${title}` : title}
      </Text>

      {content?.map((paragraph, index) => (
        <Text
          key={index}
          className="text-sm text-muted-foreground leading-5 mb-2"
        >
          {paragraph}
        </Text>
      ))}

      {bullets && bullets.length > 0 && (
        <View className="ml-4">
          {bullets.map((bullet, index) => (
            <View key={index} className="flex-row mb-1">
              <Text className="text-sm text-muted-foreground mr-2">•</Text>
              <Text className="text-sm text-muted-foreground leading-5 flex-1">
                {bullet}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
