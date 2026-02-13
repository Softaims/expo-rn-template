import { LockForgotIcon } from "@/assets/icons";
import { ScreenHeader } from "@/components";
import { showErrorAlert, showSuccessAlert } from "@/components/alerts";
import { AuthContent, AuthForm } from "@/modules/auth/components";
import { forgotPasswordFields } from "@/modules/auth/config";
import { useForgotPassword } from "@/modules/auth/hooks";
import {
  ForgotPasswordFormData,
  forgotPasswordSchema,
} from "@/modules/auth/schemas";
import type { ForgotPasswordScreenProps } from "@/modules/auth/types";
import * as Sentry from "@sentry/react-native";
import { useRouter } from "expo-router";
import { View } from "react-native";

export default function ForgotPasswordScreen({
  variant = "with-icon",
}: ForgotPasswordScreenProps) {
  const router = useRouter();
  const { sendResetCode } = useForgotPassword();

  const handleGoBack = () => {
    router.back();
  };

  const handleSubmit = async (data: ForgotPasswordFormData) => {
    try {
      await sendResetCode(data.email);
      showSuccessAlert({
        title: "Code Sent!",
        message: `A verification code has been sent to ${data.email}`,
        buttonText: "Continue",
        onPress: () => {
          router.push({
            pathname: "/(auth)/otpVerification",
            params: {
              email: data.email,
              flow: "reset-password",
            },
          });
        },
      });
    } catch (error: any) {
      Sentry.captureException(error, {
        tags: { screen: "ForgotPasswordScreen", action: "sendResetCode" },
      });
      const errorMessage =
        error?.errors?.[0]?.longMessage ||
        error?.errors?.[0]?.message ||
        error?.message ||
        "Failed to send verification code";
      showErrorAlert({
        title: "Error",
        message: errorMessage,
      });
    }
  };

  return (
    <View className="flex-1 bg-background">
      {/* Back Button */}
      <View className="mb-10">
        <ScreenHeader onBackPress={handleGoBack} />
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
            className="flex-1 justify-between"
          />
        </View>
      </View>
    </View>
  );
}
