import { StyleSheet, View } from "react-native";
import { useTheme } from "@/lib/theme";
import { wp } from "@/lib/responsive";
import { Stack } from "expo-router";
import { Controller } from "react-hook-form";
import { HeaderBackButton, ScreenWrapper } from "@/components";
import { TextInput } from "@/components/inputs";
import { Button } from "@/components/buttons/Button";
import { contactUsFields } from "@/modules/settings/config";
import { useContactUsScreen } from "../hooks/useContactUsScreen";

const screenStyles = StyleSheet.create({
  root: {
    flex: 1,
    paddingVertical: wp(4),
  },
  fieldWrap: {
    marginBottom: wp(4),
  },
});

export function ContactUsScreen() {
  const { colors } = useTheme();
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

      <View style={screenStyles.root}>
        {contactUsFields.map((field) => (
          <View key={field.name} style={screenStyles.fieldWrap}>
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
        containerStyle={{
          backgroundColor: colors.foreground,
          marginHorizontal: wp(4),
          marginBottom: wp(4),
        }}
        textStyle={{ color: colors.background }}
      />
    </ScreenWrapper>
  );
}
