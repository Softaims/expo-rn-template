import { useState, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import { useRoutingUtils } from "@/lib/routingUtils";
import { useRegister } from "./useClerkAuth";
import { SignupFormData } from "@/modules/auth/schemas";
import { showSuccessAlert, showErrorAlert } from "@/components/alerts";
import { captureException } from "@/modules/sentry/utils/sentryUtils";

export function useSignupScreen() {
  const { push, back } = useRoutingUtils();
  const { signUp } = useRegister();
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(true);
  const enableBackdropDismiss = false;

  // Reset bottom sheet visibility when screen comes back into focus
  useFocusEffect(
    useCallback(() => {
      setIsBottomSheetVisible(true);
    }, []),
  );

  const handleSubmit = async (data: SignupFormData) => {
    try {
      const result = await signUp({
        emailAddress: data.email,
        password: data.password,
      });

      // Check if email verification is required
      if (result.status === "missing_requirements") {
        setIsBottomSheetVisible(false);
        push({
          pathname: "/(auth)/otp-verification",
          params: { email: data.email, flow: "signup" },
        });
      } else if (result.status === "complete") {
        showSuccessAlert({
          title: "Account Created!",
          message:
            "Your account has been created successfully. You can now login to your account",
          buttonText: "Login Now",
        });
      }
    } catch (error: any) {
      captureException(error);
      const errorMessage =
        error?.errors?.[0]?.longMessage ||
        error?.errors?.[0]?.message ||
        error?.message ||
        "Failed to create account. Please try again.";
      showErrorAlert({
        title: "Signup Failed",
        message: errorMessage,
      });
    }
  };

  const handleNavigateToLogin = () => {
    back();
  };

  return {
    isBottomSheetVisible,
    setIsBottomSheetVisible,
    enableBackdropDismiss,
    handleSubmit,
    handleNavigateToLogin,
  };
}
