import { View, Alert, Pressable } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ArrowLeftIcon } from "@/assets/icons";
import { ResetPasswordContent } from "./_components";
import { useClerkAuth } from "@/app/(auth)/_hooks/useClerkAuth";
import { ResetPasswordFormData } from "@/app/(auth)/_schemas";

export default function ResetPasswordScreen() {
  const router = useRouter();
  const { code } = useLocalSearchParams<{ code: string }>();
  const { resetPassword } = useClerkAuth();

  const handleSubmit = async (data: ResetPasswordFormData) => {
    // TODO: Get verification code from OTP screen
    // For now, use a placeholder or the code from params
    const verificationCode = code || "temp-code";

    try {
      await resetPassword(verificationCode, data.newPassword);
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
      Alert.alert("Error", error?.message || "Please try again");
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <View className="flex-1" style={{ paddingHorizontal: 16 }}>
      {/* Back Button */}
      <View className="mb-10">
        <Pressable onPress={handleGoBack} className="w-10 justify-center">
          <ArrowLeftIcon width={24} height={24} color="#000" />
        </Pressable>
      </View>
      <ResetPasswordContent variant="with-icon" onSubmit={handleSubmit} />
    </View>
  );
}
