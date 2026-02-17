import PasswordForm from "@/modules/commons/PasswordForm";
import { changePasswordSchema } from "../schemas/settingsSchemas";
import { changePasswordFields } from "../config/settingsConfig";
import { useChangePasswordScreen } from "../hooks/useChangePasswordScreen";
import { ScreenWrapper } from "@/components";

export default function ChangePasswordScreen() {
  const { handleSubmit, handleGoBack, isLoading } = useChangePasswordScreen();

  return (
    <ScreenWrapper scrollEnabled headerTransparent>
      <PasswordForm
        title="Change Password"
        description="Enter your old password and set a new one"
        fields={changePasswordFields}
        schema={changePasswordSchema}
        buttonText="Update Password"
        onSubmit={handleSubmit}
        onBack={handleGoBack}
        isLoading={isLoading}
      />
    </ScreenWrapper>
  );
}
