import { useState, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import { useRoutingUtils } from "@/lib/routingUtils";
import { useLogin } from "./useClerkAuth";
import { LoginFormData } from "@/modules/auth/schemas";
import { showErrorAlert } from "@/components/alerts";

export function useLoginScreen() {
  const { push } = useRoutingUtils();
  const { signIn } = useLogin();
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const enableBackdropDismiss = false;

  // Reset bottom sheet visibility when screen comes back into focus
  useFocusEffect(
    useCallback(() => {
      setIsBottomSheetVisible(true);
    }, []),
  );

  const handleSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    const { error } = await signIn({
      identifier: data.email,
      password: data.password,
    });
    setIsLoading(false);

    if (error) {
      showErrorAlert(error);
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
    isLoading,
  };
}
