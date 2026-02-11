import { View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ArrowLeftIcon } from "@/assets/icons";
import { ForgotPasswordContent } from "./_components";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const variant = "default";

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
      <ForgotPasswordContent variant={variant} />
    </SafeAreaView>
  );
}
