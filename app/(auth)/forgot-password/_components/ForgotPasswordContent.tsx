import { View, Alert } from "react-native";
import { useRouter } from "expo-router";
import { LockForgotIcon } from "@/assets/icons";
import { AuthContent, AuthForm } from "@/app/(auth)/_components/index";
import {
  forgotPasswordSchema,
  ForgotPasswordFormData,
} from "@/app/(auth)/_schemas";
import { forgotPasswordFields } from "@/app/(auth)/_config";
import { useForgotPassword } from "@/app/(auth)/_hooks";

type ForgotPasswordVariant = "default" | "with-icon";

interface ForgotPasswordContentProps {
  variant?: ForgotPasswordVariant;
}

export default function ForgotPasswordContent({ variant = "default" }: ForgotPasswordContentProps) {
  const router = useRouter();
  const { sendResetCode } = useForgotPassword();

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
  );
}
