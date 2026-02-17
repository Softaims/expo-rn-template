import { HeaderBackButton, ScreenWrapper } from "@/components";
import { AuthContent } from "@/modules/auth/components";
import { forgotPasswordFields } from "@/modules/auth/config";
import { useForgotPasswordScreen } from "@/modules/auth/hooks";
import { forgotPasswordSchema } from "@/modules/auth/schemas";
import { Stack } from "expo-router";

export default function ForgotPasswordScreen() {
  const { handleSubmit, handleGoBack, isLoading } = useForgotPasswordScreen();

  return (
    <ScreenWrapper scrollEnabled>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: "",
          headerLeft: () => <HeaderBackButton onPress={handleGoBack} />,
        }}
      />

      <AuthContent
        title="Forgot Password?"
        description="Enter the email address on which we can send you verification OTP"
        fields={forgotPasswordFields}
        schema={forgotPasswordSchema}
        buttonText="Send Verification Code"
        onSubmit={handleSubmit}
        showHeader={false}
        showFooter={false}
        showSocialAuthButtons={false}
        image={require("@/assets/images/forgot-password-icon.png")}
        formContainerStyles="flex-1 justify-between"
        isLoading={isLoading}
      />
    </ScreenWrapper>
  );
}
