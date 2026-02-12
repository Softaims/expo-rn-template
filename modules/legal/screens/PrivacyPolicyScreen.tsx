import { LegalDocumentScreen } from "@/modules/legal/components";
import { privacySections } from "@/modules/legal/config/legalContent";

export function PrivacyPolicyScreen() {
  return (
    <LegalDocumentScreen
      title="Privacy Policy"
      introText="Welcome to our Fitness App. This Privacy Policy explains how our Fitness App collects, uses, stores, and discloses your personal information. By using our app, you agree to the practices described in this policy. If you do not agree, please discontinue use of our services."
      sections={privacySections}
    />
  );
}
