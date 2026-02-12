import { ImageSourcePropType } from "react-native";

export interface SettingsHeaderProps {
  title: string;
  containerStyles?: string;
  textStyles?: string;
}

export interface AvatarContainerProps {
  name: string;
  email: string;
  avatarSource: ImageSourcePropType;
  variant?: "centered" | "default";
  containerStyles?: string;
  avatarStyles?: string;
  nameStyles?: string;
  emailStyles?: string;
}

export interface SettingsItemProps {
  leftIcon?: React.ReactNode;
  text: string;
  rightIcon?: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  containerStyles?: string;
  leftIconStyles?: string;
  textStyles?: string;
  rightIconStyles?: string;
}

export interface SettingsScreenProps {
  settingsItemVariants?: "container" | "default";
  settingsHeaderVariant?: "centered" | "default";
}


export interface FieldConfig {
  name: string;
  label: string;
  type: "text" | "email" | "password";
  placeholder?: string;
};
