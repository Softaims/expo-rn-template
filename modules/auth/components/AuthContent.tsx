import { Image, View } from "react-native";
import { BottomSheet } from "@/components";
import { hp } from "@/lib/responsive";
import { useTheme } from "@/lib/theme";
import AuthForm from "@/modules/auth/components/AuthForm";
import SocialAuthButtons from "@/modules/auth/components/SocialAuthButtons";
import AuthFooter from "@/modules/auth/components/AuthFooter";
import AuthHeader from "@/modules/auth/components/AuthHeader";
import AuthTitlesSection from "@/modules/auth/components/AuthTitlesSection";

import type { AuthContentProps } from "@/modules/auth/types";
import { styles } from "./AuthContent.styles";

export default function AuthContent({
  variant = "default",
  title,
  description,
  titleStyle,
  descriptionStyle,
  image,
  imageStyle,
  isBottomSheetVisible = false,
  setIsBottomSheetVisible = () => {},
  enableBackdropDismiss = false,
  fields,
  schema,
  buttonText,
  showForgotPassword = false,
  onForgotPasswordPress,
  onSubmit,
  formContainerStyle,
  footerText = "",
  footerLinkText = "",
  onFooterNavigate = () => {},
  showHeader = true,
  showFooter = true,
  showSocialAuthButtons = true,
  isLoading = false,
}: AuthContentProps) {
  const { colors, spacing } = useTheme();

  const sheetContentStyle = [
    {
      paddingHorizontal: spacing.page,
      paddingBottom: hp(4),
      backgroundColor: colors.background,
    },
  ];

  const content = (
    <View style={styles.root}>
      <View style={styles.upper}>
        {showHeader && <AuthHeader />}

        {image && (
          <Image
            source={image}
            style={[styles.heroImage, imageStyle]}
          />
        )}

        <AuthTitlesSection
          title={title}
          description={description}
          titleStyle={titleStyle}
          descriptionStyle={descriptionStyle}
        />

        <AuthForm
          fields={fields}
          schema={schema}
          buttonText={buttonText}
          showForgotPassword={showForgotPassword}
          onForgotPasswordPress={onForgotPasswordPress}
          onSubmit={onSubmit}
          containerStyle={formContainerStyle}
          isLoading={isLoading}
        />

        {showSocialAuthButtons && <SocialAuthButtons />}
      </View>

      {showFooter && (
        <AuthFooter
          text={footerText}
          linkText={footerLinkText}
          onNavigate={onFooterNavigate}
        />
      )}
    </View>
  );

  if (variant === "bottom-sheet") {
    return (
      <BottomSheet
        isVisible={isBottomSheetVisible}
        setIsVisible={setIsBottomSheetVisible}
        enableBackdropDismiss={enableBackdropDismiss}
        sheetContentContainerStyle={sheetContentStyle}
      >
        {content}
      </BottomSheet>
    );
  }

  return <>{content}</>;
}
