export interface ContactUsFieldConfig {
  name: "email" | "subject" | "message";
  label: string;
  type?: "email" | "default" | "textarea";
  placeholder: string;
}

export const contactUsFields: ContactUsFieldConfig[] = [
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "example@gmail.com",
  },
  {
    name: "subject",
    label: "Subject",
    type: "default",
    placeholder: "",
  },
  {
    name: "message",
    label: "Message",
    type: "textarea",
    placeholder: "What you wanna share?",
  },
];
