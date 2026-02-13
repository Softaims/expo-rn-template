import { ImageSourcePropType } from "react-native";
import { AccordionItemData } from "@/components/accordion";

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
  variant?: "default" | "container";
}

export interface SettingsScreenProps {
  settingsItemVariants?: "container" | "default";
  settingsHeaderVariant?: "centered" | "default";
}

export interface ContactUsFieldConfig {
  name: "email" | "subject" | "message";
  label: string;
  type?: "email" | "default" | "textarea";
  placeholder: string;
}

export type FAQItem = AccordionItemData;

export interface SettingsItemConfig {
  id: string;
  icon: "person" | "lock" | "card" | "notification" | "moon" | "document" | "infoCircle" | "helpCircle" | "phone" | "trash";
  text: string;
  route?: string;
  hasToggle?: boolean;
  iconColor?: string;
  onPress?: () => void;
}

export interface SettingsSection {
  title: string;
  items: SettingsItemConfig[];
}
