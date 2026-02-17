import { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { useVerifyEmail, useRegister, useForgotPassword } from "./useClerkAuth";
import { showSuccessAlert, showErrorAlert } from "@/components/alerts";
import { AUTH_VALIDATION_ERRORS } from "@/modules/auth/config";
import { useRoutingUtils } from "@/lib/routingUtils";

export function useOTPVerificationScreen() {
  const { replace, back } = useRoutingUtils();
  const [isLoading, setIsLoading] = useState(false);

  const params = useLocalSearchParams();
  const email = params.email as string;
  const flow = (params.flow as string) || "signup";

  const { verifyEmail } = useVerifyEmail();
  const { resendCode } = useRegister();
  const { sendResetCode, verifyResetCode } = useForgotPassword();

  const [otp, setOtp] = useState("");

  const otpLength = 6;

  const title = flow === "signup" ? "Email Verification" : "Verify Reset Code";
  const description =
    flow === "signup"
      ? `Enter the OTP that we have sent you on your given email ${email}`
      : `Enter the verification code that we have sent to ${email} to reset your password`;

  const handleVerify = async () => {
    if (otp.length !== otpLength) {
      showErrorAlert(AUTH_VALIDATION_ERRORS.otp_too_short);
      return;
    }

    setIsLoading(true);

    if (flow === "signup") {
      const { error } = await verifyEmail(otp);
      setIsLoading(false);

      if (error) {
        showErrorAlert(error);
        return;
      }

      showSuccessAlert({
        title: "Email Verified!",
        message:
          "Your email has been verified successfully. You can now login to your account",
        buttonText: "Login Now",
        onPress: () => replace("/(auth)/login"),
      });
    } else if (flow === "reset-password") {
      const { error } = await verifyResetCode(otp);
      setIsLoading(false);

      if (error) {
        showErrorAlert(error);
        return;
      }

      replace({
        pathname: "/(auth)/resetPassword",
        params: { email },
      });
    } else {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (flow === "signup") {
      await resendCode();
      showSuccessAlert({
        title: "Code Resent!",
        message: "Verification code has been resent to your email",
        buttonText: "OK",
      });
      setOtp("");
    } else if (flow === "reset-password") {
      const { error } = await sendResetCode(email);

      if (error) {
        showErrorAlert(error);
        return;
      }

      showSuccessAlert({
        title: "Code Resent!",
        message: "Verification code has been resent to your email",
        buttonText: "OK",
      });
      setOtp("");
    }
  };

  const handleGoBack = () => {
    back();
  };

  return {
    otp,
    setOtp,
    isLoading,
    otpLength,
    title,
    description,
    handleVerify,
    handleResendCode,
    handleGoBack,
  };
}
