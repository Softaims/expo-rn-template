// Field configuration for forms
export interface FieldConfig {
  name: string;
  label: string;
  type: "email" | "password" | "default";
  placeholder: string;
}

// Auth screen variants
export type AuthVariant = "default" | "bottom-sheet" | "with-icon";

// OTP verification flow types
export type OTPVerificationFlow = "signup" | "reset-password";

// Screen prop interfaces
export interface LoginScreenProps {
  variant?: "default" | "bottom-sheet";
}

export interface SignupScreenProps {
  variant?: "default" | "bottom-sheet";
}

export interface ForgotPasswordScreenProps {
  variant?: "default" | "with-icon";
}

export interface OTPVerificationScreenProps {
  variant?: "default" | "with-icon";
}

export interface ResetPasswordScreenProps {
  variant?: "default" | "with-icon";
}
