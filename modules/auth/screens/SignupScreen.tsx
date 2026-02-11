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
import { signupSchema, SignupFormData } from "@/modules/auth/schemas";
import { signupFields } from "@/modules/auth/config";
import { useRegister } from "@/modules/auth/hooks";
import type { SignupScreenProps } from "@/modules/auth/types";

export default function SignupScreen({ variant = "bottom-sheet" }: SignupScreenProps) {
  const router = useRouter();
  const { signUp } = useRegister();
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(true);
  const enableBackdropDismiss = false;

  // Reset bottom sheet visibility when screen comes back into focus
  useFocusEffect(
    useCallback(() => {
      setIsBottomSheetVisible(true);
    }, [])
  );

  const handleSubmit = async (data: SignupFormData) => {
    try {
      const result = await signUp({
        emailAddress: data.email,
        password: data.password,
      });

      // Check if email verification is required
      if (result.status === 'missing_requirements') {
        // Dismiss bottom sheet before navigation
        if (setIsBottomSheetVisible) {
          setIsBottomSheetVisible(false);
        }
        // Small delay to allow bottom sheet animation to complete
        setTimeout(() => {
          router.push({
            pathname: "/(auth)/otp-verification",
            params: { email: data.email, flow: "signup" },
          });
        }, 300);
      } else if (result.status === 'complete') {
        // User signed up and logged in successfully (no verification needed)
        Alert.alert("Success", "Account created successfully!");
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      const errorMessage = error?.errors?.[0]?.longMessage || error?.errors?.[0]?.message || error?.message || "Please try again";
      Alert.alert("Signup Failed", errorMessage);
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

        <AuthForm
          fields={signupFields}
          schema={signupSchema}
          buttonText="Sign Up"
          onSubmit={handleSubmit}
        />

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
      <SafeAreaView className="flex-1 bg-background">
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          style={{ paddingHorizontal: 16 }}
        >
          <View className="flex-1 pt-7">
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
        </ScrollView>
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
        <View className="flex-1 pt-7">
          {content}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
