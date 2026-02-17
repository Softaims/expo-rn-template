import type { ImageSourcePropType } from "react-native";
import type { ZodType } from "zod";
import type { ReactNode } from "react";

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

// Component prop interfaces
export interface AuthFormProps {
  fields: FieldConfig[];
  schema: ZodType<any>;
  buttonText: string;
  showForgotPassword?: boolean;
  onForgotPasswordPress?: () => void;
  onSubmit: (data: any) => void;
  isLoading?: boolean;
  className?: string;
}

export interface AuthContentProps {
  variant?: "default" | "bottom-sheet";
  title: string;
  description: string;
  titleStyles?: string;
  descriptionStyles?: string;
  image?: ImageSourcePropType;
  imageStyles?: string;
  isBottomSheetVisible?: boolean;
  setIsBottomSheetVisible?: (visible: boolean) => void;
  enableBackdropDismiss?: boolean;
  fields: FieldConfig[];
  schema: ZodType<any>;
  buttonText: string;
  onSubmit: (data: any) => Promise<void>;
  formContainerStyles?: string;
  showForgotPassword?: boolean;
  onForgotPasswordPress?: () => void;
  footerText?: string;
  footerLinkText?: string;
  onFooterNavigate?: () => void;
  showHeader?: boolean;
  showFooter?: boolean;
  showSocialAuthButtons?: boolean;
  isLoading?: boolean;
}

export interface AuthFooterProps {
  text: string;
  linkText: string;
  onNavigate: () => void;
}

export interface AuthTitlesSectionProps {
  title: string;
  description: string;
  titleStyles?: string;
  descriptionStyles?: string;
}

export interface SocialAuthProviderConfig {
  id: string;
  icon: ReactNode;
}

export interface SocialAuthButtonsProps {
  providers?: SocialAuthProviderConfig[];
  dividerText?: string;
}

export interface AuthProviderProps {
  children: ReactNode;
}
