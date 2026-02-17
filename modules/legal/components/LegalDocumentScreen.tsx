import { ScrollView, View } from "react-native";
import { LegalContentSection } from "./LegalContentSection";
import { Text } from "@/components/text";
import type { LegalDocumentScreenProps } from "@/modules/legal/types";

export function LegalDocumentScreen({
  title,
  introText,
  sections,
}: LegalDocumentScreenProps) {

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1 py-4">
        <Text className="text-sm text-muted-foreground leading-5 mb-6">
          {introText}
        </Text>

        {sections.map((section, index) => (
          <LegalContentSection
            key={index}
            number={index + 1}
            title={section.title}
            content={section.content}
            bullets={section.bullets}
          />
        ))}
      </ScrollView>
    </View>
  );
}
