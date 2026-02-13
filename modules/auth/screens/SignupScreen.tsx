import { View, ScrollView } from "react-native";
import { useState, useCallback } from "react";
import { useFocusEffect, useRouter } from "expo-router";
import { BottomSheet } from "@/components";
import {
  AuthHeader,
  AuthContent,
  AuthForm,
  SocialAuthButtons,
  AuthFooter,
} from "@/modules/auth/components";
import { signupSchema, SignupFormData } from "@/modules/auth/schemas";
import { signupFields } from "@/modules/auth/config";
import { useRegister } from "@/modules/auth/hooks";
import type { SignupScreenProps } from "@/modules/auth/types";
import { showSuccessAlert, showErrorAlert } from "@/components/alerts";
import * as Sentry from "@sentry/react-native";

export default function SignupScreen({
  variant = "default",
}: SignupScreenProps) {
  const enableBackdropDismiss = false;

  const router = useRouter();
  const { signUp } = useRegister();
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(true);

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
        router.push({
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
      Sentry.captureException(error, {
        tags: { screen: "SignupScreen", action: "signup" },
      });
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
    router.back();
  };

  const content = (
    <View className="flex-1">
      <View className="flex-1">
        <View className="mb-6">
          <AuthContent
            title="Register Yourself"
            description="For Registration please enter the required account registration details."
          />
        </View>

        <View className="mb-6">
          <AuthForm
            fields={signupFields}
            schema={signupSchema}
            buttonText="Sign Up"
            onSubmit={handleSubmit}
          />
        </View>
        <SocialAuthButtons />
      </View>

      <AuthFooter
        text="Already have an account?"
        linkText="Login"
        onNavigate={handleNavigateToLogin}
      />
    </View>
  );

  if (variant === "bottom-sheet") {
    return (
      <View className="flex-1 bg-background">
        <BottomSheet
          isVisible={isBottomSheetVisible}
          setIsVisible={setIsBottomSheetVisible}
          enableBackdropDismiss={enableBackdropDismiss}
          sheetContentContainerStyles="px-0 pb-0"
        >
          <ScrollView className="px-4" style={{ minHeight: 550 }}>
            {content}
          </ScrollView>
        </BottomSheet>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <AuthHeader />
      <View className="flex-1 pt-7">{content}</View>
    </View>
  );
}
