import { Stack } from "expo-router";
import { HeaderBackButton, ScreenWrapper } from "@/components";
import { AuthContent } from "@/modules/auth/components";
import { resetPasswordFields } from "@/modules/auth/config";
import { resetPasswordSchema } from "@/modules/auth/schemas";
import { useResetPasswordScreen } from "@/modules/auth/hooks";

export default function ResetPasswordScreen() {
  const { handleSubmit, handleGoBack, isLoading } = useResetPasswordScreen();

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
        title="Reset Password"
        description="Enter your new password to access your account"
        fields={resetPasswordFields}
        schema={resetPasswordSchema}
        buttonText="Continue"
        onSubmit={handleSubmit}
        showHeader={false}
        showFooter={false}
        showSocialAuthButtons={false}
        image={require("@/assets/images/reset-password-icon.png")}
        formContainerStyles="flex-1 justify-between"
        isLoading={isLoading}
      />
    </ScreenWrapper>
  );
}
