import { View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ArrowLeftIcon } from "@/assets/icons";
import { ResetPasswordContent } from "./_components/index";

export default function ResetPasswordScreen() {
  const router = useRouter();
  const variant = "with-icon";

  const handleGoBack = () => {
    router.replace("/(auth)/forgot-password");
  };

  return (
    <SafeAreaView className="flex-1" style={{ paddingHorizontal: 16 }}>
      {/* Back Button */}
      <View className="mb-10">
        <Pressable onPress={handleGoBack} className="w-10 justify-center">
          <ArrowLeftIcon width={24} height={24} color="#000" />
        </Pressable>
      </View>
      <ResetPasswordContent variant={variant} />
    </SafeAreaView>
  );
}
