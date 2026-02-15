import { View, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { ScreenHeader } from "@/components/headers";
import { Accordion } from "@/components/accordion";
import { faqItems } from "@/modules/settings/config";

export function FAQScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-background">
      <ScreenHeader title="FAQ'S" onBackPress={() => router.back()} />

      <ScrollView className="flex-1 px-4 py-4">
        <Accordion items={faqItems} />
      </ScrollView>
    </View>
  );
}
