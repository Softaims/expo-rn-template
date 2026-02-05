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
import { LoginFormData } from "@/app/(auth)/schemas";

export default function LoginScreen() {
  const router = useRouter();
  const { signInWithEmail, isLoading } = useAuthClerk();

  const handleSubmit = async (data: LoginFormData) => {
    try {
      await signInWithEmail(data.email, data.password);
      // TODO: Navigate to main app after successful login
      console.log("Login successful");
    } catch (error: any) {
      Alert.alert("Login Failed", error?.message || "Please try again");
    }
  };

  const handleNavigateToSignup = () => {
    router.push("/(auth)/signup");
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

          <View className="flex-1 ">
            <AuthContent
              title="Welcome Back"
              description="To access your account please enter your account details."
            />

            <AuthForm
              type="login"
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />

            <View >
              <SocialAuthButtons type="login" />
            </View>
          </View>

          <AuthFooter
            text="Don't have an account?"
            linkText="Create Account"
            onNavigate={handleNavigateToSignup}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
