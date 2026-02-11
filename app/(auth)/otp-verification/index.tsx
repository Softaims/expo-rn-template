import { View, Alert, Pressable } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ArrowLeftIcon } from "@/assets/icons";
import { OTPVerificationContent } from "./_components/index";
import { SafeAreaView } from "react-native-safe-area-context";
import { useVerifyEmail, useRegister, useForgotPassword } from "@/app/(auth)/_hooks";

export default function OTPVerificationScreen() {
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

  return (
    <SafeAreaView className="flex-1" style={{ paddingHorizontal: 16 }}>
      {/* Back Button */}
      <View className="mb-10">
        <Pressable onPress={handleGoBack} className="w-10 justify-center">
          <ArrowLeftIcon width={24} height={24} color="#000" />
        </Pressable>
      </View>

      <OTPVerificationContent
        variant="default"
        email={email}
        otp={otp}
        setOtp={setOtp}
        onVerify={handleVerify}
        onResendCode={handleResendCode}
        isLoading={isLoading}
        flow={flow as "signup" | "reset-password"}
      />
    </SafeAreaView>
  );
}
