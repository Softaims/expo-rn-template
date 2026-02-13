import { z } from "zod";

export const editProfileSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .min(3, "Username must be at least 3 characters"),
});

export type EditProfileFormData = z.infer<typeof editProfileSchema>;
