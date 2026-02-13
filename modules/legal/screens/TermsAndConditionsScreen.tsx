import { LegalDocumentScreen } from "@/modules/legal/components";
import { termsSections } from "@/modules/legal/config/legalContent";

export function TermsAndConditionsScreen() {
  return (
    <LegalDocumentScreen
      title="Terms & Conditions"
      introText="Welcome to our Fitness App. These Terms and Conditions govern your access to and use of our application and services. By downloading, registering, or using this app, you agree to comply with and be bound by these terms. If you do not agree, please discontinue use of the app immediately."
      sections={termsSections}
    />
  );
}
