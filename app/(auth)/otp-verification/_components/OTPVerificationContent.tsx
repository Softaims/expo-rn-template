import { View, Pressable } from "react-native";
import { EmailVerificationIcon } from "@/assets/icons";
import { AuthContent } from "@/app/(auth)/_components";
import { OTPInput } from "@/components/inputs/OTPInput";
import { Button, Text } from "@/components";

type OTPVerificationVariant = "default" | "with-icon";
type OTPVerificationFlow = "signup" | "reset-password";

interface OTPVerificationContentProps {
  variant: OTPVerificationVariant;
  email: string;
  otp: string;
  setOtp: (otp: string) => void;
  onVerify: () => void;
  onResendCode: () => void;
  isLoading?: boolean;
  flow?: OTPVerificationFlow;
}

export default function OTPVerificationContent({
  variant,
  email,
  otp,
  setOtp,
  onVerify,
  onResendCode,
  isLoading = false,
  flow = "signup",
}: OTPVerificationContentProps) {

  const title = flow === "signup" ? "Email Verification" : "Verify Reset Code";
  const description =
    flow === "signup"
      ? `Enter the OTP that we have sent you on your given email ${email}`
      : `Enter the verification code that we have sent to ${email} to reset your password`;

  const otpLength = 6; // Assuming OTP is always 6 digits

  return (
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
              <Pressable onPress={onResendCode} disabled={isLoading}>
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
              onPress={onVerify}
              disabled={otp.length !== otpLength || isLoading}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
