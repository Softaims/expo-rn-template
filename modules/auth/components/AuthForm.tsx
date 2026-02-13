import { View, Pressable } from "react-native";
import { useForm, Controller, FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInput, Button, Text } from "@/components";

import { ErrorIcon } from "@/assets/icons";
import { cn } from "@/lib/utils";
import type { ZodType } from "zod";
import type { FieldConfig } from "@/modules/auth/types";

interface AuthFormProps {
  fields: FieldConfig[];
  schema: ZodType<any>;
  buttonText: string;
  showForgotPassword?: boolean;
  onForgotPasswordPress?: () => void;
  onSubmit: (data: any) => void;
  isLoading?: boolean;
  className?: string;
}

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
            />
          )}
        />
        {error && (
          <View className="flex-row items-center gap-1 mt-1">
            <ErrorIcon width={16} height={16} />
            <Text className="text-destructive text-sm">{error.message}</Text>
          </View>
        )}
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
        containerStyles="mt-10 mb-6"
      />
    </View>
  );
}
