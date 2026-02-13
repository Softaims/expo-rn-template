import React from "react";
import type { FieldConfig } from "@/modules/auth/types";
import type {
  ContactUsFieldConfig,
  FAQItem,
  SettingsItemConfig,
  SettingsSection,
} from "../types";
import {
  PersonIcon,
  LockIcon,
  CardIcon,
  NotificationIcon,
  MoonIcon,
  DocumentIcon,
  InfoCircleIcon,
  HelpCircleIcon,
  PhoneIcon,
  TrashIcon,
} from "@/assets/icons";

// Change Password Form Configuration
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

// Contact Us Form Configuration
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

// FAQ Content Configuration
export const faqItems: FAQItem[] = [
  {
    id: "1",
    title: "What image formats are supported?",
    content:
      "We support jpg, png, and tiff formats. For accurate analysis, please upload high-resolution images.",
  },
  {
    id: "2",
    title: "Who can use pocket coach mobile app",
    content:
      "Anyone with a smartphone can download and use our app. It's available on both iOS and Android platforms. Simply download from the App Store or Google Play Store and create your account to get started.",
  },
  {
    id: "3",
    title: "Is my data secure?",
    content:
      "Yes, we use industry-standard encryption and security measures to protect your data. Your privacy is our top priority and we never share your personal information with third parties.",
  },
  {
    id: "4",
    title: "Can I use my own videos?",
    content:
      "Absolutely! You can upload your own videos for analysis. Our AI will process them and provide detailed feedback on your technique and performance.",
  },
  {
    id: "5",
    title: "What types of videos can I upload?",
    content:
      "You can upload any sports or fitness-related videos. We support MP4, MOV, and AVI formats. Videos should be under 100MB in size for optimal processing.",
  },
  {
    id: "6",
    title: "How do I interpret the results?",
    content:
      "Our app provides detailed insights with visual indicators. Green zones show proper form, yellow indicates areas for improvement, and red highlights potential injury risks. You'll also receive personalized recommendations.",
  },
];

// Settings Items Configuration
export const settingsItemsConfig: SettingsSection[] = [
  {
    title: "General Settings",
    items: [
      {
        id: "edit-profile",
        icon: "person",
        text: "Edit Profile",
        route: "/(tabs)/(settings)/edit-profile",
      },
      {
        id: "change-password",
        icon: "lock",
        text: "Change Password",
        route: "/(tabs)/(settings)/change-password",
      },
      // {
      //   id: "subscription",
      //   icon: "card",
      //   text: "Subscription",
      // },
      {
        id: "notifications",
        icon: "notification",
        text: "Notifications",
        hasToggle: true,
      },
      {
        id: "dark-mode",
        icon: "moon",
        text: "Dark Mode",
        hasToggle: true,
      },
    ],
  },
  {
    title: "Support",
    items: [
      {
        id: "terms-conditions",
        icon: "document",
        text: "Terms & Conditions",
        route: "/(legal)/terms-and-conditions",
      },
      {
        id: "privacy-policy",
        icon: "infoCircle",
        text: "Privacy Policy",
        route: "/(legal)/privacy-policy",
      },
      {
        id: "faq",
        icon: "helpCircle",
        text: "FAQ's",
        route: "/(tabs)/(settings)/faq",
      },
      {
        id: "contact-us",
        icon: "phone",
        text: "Contact Us",
        route: "/(tabs)/(settings)/contact-us",
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        id: "delete-account",
        icon: "trash",
        text: "Delete Account",
        iconColor: "#EF4444",
      },
    ],
  },
];

// Icon Mapper Function
export const getSettingsIcon = (
  iconKey: SettingsItemConfig["icon"],
  color: string = "#000",
  size: number = 24,
): React.ReactNode => {
  const iconProps = { width: size, height: size };

  switch (iconKey) {
    case "person":
      return React.createElement(PersonIcon, { ...iconProps, fill: color });
    case "lock":
      return React.createElement(LockIcon, { ...iconProps, fill: color });
    case "card":
      return React.createElement(CardIcon, { ...iconProps, stroke: color });
    case "notification":
      return React.createElement(NotificationIcon, {
        ...iconProps,
        fill: color,
      });
    case "moon":
      return React.createElement(MoonIcon, { ...iconProps, fill: color });
    case "document":
      return React.createElement(DocumentIcon, { ...iconProps, color });
    case "infoCircle":
      return React.createElement(InfoCircleIcon, { ...iconProps, fill: color });
    case "helpCircle":
      return React.createElement(InfoCircleIcon, { ...iconProps, fill: color });
    case "phone":
      return React.createElement(PhoneIcon, { ...iconProps, fill: color });
    case "trash":
      return React.createElement(TrashIcon, { ...iconProps, fill: color });
    default:
      return null;
  }
};
