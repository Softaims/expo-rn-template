import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ScreenHeader } from "@/components/headers";
import { TextInput } from "@/components/inputs";
import { Button } from "@/components/buttons/Button";
import { showSuccessAlert, showErrorAlert } from "@/components/alerts";
import { contactUsSchema, ContactUsFormData } from "@/modules/settings/schemas";
import { contactUsFields } from "@/modules/settings/config";

export function ContactUsScreen() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactUsFormData>({
    resolver: zodResolver(contactUsSchema),
    defaultValues: {
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactUsFormData) => {
    setIsSubmitting(true);

    try {
      // TODO: Implement API call to submit feedback
      console.log("Contact form data:", data);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      showSuccessAlert({
        title: "Feedback Submitted",
        message: "Thank you for your feedback! We'll get back to you soon.",
        buttonText: "OK",
      });

      // Clear form
      reset();
    } catch {
      showErrorAlert({
        title: "Submission Failed",
        message: "Failed to submit feedback. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScreenHeader title="Contact Us" onBackPress={() => router.back()} />

      <ScrollView
        className="flex-1 px-4"
        contentContainerStyle={{ paddingVertical: 16 }}
      >
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
                  labelStyles="text-muted-foreground font-normal text-sm mb-1"
                  inputContainerStyles="bg-background"
                  multiline={field.type === "textarea"}
                  numberOfLines={field.type === "textarea" ? 8 : undefined}
                  textAlignVertical={field.type === "textarea" ? "top" : undefined}
                  errorMessage={errors[field.name]?.message}
                />
              )}
            />
          </View>
        ))}
      </ScrollView>

      <Button
        title="Submit Feedback"
        variant="primary"
        size="lg"
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
        containerStyles="bg-foreground mx-4 mb-4"
        textStyles="text-background"
      />
    </SafeAreaView>
  );
}
