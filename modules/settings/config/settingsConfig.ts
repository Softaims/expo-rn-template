import type { FieldConfig } from "@/modules/auth/types";

export const changePasswordFields: FieldConfig[] = [
  {
    name: "oldPassword",
    label: "Old Password",
    type: "password",
    placeholder: "********",
  },
  {
    name: "newPassword",
    label: "New Password",
    type: "password",
    placeholder: "********",
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    placeholder: "********",
  },
];
