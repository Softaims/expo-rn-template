import { View, Alert, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ArrowLeftIcon, ResetPasswordIcon } from "@/assets/icons";
import { AuthContent, AuthForm } from "@/modules/auth/components";
import {
  resetPasswordSchema,
  ResetPasswordFormData,
} from "@/modules/auth/schemas";
import { resetPasswordFields } from "@/modules/auth/config";
import { useResetPassword } from "@/modules/auth/hooks";
import type { ResetPasswordScreenProps } from "@/modules/auth/types";

export default function ResetPasswordScreen({ variant = "with-icon" }: ResetPasswordScreenProps) {
  const router = useRouter();
  const { code } = useLocalSearchParams<{ code: string }>();
  const { resetPassword } = useResetPassword();

  const handleGoBack = () => {
    router.replace("/(auth)/forgot-password");
  };

  const handleSubmit = async (data: ResetPasswordFormData) => {
    if (!code) {
      Alert.alert("Error", "Verification code is missing. Please try again.");
      router.replace("/(auth)/forgot-password");
      return;
    }

    try {
      await resetPassword(code, data.newPassword);
      Alert.alert(
        "Password Reset Successful",
        "Your password has been reset successfully",
        [
          {
            text: "OK",
            onPress: () => {
              router.replace("/(auth)/login");
            },
          },
        ],
      );
    } catch (error: any) {
      console.error("Reset password error:", error);
      const errorMessage = error?.errors?.[0]?.longMessage || error?.errors?.[0]?.message || error?.message || "Failed to reset password. Please check your verification code.";
      Alert.alert("Error", errorMessage);
    }
  };

  return (
    <SafeAreaView className="flex-1" style={{ paddingHorizontal: 16 }}>
      {/* Back Button */}
      <View className="mb-10">
        <Pressable onPress={handleGoBack} className="w-10 justify-center">
          <ArrowLeftIcon width={24} height={24} color="#000" />
        </Pressable>
      </View>

      <View className="flex-1">
        <View>
          {/* Conditionally render icon */}
          {variant === "with-icon" && (
            <View className="items-center mb-6">
              <ResetPasswordIcon width={152} height={120} />
            </View>
          )}

          <View className="mb-8">
            <AuthContent
              title="Reset Password"
              description="Enter your new password to access your account"
              textClassName={variant !== "default" ? "text-center" : ""}
            />
          </View>
        </View>

        <View className="flex-1">
          <AuthForm
            fields={resetPasswordFields}
            schema={resetPasswordSchema}
            buttonText="Continue"
            onSubmit={handleSubmit}
            className="flex-1 justify-between mb-3"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
