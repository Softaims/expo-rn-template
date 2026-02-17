import { AuthContent } from "@/modules/auth/components";
import { useLoginScreen } from "@/modules/auth/hooks";
import { loginSchema } from "@/modules/auth/schemas";
import { loginFields } from "@/modules/auth/config";
import { ScreenWrapper } from "@/components";

export default function LoginScreen() {
  const {
    isBottomSheetVisible,
    setIsBottomSheetVisible,
    enableBackdropDismiss,
    handleSubmit,
    isLoading,
    handleNavigateToSignup,
    handleForgotPassword,
  } = useLoginScreen();

  return (
    <ScreenWrapper scrollEnabled={true}>
      <AuthContent
        variant="default"
        title="Welcome Back"
        description="To access your account please enter your account details."
        isBottomSheetVisible={isBottomSheetVisible}
        setIsBottomSheetVisible={setIsBottomSheetVisible}
        enableBackdropDismiss={enableBackdropDismiss}
        fields={loginFields}
        schema={loginSchema}
        buttonText="Login Account"
        showForgotPassword={true}
        onForgotPasswordPress={handleForgotPassword}
        onSubmit={handleSubmit}
        footerText="Don't have an account?"
        footerLinkText="Create Account"
        onFooterNavigate={handleNavigateToSignup}
        isLoading={isLoading}
      />
    </ScreenWrapper>
  );
}
