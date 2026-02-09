import { View, ScrollView, Alert, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ArrowLeftIcon } from "@/assets/icons";
import { ForgotPasswordContent } from "./_components";
import { useClerkAuth } from "@/app/(auth)/_hooks/useClerkAuth";
import { ForgotPasswordFormData } from "@/app/(auth)/_schemas";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const { sendPasswordResetEmail } = useClerkAuth();

  const handleSubmit = async (data: ForgotPasswordFormData) => {
    try {
      await sendPasswordResetEmail(data.email);
      Alert.alert(
        "Verification Code Sent",
        `A verification code has been sent to ${data.email}`,
        [
          {
            text: "OK",
            onPress: () => {
              router.replace("/(auth)/reset-password");
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
      <ForgotPasswordContent variant="default" onSubmit={handleSubmit} />
    </View>
  );
}
