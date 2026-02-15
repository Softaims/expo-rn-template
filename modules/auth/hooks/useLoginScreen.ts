import { useState, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import { useRoutingUtils } from "@/lib/routingUtils";
import { useLogin } from "./useClerkAuth";
import { LoginFormData } from "@/modules/auth/schemas";
import { showErrorAlert } from "@/components/alerts";
import { captureException } from "@/modules/sentry/utils/sentryUtils";

export function useLoginScreen() {
  const { push } = useRoutingUtils();
  const { signIn } = useLogin();
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(true);
  const enableBackdropDismiss = false;

  // Reset bottom sheet visibility when screen comes back into focus
  useFocusEffect(
    useCallback(() => {
      setIsBottomSheetVisible(true);
    }, []),
  );

  const handleSubmit = async (data: LoginFormData) => {
    try {
      await signIn({
        identifier: data.email,
        password: data.password,
      });
      // Login successful - Clerk will handle navigation
    } catch (error: any) {
      captureException(error);
      const errorMessage =
        error?.errors?.[0]?.longMessage ||
        error?.errors?.[0]?.message ||
        error?.message ||
        "Please try again";
      showErrorAlert({
        title: "Login Failed",
        message: errorMessage,
      });
    }
  };

  const handleNavigateToSignup = () => {
    setIsBottomSheetVisible(false);
    push("/(auth)/signup");
  };

  const handleForgotPassword = () => {
    setIsBottomSheetVisible(false);
    push("/(auth)/forgotPassword");
  };

  return {
    isBottomSheetVisible,
    setIsBottomSheetVisible,
    enableBackdropDismiss,
    handleSubmit,
    handleNavigateToSignup,
    handleForgotPassword,
  };
}
