import { ScrollView } from "react-native";
import { BottomSheet, ScreenWrapper } from "@/components";
import {
  AuthForm,
  SocialAuthButtons,
  AuthFooter,
  AuthHeader,
  AuthTitlesSection,
} from "@/modules/auth/components";
import type { ZodType } from "zod";
import type { FieldConfig } from "@/modules/auth/types";

interface AuthContentProps {
  // Variant
  variant?: "default" | "bottom-sheet";

  // Titles
  title: string;
  description: string;

  // Bottom sheet state
  isBottomSheetVisible: boolean;
  setIsBottomSheetVisible: (visible: boolean) => void;
  enableBackdropDismiss: boolean;

  // Form config
  fields: FieldConfig[];
  schema: ZodType<any>;
  buttonText: string;
  showForgotPassword?: boolean;
  onForgotPasswordPress?: () => void;
  onSubmit: (data: any) => Promise<void>;

  // Footer config
  footerText: string;
  footerLinkText: string;
  onFooterNavigate: () => void;
}

export default function AuthContent({
  variant = "default",
  title,
  description,
  isBottomSheetVisible,
  setIsBottomSheetVisible,
  enableBackdropDismiss,
  fields,
  schema,
  buttonText,
  showForgotPassword = false,
  onForgotPasswordPress,
  onSubmit,
  footerText,
  footerLinkText,
  onFooterNavigate,
}: AuthContentProps) {
  const content = (
    <ScrollView contentContainerClassName="flex-1">
      <AuthHeader />
      <AuthTitlesSection title={title} description={description} />

      <AuthForm
        fields={fields}
        schema={schema}
        buttonText={buttonText}
        showForgotPassword={showForgotPassword}
        onForgotPasswordPress={onForgotPasswordPress}
        onSubmit={onSubmit}
      />

      <SocialAuthButtons />

      <AuthFooter
        text={footerText}
        linkText={footerLinkText}
        onNavigate={onFooterNavigate}
      />
    </ScrollView>
  );

  if (variant === "bottom-sheet") {
    return (
      <BottomSheet
        isVisible={isBottomSheetVisible}
        setIsVisible={setIsBottomSheetVisible}
        enableBackdropDismiss={enableBackdropDismiss}
        sheetContentContainerStyles="px-0 pb-0"
      >
        {content}
      </BottomSheet>
    );
  }

  return <ScreenWrapper>{content}</ScreenWrapper>;
}
