import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { showSuccessAlert, showErrorAlert } from "@/components/alerts";
import { contactUsSchema, ContactUsFormData } from "@/modules/settings/schemas";
import { captureException } from "@/modules/sentry";

export function useContactUsScreen() {
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
      await new Promise((resolve) => setTimeout(resolve, 1000));

      showSuccessAlert({
        title: "Feedback Submitted",
        message: "Thank you for your feedback! We'll get back to you soon.",
        buttonText: "OK",
      });

      reset();
    } catch (error: any) {
      captureException(error);
      showErrorAlert({
        title: "Submission Failed",
        message: error?.message || "Failed to submit feedback. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    control,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
  };
}
