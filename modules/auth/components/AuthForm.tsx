import { View, Pressable, StyleProp, ViewStyle } from "react-native";
import { useForm, Controller, FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInput, Button, Text } from "@/components";
import { useTheme } from "@/lib/theme";

import type { AuthFormProps, FieldConfig } from "@/modules/auth/types";
import { styles } from "./AuthForm.styles";

export default function AuthForm({
  fields,
  schema,
  buttonText,
  showForgotPassword = false,
  onForgotPasswordPress,
  onSubmit,
  isLoading,
  containerStyle,
  className,
}: AuthFormProps) {
  const { colors } = useTheme();
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

  const rootStyle: StyleProp<ViewStyle> = [styles.rootBase, containerStyle];

  return (
    <View style={rootStyle} className={className}>
      <View style={styles.fieldStack}>
        {fields.map((field) => renderField(field))}

        {showForgotPassword && (
          <Pressable
            style={styles.forgotPressable}
            onPress={onForgotPasswordPress}
          >
            <Text
              variant="bodyText2"
              style={[styles.forgotText, { color: colors.text }]}
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
