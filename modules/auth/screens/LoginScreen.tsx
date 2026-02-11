import { View, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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

export default function LoginScreen({
  variant = "bottom-sheet",
}: LoginScreenProps) {
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
      console.error("Login error:", error);
      const errorMessage =
        error?.errors?.[0]?.longMessage ||
        error?.errors?.[0]?.message ||
        error?.message ||
        "Please try again";
      Alert.alert("Login Failed", errorMessage);
    }
  };

  const handleNavigateToSignup = () => {
    setIsBottomSheetVisible(false);
    router.push("/(auth)/signup");
  };

  const handleForgotPassword = () => {
    setIsBottomSheetVisible(false);
    router.push("/(auth)/forgot-password");
  };

  const content = (
    <View className="flex-1">
      <View className="mb-6">
        <AuthContent
          title="Welcome Back"
          description="To access your account please enter your account details."
        />
      </View>

      <AuthForm
        fields={loginFields}
        schema={loginSchema}
        buttonText="Login Account"
        showForgotPassword={true}
        onForgotPasswordPress={handleForgotPassword}
        onSubmit={handleSubmit}
      />

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
      <SafeAreaView className="flex-1 bg-background">
        <BottomSheet
          isVisible={isBottomSheetVisible}
          setIsVisible={setIsBottomSheetVisible}
          enableBackdropDismiss={enableBackdropDismiss}
          sheetContentContainerStyles="px-0 pb-0"
        >
          <ScrollView className="px-4">{content}</ScrollView>
        </BottomSheet>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 16 }}
      >
        <AuthHeader />
        <View className="flex-1 pt-7">{content}</View>
      </ScrollView>
    </SafeAreaView>
  );
}
