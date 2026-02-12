import { useRouter, useLocalSearchParams } from "expo-router";
import PasswordForm from "@/modules/commons/PasswordForm";
import { resetPasswordSchema } from "../schemas";
import { ResetPasswordFormData } from "@/modules/auth/schemas";
import { resetPasswordFields } from "@/modules/auth/config";
import { useResetPassword } from "@/modules/auth/hooks";
import { showSuccessAlert, showErrorAlert } from "@/components/alerts";

export default function ResetPasswordScreen() {
  const router = useRouter();
  const { code } = useLocalSearchParams<{ code: string }>();
  const { resetPassword, isLoading } = useResetPassword();

  const handleSubmit = async (data: ResetPasswordFormData) => {
    if (!code) {
      showErrorAlert({
        title: "Error",
        message: "Verification code missing.",
      });
      return;
    }

    try {
      await resetPassword(code, data.newPassword);

      showSuccessAlert({
        title: "Password Updated!",
        message: "You can now login.",
        buttonText: "Login Now",
        onPress: () => router.replace("/(auth)/login"),
      });
    } catch (error: any) {
      showErrorAlert({
        title: "Error",
        message:
          error?.errors?.[0]?.longMessage ||
          error?.message ||
          "Failed to reset password.",
      });
    }
  };

  return (
    <PasswordForm
      title="Reset Password"
      description="Enter your new password to access your account"
      fields={resetPasswordFields}
      schema={resetPasswordSchema}
      buttonText="Continue"
      onSubmit={handleSubmit}
      onBack={() => router.replace("/(auth)/forgot-password")}
      showIcon
      isLoading={isLoading}
    />
  );
}
