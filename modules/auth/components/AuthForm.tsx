import { View, Pressable } from "react-native";
import { useForm, Controller, FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInput, Button, Text } from "@/components";
import { cn } from "@/lib/utils";

import type { AuthFormProps, FieldConfig } from "@/modules/auth/types";

export default function AuthForm({
  fields,
  schema,
  buttonText,
  showForgotPassword = false,
  onForgotPasswordPress,
  onSubmit,
  isLoading,
  className,
}: AuthFormProps) {
  const defaultValues = fields.reduce(
    (acc, field) => {
      acc[field.name] = "";
      return acc;
    },
    {} as Record<string, string>,
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema as any),
    defaultValues,
  });

  const renderField = (field: FieldConfig) => {
    const error = errors[field.name] as FieldError | undefined;

    return (
      <View key={field.name}>
        <Controller
          control={control}
          name={field.name}
          render={({ field: { onChange, value } }) => (
            <TextInput
              type={field.type}
              label={field.label}
              placeholder={field.placeholder}
              value={value as string}
              onChangeText={onChange}
              borderActiveColor={error ? "border-destructive" : undefined}
              errorMessage={error ? error.message : undefined}
              editable={!isLoading}
            />
          )}
        />
      </View>
    );
  };

  return (
    <View className={cn("", className)}>
      <View className="gap-4">
        {fields.map((field) => renderField(field))}

        {showForgotPassword && (
          <Pressable className="self-end" onPress={onForgotPasswordPress}>
            <Text
              variant="bodyText2"
              className="text-foreground font-medium underline"
            >
              Forgot Password?
            </Text>
          </Pressable>
        )}
      </View>

      <Button
        variant="primary"
        size="lg"
        title={buttonText}
        onPress={handleSubmit(onSubmit)}
        disabled={isLoading}
        containerStyles="mt-10"
      />
    </View>
  );
}
