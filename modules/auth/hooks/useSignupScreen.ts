import { useState, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import { useRoutingUtils } from "@/lib/routingUtils";
import { useRegister } from "./useClerkAuth";
import { SignupFormData } from "@/modules/auth/schemas";
import { showSuccessAlert, showErrorAlert } from "@/components/alerts";

export function useSignupScreen() {
  const { push, back } = useRoutingUtils();
  const { signUp } = useRegister();
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const enableBackdropDismiss = false;

  // Reset bottom sheet visibility when screen comes back into focus
  useFocusEffect(
    useCallback(() => {
      setIsBottomSheetVisible(true);
    }, []),
  );

  const handleSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    const { data: result, error } = await signUp({
      emailAddress: data.email,
      password: data.password,
    });
    setIsLoading(false);

    if (error) {
      showErrorAlert(error);
      return;
    }

    if (result?.status === "missing_requirements") {
      setIsBottomSheetVisible(false);
      push({
        pathname: "/(auth)/otpVerification",
        params: { email: data.email, flow: "signup" },
      });
    } else if (result?.status === "complete") {
      showSuccessAlert({
        title: "Account Created!",
        message:
          "Your account has been created successfully. You can now login to your account",
        buttonText: "Login Now",
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
    isLoading,
  };
}
