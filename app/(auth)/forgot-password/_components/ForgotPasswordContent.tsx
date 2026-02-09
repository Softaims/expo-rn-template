import { View } from "react-native";
import { LockForgotIcon } from "@/assets/icons";
import { AuthContent, AuthForm } from "@/app/(auth)/_components";
import {
  forgotPasswordSchema,
  ForgotPasswordFormData,
} from "@/app/(auth)/_schemas";
import { forgotPasswordFields } from "@/app/(auth)/_config";

type ForgotPasswordVariant = "default" | "with-icon";

interface ForgotPasswordContentProps {
  variant: ForgotPasswordVariant;
  onSubmit: (data: ForgotPasswordFormData) => void;
}

export default function ForgotPasswordContent({
  variant,
  onSubmit,
}: ForgotPasswordContentProps) {
  return (
    <View className="flex-1">
      <View>
        {/* Conditionally render icon */}
        {variant === "with-icon" && (
          <View className="items-center mb-6">
            <LockForgotIcon width={112} height={114} />
          </View>
        )}

        <View className="mb-8">
          <AuthContent
            title="Forgot Password?"
            description="Enter the email address on which we can send you verification OTP"
            textClassName={variant !== "default" ? "text-center" : ""}
          />
        </View>
      </View>

      <View className="flex-1">
        <AuthForm
          fields={forgotPasswordFields}
          schema={forgotPasswordSchema}
          buttonText="Send Verification Code"
          onSubmit={onSubmit}
          className="flex-1 justify-between mb-3"
        />
      </View>
    </View>
  );
}
