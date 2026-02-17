import { Stack } from "expo-router";
import { HeaderBackButton, ScreenWrapper } from "@/components";
import { LegalDocumentScreen } from "@/modules/legal/components";
import { privacySections } from "@/modules/legal/config/legalContent";

export function PrivacyPolicyScreen() {
  return (
    <ScreenWrapper scrollEnabled headerTransparent>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: "Privacy Policy",
          headerLeft: () => <HeaderBackButton />,
        }}
      />
      <LegalDocumentScreen
        title="Privacy Policy"
        introText="Welcome to our Fitness App. This Privacy Policy explains how our Fitness App collects, uses, stores, and discloses your personal information. By using our app, you agree to the practices described in this policy. If you do not agree, please discontinue use of our services."
        sections={privacySections}
      />
    </ScreenWrapper>
  );
}
