import { View, ScrollView, Alert } from "react-native";
import { useRouter } from "expo-router";
import { BottomSheet } from "@/components/bottomSheets";
import {
  AuthContent,
  AuthForm,
  SocialAuthButtons,
  AuthFooter,
} from "@/app/(auth)/_components/index";
import { signupSchema, SignupFormData } from "@/app/(auth)/_schemas";
import { signupFields } from "@/app/(auth)/_config";
import { useRegister } from "@/app/(auth)/_hooks";

type SignupVariant = "default" | "bottom-sheet";

interface SignupContentProps {
  variant?: SignupVariant;
  isVisible?: boolean;
  setIsVisible?: (visible: boolean) => void;
  enableBackdropDismiss?: boolean;
}

export default function SignupContent({
  variant = "bottom-sheet",
  isVisible = false,
  setIsVisible,
  enableBackdropDismiss = false
}: SignupContentProps) {
  const router = useRouter();
  const { signUp } = useRegister();

  const handleSubmit = async (data: SignupFormData) => {
    try {
      const result = await signUp({
        emailAddress: data.email,
        password: data.password,
      });

      // Check if email verification is required
      if (result.status === 'missing_requirements') {
        // Dismiss bottom sheet before navigation
        if (setIsVisible) {
          setIsVisible(false);
        }
        // Small delay to allow bottom sheet animation to complete
        setTimeout(() => {
          router.push({
            pathname: "/(auth)/otp-verification",
            params: { email: data.email, flow: "signup" },
          });
        }, 300);
      } else if (result.status === 'complete') {
        // User signed up and logged in successfully (no verification needed)
        Alert.alert("Success", "Account created successfully!");
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      const errorMessage = error?.errors?.[0]?.longMessage || error?.errors?.[0]?.message || error?.message || "Please try again";
      Alert.alert("Signup Failed", errorMessage);
    }
  };

  const handleNavigateToLogin = () => {
    router.back();
  };

  const content = (
    <View className="flex-1">
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
  );

  if (variant === "bottom-sheet") {
    return (
      <BottomSheet
        isVisible={isVisible}
        setIsVisible={setIsVisible || (() => {})}
        enableBackdropDismiss={enableBackdropDismiss}
        sheetContentContainerStyles="px-0 pb-0"
      >
        <ScrollView className="px-4" style={{ minHeight: 550 }}>
          {content}
        </ScrollView>
      </BottomSheet>
    );
  }

  return content;
}
