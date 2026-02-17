import { AccordionItemData } from "@/components/accordion";
import { Href } from "expo-router";
import { ImageSourcePropType } from "react-native";

export interface SettingsHeaderProps {
  title: string;
  containerStyles?: string;
  textStyles?: string;
}

export interface AvatarContainerProps {
  name: string;
  email: string;
  avatarSource?: ImageSourcePropType;
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
  variant?: "primary" | "secondary";
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

/**
 * Action keys for settings items that need special handling.
 * These are resolved at runtime by the screen component.
 */
export type SettingsActionKey = 
  | "showNotificationSheet"
  | "deleteAccount"
  | "logout";

export interface SettingsItemConfig {
  id: string;
  icon: "person" | "lock" | "card" | "notification" | "moon" | "document" | "infoCircle" | "helpCircle" | "phone" | "trash" | "logout";
  text: string;
  route?: Href;
  hasToggle?: boolean;
  /** Action key for items that need screen-level state/hooks */
  actionKey?: SettingsActionKey;
  iconColor?: string;
}

export interface SettingsSection {
  title: string;
  items: SettingsItemConfig[];
}

/** Map of action keys to their handlers, provided by the parent screen */
export type ActionHandlers = Partial<Record<SettingsActionKey, () => void>>;

/** Map of toggle keys to their state and handler */
export type ToggleStates = Record<string, {
  value: boolean;
  onValueChange: (value: boolean) => void;
}>;

export interface SettingsButtonSectionProps {
  title: string;
  items: SettingsItemConfig[];
  variant?: "seperate" | "merged";
  actionHandlers?: ActionHandlers;
  toggleStates?: ToggleStates;
}
