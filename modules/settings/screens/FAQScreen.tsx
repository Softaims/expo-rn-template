import { Stack } from "expo-router";
import { HeaderBackButton, ScreenWrapper } from "@/components";
import { Accordion } from "@/components/accordion";
import { faqItems } from "@/modules/settings/config";

export function FAQScreen() {
  return (
    <ScreenWrapper scrollEnabled headerTransparent>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: "FAQ'S",
          headerLeft: () => <HeaderBackButton />,
        }}
      />
      <Accordion items={faqItems} />
    </ScreenWrapper>
  );
}
