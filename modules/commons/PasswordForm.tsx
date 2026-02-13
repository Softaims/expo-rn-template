import { View, Pressable } from "react-native";
import { ArrowLeftIcon, ResetPasswordIcon } from "@/assets/icons";
import { AuthContent, AuthForm } from "@/modules/auth/components";
import type { FieldConfig } from "@/modules/auth/types";
import type { ZodType } from "zod";
import { ScreenHeader } from "@/components";

interface PasswordFormProps {
  title: string;
  description: string;
  fields: FieldConfig[];
  schema: ZodType<any>;
  buttonText: string;
  onSubmit: (data: any) => Promise<void>;
  onBack: () => void;
  showIcon?: boolean;
  isLoading?: boolean;
}

export default function PasswordForm({
  title,
  description,
  fields,
  schema,
  buttonText,
  onSubmit,
  onBack,
  showIcon = false,
  isLoading,
}: PasswordFormProps) {
  return (
    <View className="flex-1 bg-background">
      {/* Back Button */}
      <ScreenHeader title={title} onBackPress={onBack}/>

      <View className="flex-1">
        <View>
          {showIcon && (
            <View className="items-center mb-6">
              <ResetPasswordIcon width={152} height={120} />
            </View>
          )}

          <View className="mb-8">
            <AuthContent
              title={title}
              description={description}
              textClassName={showIcon ? "text-center" : ""}
            />
          </View>
        </View>

        <View className="flex-1">
          <AuthForm
            fields={fields}
            schema={schema}
            buttonText={buttonText}
            onSubmit={onSubmit}
            isLoading={isLoading}
            className="flex-1 justify-between"
          />
        </View>
      </View>
    </View>
  );
}
