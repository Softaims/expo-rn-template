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
import { loginSchema, LoginFormData } from "@/modules/auth/schemas";
import { loginFields } from "@/modules/auth/config";
import { useLogin } from "@/modules/auth/hooks";
import type { LoginScreenProps } from "@/modules/auth/types";
import { showErrorAlert } from "@/components/alerts";
import * as Sentry from "@sentry/react-native";

export default function LoginScreen({ variant = "default" }: LoginScreenProps) {
  const router = useRouter();
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
      Sentry.captureException(error, {
        tags: { screen: "LoginScreen", action: "login" },
      });
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
    router.push("/(auth)/signup");
  };

  const handleForgotPassword = () => {
    setIsBottomSheetVisible(false);
    router.push("/(auth)/forgotPassword");
  };

  const content = (
    <View className="flex-1">
      <View className="mb-6">
        <AuthContent
          title="Welcome Back"
          description="To access your account please enter your account details."
        />
      </View>

      <View className="mb-6">
        <AuthForm
          fields={loginFields}
          schema={loginSchema}
          buttonText="Login Account"
          showForgotPassword={true}
          onForgotPasswordPress={handleForgotPassword}
          onSubmit={handleSubmit}
        />
      </View>

      <SocialAuthButtons />

      <AuthFooter
        text="Don't have an account?"
        linkText="Create Account"
        onNavigate={handleNavigateToSignup}
      />
    </View>
  );

  if (variant === "bottom-sheet") {
    return (
      <View className="bg-background">
        <BottomSheet
          isVisible={isBottomSheetVisible}
          setIsVisible={setIsBottomSheetVisible}
          enableBackdropDismiss={enableBackdropDismiss}
          sheetContentContainerStyles="px-0 pb-0"
        >
          <ScrollView className="px-4">{content}</ScrollView>
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
