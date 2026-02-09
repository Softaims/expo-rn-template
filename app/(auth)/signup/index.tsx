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
import { signupSchema, SignupFormData } from "@/app/(auth)/_schemas";
import { signupFields } from "@/app/(auth)/_config";

export default function SignupScreen() {
  const router = useRouter();
  const { signUpWithEmail } = useClerkAuth();

  const handleSubmit = async (data: SignupFormData) => {
    try {
      await signUpWithEmail(data.email, data.password);
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
            <View className="mb-6">
              <AuthContent
                title="Register Yourself"
                description="For Registration please enter the required account registration details."
              />
            </View>

            <AuthForm
              fields={signupFields}
              schema={signupSchema}
              buttonText="Sign Up"
              onSubmit={handleSubmit}
            />

            <SocialAuthButtons />
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
