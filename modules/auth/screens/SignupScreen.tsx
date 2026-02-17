import { AuthContent } from "@/modules/auth/components";
import { useSignupScreen } from "@/modules/auth/hooks";
import { signupSchema } from "@/modules/auth/schemas";
import { signupFields } from "@/modules/auth/config";
import { ScreenWrapper } from "@/components";

export default function SignupScreen() {
  const {
    isBottomSheetVisible,
    setIsBottomSheetVisible,
    enableBackdropDismiss,
    handleSubmit,
    handleNavigateToLogin,
    isLoading,
  } = useSignupScreen();

  return (
    <ScreenWrapper scrollEnabled={true}>
      <AuthContent
        variant="default"
        title="Register Yourself"
        description="For Registration please enter the required account registration details."
        isBottomSheetVisible={isBottomSheetVisible}
        setIsBottomSheetVisible={setIsBottomSheetVisible}
        enableBackdropDismiss={enableBackdropDismiss}
        fields={signupFields}
        schema={signupSchema}
        buttonText="Sign Up"
        onSubmit={handleSubmit}
        footerText="Already have an account?"
        footerLinkText="Login"
        onFooterNavigate={handleNavigateToLogin}
        isLoading={isLoading}
      />
    </ScreenWrapper>
  );
}
