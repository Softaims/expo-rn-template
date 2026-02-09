import { View } from "react-native";
import { ResetPasswordIcon } from "@/assets/icons";
import { AuthContent, AuthForm } from "@/app/(auth)/_components";
import {
  resetPasswordSchema,
  ResetPasswordFormData,
} from "@/app/(auth)/_schemas";
import { resetPasswordFields } from "@/app/(auth)/_config";

type ResetPasswordVariant = "default" | "with-icon";

interface ResetPasswordContentProps {
  variant: ResetPasswordVariant;
  onSubmit: (data: ResetPasswordFormData) => void;
}

export default function ResetPasswordContent({
  variant,
  onSubmit,
}: ResetPasswordContentProps) {
  return (
    <View className="flex-1">
      <View>
        {/* Conditionally render icon */}
        {variant === "with-icon" && (
          <View className="items-center mb-6">
            <ResetPasswordIcon width={152} height={120} />
          </View>
        )}

        <View className="mb-8">
          <AuthContent
            title="Reset Password"
            description="Enter your new password to access your account"
            textClassName={variant !== "default" ? "text-center" : ""}
          />
        </View>
      </View>

      <View className="flex-1">
        <AuthForm
          fields={resetPasswordFields}
          schema={resetPasswordSchema}
          buttonText="Continue"
          onSubmit={onSubmit}
          className="flex-1 justify-between mb-3"
        />
      </View>
    </View>
  );
}
