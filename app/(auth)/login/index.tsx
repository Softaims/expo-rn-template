import { View, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  AuthHeader,
  AuthContent,
  AuthForm,
  SocialAuthButtons,
  AuthFooter,
} from "@/app/(auth)/_components";
import { useClerkAuth } from "@/app/(auth)/_hooks/useClerkAuth";
import { loginSchema, LoginFormData } from "@/app/(auth)/_schemas";
import { loginFields } from "@/app/(auth)/_config";

export default function LoginScreen() {
  const router = useRouter();
  const { signInWithEmail } = useClerkAuth();

  const handleSubmit = async (data: LoginFormData) => {
    try {
      await signInWithEmail(data.email, data.password);
    } catch (error: any) {
      Alert.alert("Login Failed", error?.message || "Please try again");
    }
  };

  const handleNavigateToSignup = () => {
    router.push("/(auth)/signup");
  };

  const handleForgotPassword = () => {
    router.push("/(auth)/forgot-password");
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
            <View className="mb-6">
              <AuthContent
                title="Welcome Back"
                description="To access your account please enter your account details."
              />
            </View>

            <AuthForm
              fields={loginFields}
              schema={loginSchema}
              buttonText="Login"
              showForgotPassword={true}
              onForgotPasswordPress={handleForgotPassword}
              onSubmit={handleSubmit}
            />

            <SocialAuthButtons />
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
