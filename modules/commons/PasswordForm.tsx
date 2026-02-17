import { AuthForm } from "@/modules/auth/components";
import { HeaderBackButton, ScreenWrapper } from "@/components";
import { Stack } from "expo-router";
import type { PasswordFormProps } from "./types";

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
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: title,
          headerLeft: () => <HeaderBackButton onPress={onBack} />,
        }}
      />
      <AuthForm
        fields={fields}
        schema={schema}
        buttonText={buttonText}
        onSubmit={onSubmit}
        isLoading={isLoading}
        className="flex-1 justify-between"
      />
    </>
  );
}
