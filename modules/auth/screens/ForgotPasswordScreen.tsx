import { View, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ArrowLeftIcon, LockForgotIcon } from "@/assets/icons";
import { AuthContent, AuthForm } from "@/modules/auth/components";
import {
  forgotPasswordSchema,
  ForgotPasswordFormData,
} from "@/modules/auth/schemas";
import { forgotPasswordFields } from "@/modules/auth/config";
import { useForgotPassword } from "@/modules/auth/hooks";
import type { ForgotPasswordScreenProps } from "@/modules/auth/types";

export default function ForgotPasswordScreen({ variant = "default" }: ForgotPasswordScreenProps) {
  const router = useRouter();
  const { sendResetCode } = useForgotPassword();

  const handleGoBack = () => {
    router.back();
  };

  const handleSubmit = async (data: ForgotPasswordFormData) => {
    try {
      await sendResetCode(data.email);
      Alert.alert(
        "Verification Code Sent",
        `A verification code has been sent to ${data.email}`,
        [
          {
            text: "OK",
            onPress: () => {
              router.push({
                pathname: "/(auth)/otp-verification",
                params: {
                  email: data.email,
                  flow: "reset-password"
                },
              });
            },
          },
        ],
      );
    } catch (error: any) {
      console.error("Forgot password error:", error);
      const errorMessage = error?.errors?.[0]?.longMessage || error?.errors?.[0]?.message || error?.message || "Failed to send verification code";
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
              <LockForgotIcon width={112} height={114} />
            </View>
          )}

          <View className="mb-8">
            <AuthContent
              title="Forgot Password?"
              description="Enter the email address on which we can send you verification OTP"
              textClassName={variant !== "default" ? "text-center" : ""}
            />
          </View>
        </View>

        <View className="flex-1">
          <AuthForm
            fields={forgotPasswordFields}
            schema={forgotPasswordSchema}
            buttonText="Send Verification Code"
            onSubmit={handleSubmit}
            className="flex-1 justify-between mb-3"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
