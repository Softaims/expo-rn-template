import { View, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  AuthHeader,
  AuthContent,
  AuthForm,
  SocialAuthButtons,
  AuthFooter,
} from "@/app/(auth)/components";
import { useAuthClerk } from "@/app/(auth)/hooks";
import { SignupFormData } from "@/app/(auth)/schemas";

export default function SignupScreen() {
  const router = useRouter();
  const { signUpWithEmail, isLoading } = useAuthClerk();

  const handleSubmit = async (data: SignupFormData) => {
    try {
      await signUpWithEmail(data.email, data.password);
      // TODO: Navigate to main app or verification screen after successful signup
      console.log("Signup successful");
    } catch (error: any) {
      Alert.alert("Signup Failed", error?.message || "Please try again");
    }
  };

  const handleNavigateToLogin = () => {
    router.push("/(auth)/login");
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 16 }}
      >
        <AuthHeader />
        <View className="flex-1 pt-7">
          <View className="flex-1">
            <AuthContent
              title="Register Yourself"
              description="For Registration please enter the required account registration details."
            />

            <AuthForm
              type="signup"
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />

            <SocialAuthButtons type="signup" />
          </View>

          <AuthFooter
            text="Already have an account?"
            linkText="Login"
            onNavigate={handleNavigateToLogin}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
