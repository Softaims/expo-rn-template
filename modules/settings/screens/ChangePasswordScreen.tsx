import { View } from "react-native";
import { useRouter } from "expo-router";
import PasswordForm from "@/modules/commons/PasswordForm";
import { changePasswordSchema } from "../schemas/settingsSchemas";
import { changePasswordFields } from "../config/settingsConfig";
import { useChangePassword } from "@/modules/auth/hooks";
import { showSuccessAlert, showErrorAlert } from "@/components/alerts";
import * as Sentry from "@sentry/react-native";

export default function ChangePasswordScreen() {
  const router = useRouter();
  const { changePassword, isLoading } = useChangePassword();

  const handleSubmit = async (data: any) => {
    try {
      await changePassword(data.oldPassword, data.newPassword);

      showSuccessAlert({
        title: "Password Changed!",
        message: `Your password has been changed successfully.`,
        buttonText: "Continue",
        onPress: () => router.back(),
      });
    } catch (error: any) {
      Sentry.captureException(error, {
        tags: { screen: "ChangePasswordScreen", action: "changePassword" },
      });
      showErrorAlert({
        title: "Error",
        message:
          error?.errors?.[0]?.longMessage ||
          error?.message ||
          "Failed to change password.",
      });
    }
  };

  return (
    <PasswordForm
      title="Change Password"
      description="Enter your old password and set a new one"
      fields={changePasswordFields}
      schema={changePasswordSchema}
      buttonText="Update Password"
      onSubmit={handleSubmit}
      onBack={() => router.back()}
      isLoading={isLoading}
    />
  );
}
