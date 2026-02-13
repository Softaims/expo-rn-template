import { z } from "zod";

export const contactUsSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email"),
  subject: z.string().min(10, "Subject is required"),
  message: z.string().min(30, "Message is required"),
});

export type ContactUsFormData = z.infer<typeof contactUsSchema>;
