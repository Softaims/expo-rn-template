import { useForgotPassword } from "./useClerkAuth";
import { ForgotPasswordFormData } from "@/modules/auth/schemas";
import { showErrorAlert } from "@/components/alerts";
import { useState } from "react";
import { useRoutingUtils } from "@/lib/routingUtils";

export function useForgotPasswordScreen() {
  const { push, back } = useRoutingUtils();
  const { sendResetCode } = useForgotPassword();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    try {
      const { error } = await sendResetCode(data.email);

      if (error) {
        showErrorAlert(error);
        return;
      }

      push({
        pathname: "/(auth)/otpVerification",
        params: {
          email: data.email,
          flow: "reset-password",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    back();
  };

  return {
    handleSubmit,
    handleGoBack,
    isLoading,
  };
}
