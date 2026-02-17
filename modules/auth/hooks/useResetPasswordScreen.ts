import { useResetPassword } from "./useClerkAuth";
import { ResetPasswordFormData } from "@/modules/auth/schemas";
import { showSuccessAlert, showErrorAlert } from "@/components/alerts";
import { useRoutingUtils } from "@/lib/routingUtils";
import { useState } from "react";

export function useResetPasswordScreen() {
  const { back, dismissAll } = useRoutingUtils();
  const { resetPassword } = useResetPassword();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: ResetPasswordFormData) => {
    setIsSubmitting(true);
    const { error } = await resetPassword(data.newPassword);
    setIsSubmitting(false);

    if (error) {
      showErrorAlert(error);
      return;
    }

    showSuccessAlert({
      title: "Password Updated!",
      message: "You can now login.",
      buttonText: "Login Now",
    });
    dismissAll();
  };

  const handleGoBack = () => {
    back();
  };

  return {
    handleSubmit,
    handleGoBack,
    isLoading: isSubmitting,
  };
}
