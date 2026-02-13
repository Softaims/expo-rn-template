import { ScrollView, View } from "react-native";
import { useRouter } from "expo-router";
import { ScreenHeader } from "@/components/headers";
import { LegalContentSection } from "./LegalContentSection";
import { Text } from "@/components/text";
import { LegalSection } from "@/modules/legal/types";

interface LegalDocumentScreenProps {
  title: string;
  introText: string;
  sections: LegalSection[];
}

export function LegalDocumentScreen({
  title,
  introText,
  sections,
}: LegalDocumentScreenProps) {
  const router = useRouter();

  return (
    <View className="flex-1 bg-background">
      <ScreenHeader title={title} onBackPress={() => router.back()} />

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
