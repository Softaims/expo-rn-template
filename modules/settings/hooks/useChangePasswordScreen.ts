import { useRoutingUtils } from "@/lib/routingUtils";
import { useChangePassword } from "@/modules/auth/hooks";
import { showSuccessAlert, showErrorAlert } from "@/components/alerts";

export function useChangePasswordScreen() {
  const { back } = useRoutingUtils();
  const { changePassword, isLoading } = useChangePassword();

  const handleSubmit = async (data: any) => {
    const { error } = await changePassword(data.oldPassword, data.newPassword);

    if (error) {
      showErrorAlert({ title: "Error", message: error });
      return;
    }

    showSuccessAlert({
      title: "Password Changed!",
      message: "Your password has been changed successfully.",
      buttonText: "Continue",
      onPress: () => back(),
    });
  };

  const handleGoBack = () => back();

  return {
    handleSubmit,
    handleGoBack,
    isLoading,
  };
}
