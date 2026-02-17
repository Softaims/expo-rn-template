import { View, Image } from "react-native";
import { Stack } from "expo-router";
import { AuthTitlesSection } from "@/modules/auth/components";
import {
  OTPInput,
  Button,
  ScreenWrapper,
  HeaderBackButton,
} from "@/components";
import { useOTPVerificationScreen } from "@/modules/auth/hooks";

export default function OTPVerificationScreen() {
  const {
    otp,
    setOtp,
    isLoading,
    otpLength,
    title,
    description,
    handleVerify,
    handleResendCode,
    handleGoBack,
  } = useOTPVerificationScreen();

  return (
    <ScreenWrapper scrollEnabled containerStyles="justify-between">
      <Stack.Screen
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: "",
          headerLeft: () => <HeaderBackButton onPress={handleGoBack} />,
        }}
      />

      <View>
        <Image
          source={require("@/assets/images/email-verification-icon.png")}
          className="w-[100px] h-[100px] object-contain self-center mb-[20px] mt-[15%]"
        />
        <AuthTitlesSection title={title} description={description} />
        <OTPInput
          length={otpLength}
          otp={otp}
          setOtp={setOtp}
          numericOnly
          containerStyles="justify-center"
        />
      </View>

      <View>
        <Button
          title="Resend Code"
          variant="text"
          containerStyles="mb-3"
          onPress={handleResendCode}
          disabled={isLoading}
        />
        <Button
          title="Verify"
          variant="primary"
          size="lg"
          onPress={handleVerify}
          disabled={otp.length !== otpLength || isLoading}
        />
      </View>
    </ScreenWrapper>
  );
}
