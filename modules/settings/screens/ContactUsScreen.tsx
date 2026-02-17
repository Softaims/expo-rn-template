import { View } from "react-native";
import { Stack } from "expo-router";
import { Controller } from "react-hook-form";
import { HeaderBackButton, ScreenWrapper } from "@/components";
import { TextInput } from "@/components/inputs";
import { Button } from "@/components/buttons/Button";
import { contactUsFields } from "@/modules/settings/config";
import { useContactUsScreen } from "../hooks/useContactUsScreen";

export function ContactUsScreen() {
  const { control, handleSubmit, errors, isSubmitting, onSubmit } = useContactUsScreen();

  return (
    <ScreenWrapper scrollEnabled headerTransparent>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: "Contact Us",
          headerLeft: () => <HeaderBackButton />,
        }}
      />

      <View className="flex-1 py-4">
        {contactUsFields.map((field) => (
          <View key={field.name} className="mb-4">
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
                  multiline={field.type === "textarea"}
                  numberOfLines={field.type === "textarea" ? 8 : undefined}
                  textAlignVertical={field.type === "textarea" ? "top" : undefined}
                  errorMessage={errors[field.name]?.message}
                />
              )}
            />
          </View>
        ))}
      </View>

      <Button
        title="Submit Feedback"
        variant="primary"
        size="lg"
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
        containerStyles="bg-foreground mx-4 mb-4"
        textStyles="text-background"
      />
    </ScreenWrapper>
  );
}
