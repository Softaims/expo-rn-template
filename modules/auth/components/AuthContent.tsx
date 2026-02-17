import { Image, View } from "react-native";
import { BottomSheet } from "@/components";
import AuthForm from "@/modules/auth/components/AuthForm";
import SocialAuthButtons from "@/modules/auth/components/SocialAuthButtons";
import AuthFooter from "@/modules/auth/components/AuthFooter";
import AuthHeader from "@/modules/auth/components/AuthHeader";
import AuthTitlesSection from "@/modules/auth/components/AuthTitlesSection";
import { cn } from "@/lib/utils";

import type { AuthContentProps } from "@/modules/auth/types";

export default function AuthContent({
  variant = "default",
  title,
  description,
  titleStyles,
  descriptionStyles,
  image,
  imageStyles,
  isBottomSheetVisible = false,
  setIsBottomSheetVisible = () => { },
  enableBackdropDismiss = false,
  fields,
  schema,
  buttonText,
  showForgotPassword = false,
  onForgotPasswordPress,
  onSubmit,
  formContainerStyles,
  footerText = "",
  footerLinkText = "",
  onFooterNavigate = () => { },
  showHeader = true,
  showFooter = true,
  showSocialAuthButtons = true,
  isLoading = false,
}: AuthContentProps) {
  const content = (
    <View className="flex-1 justify-between">
      <View className="flex-1">
        {showHeader && <AuthHeader />}

        {image && <Image source={image} className={cn("w-[100px] h-[100px] object-contain self-center mb-[20px] mt-[15%]", imageStyles)} />}

        <AuthTitlesSection
          title={title}
          description={description}
          titleStyles={titleStyles}
          descriptionStyles={descriptionStyles}
        />

        <AuthForm
          fields={fields}
          schema={schema}
          buttonText={buttonText}
          showForgotPassword={showForgotPassword}
          onForgotPasswordPress={onForgotPasswordPress}
          onSubmit={onSubmit}
          className={formContainerStyles}
          isLoading={isLoading}
        />

        {showSocialAuthButtons && <SocialAuthButtons />}
      </View>

      {showFooter && <AuthFooter
        text={footerText}
        linkText={footerLinkText}
        onNavigate={onFooterNavigate}
      />}
    </View>
  );

  if (variant === "bottom-sheet") {
    return (
      <BottomSheet
        isVisible={isBottomSheetVisible}
        setIsVisible={setIsBottomSheetVisible}
        enableBackdropDismiss={enableBackdropDismiss}
        sheetContentContainerStyles="px-0 pb-0 px-[16px] pb-[32px] bg-background"
      >
        {content}
      </BottomSheet>
    );
  }

  return <>{content}</>;
}
