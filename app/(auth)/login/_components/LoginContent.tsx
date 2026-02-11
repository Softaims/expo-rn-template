import { View, ScrollView, Alert } from "react-native";
import { useRouter } from "expo-router";
import { BottomSheet } from "@/components";
import {
  AuthContent,
  AuthForm,
  SocialAuthButtons,
  AuthFooter,
} from "@/app/(auth)/_components";
import { loginSchema, LoginFormData } from "@/app/(auth)/_schemas";
import { loginFields } from "@/app/(auth)/_config";
import { useLogin } from "@/app/(auth)/_hooks/useClerkAuth";

type LoginVariant = "default" | "bottom-sheet";

interface LoginContentProps {
  variant?: LoginVariant;
  isVisible?: boolean;
  setIsVisible?: (visible: boolean) => void;
  enableBackdropDismiss?: boolean;
}

export default function LoginContent({
  variant = "bottom-sheet",
  isVisible = false,
  setIsVisible,
  enableBackdropDismiss = false
}: LoginContentProps) {
  const router = useRouter();
  const { signIn } = useLogin();

  const handleSubmit = async (data: LoginFormData) => {
    try {
      await signIn({
        identifier: data.email,
        password: data.password,
      });
      // Login successful - Clerk will handle navigation
    } catch (error: any) {
      console.error("Login error:", error);
      const errorMessage = error?.errors?.[0]?.longMessage || error?.errors?.[0]?.message || error?.message || "Please try again";
      Alert.alert("Login Failed", errorMessage);
    }
  };

  const handleNavigateToSignup = () => {
    // Dismiss bottom sheet before navigation
    if (setIsVisible) {
      setIsVisible(false);
    }
    setTimeout(() => {
      router.push("/(auth)/signup");
    }, 300);
  };

  const handleForgotPassword = () => {
    // Dismiss bottom sheet before navigation
    if (setIsVisible) {
      setIsVisible(false);
    }
    setTimeout(() => {
      router.push("/(auth)/forgot-password");
    }, 300);
  };

  const content = (
    <View className="flex-1">
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
      </View>

      <AuthFooter
        text="Don't have an account?"
        linkText="Create Account"
        onNavigate={handleNavigateToSignup}
      />
    </View>
  );

  if (variant === "bottom-sheet") {
    return (
      <BottomSheet
        isVisible={isVisible}
        setIsVisible={setIsVisible || (() => {})}
        enableBackdropDismiss={enableBackdropDismiss}
        sheetContentContainerStyles="px-0 pb-0"
      >
        <ScrollView className="px-4">{content}</ScrollView>
      </BottomSheet>
    );
  }

  return content;
}
