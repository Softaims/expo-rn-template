import { View, Alert, Pressable } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon, EmailVerificationIcon } from "@/assets/icons";
import { AuthContent } from "@/modules/auth/components";
import { OTPInput, Button, Text } from "@/components";
import { useVerifyEmail, useRegister, useForgotPassword } from "@/modules/auth/hooks";
import type { OTPVerificationScreenProps } from "@/modules/auth/types";

export default function OTPVerificationScreen({ variant = "default" }: OTPVerificationScreenProps) {
  const router = useRouter();
  const params = useLocalSearchParams();
  const email = (params.email as string);
  const flow = (params.flow as string) || "signup";

  const { verifyEmail } = useVerifyEmail();
  const { resendCode } = useRegister();
  const { sendResetCode } = useForgotPassword();

  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async () => {
    if (otp.length !== 6) {
      Alert.alert("Error", "Please enter a valid 6-digit code");
      return;
    }

    setIsLoading(true);
    try {
      if (flow === "signup") {
        // Verify email for signup
        await verifyEmail(otp);

        Alert.alert("Success", "Email verified successfully", [
          {
            text: "OK",
            onPress: () => {
              router.replace("/(auth)/login");
            },
          },
        ]);
      } else if (flow === "reset-password") {
        // For password reset, just pass the code to reset-password screen
        router.replace({
          pathname: "/(auth)/reset-password",
          params: { code: otp, email },
        });
      }
    } catch (error: any) {
      console.error("OTP verification error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    try {
      if (flow === "signup") {
        await resendCode();
      } else if (flow === "reset-password") {
        await sendResetCode(email);
      }
      Alert.alert("Success", "Verification code has been resent to your email");
      setOtp("");
    } catch (error: any) {
      console.error("Resend code error:", error);
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  const title = flow === "signup" ? "Email Verification" : "Verify Reset Code";
  const description =
    flow === "signup"
      ? `Enter the OTP that we have sent you on your given email ${email}`
      : `Enter the verification code that we have sent to ${email} to reset your password`;

  const otpLength = 6;

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
              <EmailVerificationIcon width={90} height={92} />
            </View>
          )}

          <View className="mb-8">
            <AuthContent
              title={title}
              description={description}
              textClassName={variant !== "default" ? "text-center" : ""}
            />
          </View>
        </View>

        <View className="flex-1">
          <View className="flex-1 justify-between mb-3">
            {/* OTP Input */}
            <View>
              <OTPInput
                length={otpLength}
                otp={otp}
                setOtp={setOtp}
                numericOnly
                containerStyles="justify-center"
              />
            </View>

            {/* Bottom Section */}
            <View>
              {/* Resend Code */}
              <View className="items-center mb-6">
                <Pressable onPress={handleResendCode} disabled={isLoading}>
                  <Text variant="bodyText1" className="text-foreground font-semibold">
                    Resend Code
                  </Text>
                </Pressable>
              </View>

              {/* Verify Button */}
              <Button
                title="Verify"
                variant="primary"
                size="lg"
                onPress={handleVerify}
                disabled={otp.length !== otpLength || isLoading}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
