import type { FieldConfig } from "@/modules/auth/types";
import React from "react";
import type {
  ContactUsFieldConfig,
  FAQItem,
  SettingsSection,
} from "../types";
import { PersonIcon, LockIcon, CardIcon, NotificationIcon, MoonIcon, InfoCircleIcon, PhoneIcon, TrashIcon, MessageIcon, LogoutIcon } from "@/assets/icons";

// Change Password Form Configuration
export const changePasswordFields: FieldConfig[] = [
  {
    name: "oldPassword",
    label: "Old Password",
    type: "password",
    placeholder: "Enter your old password",
  },
  {
    name: "newPassword",
    label: "New Password",
    type: "password",
    placeholder: "Enter your new password",
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    placeholder: "Confirm your new password",
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
// Note: Items that need screen-level state/hooks use `actionKey` instead of callbacks
export const settingsItemsConfig: SettingsSection[] = [
  {
    title: "General Settings",
    items: [
      {
        id: "editProfile",
        icon: "person",
        text: "Edit Profile",
        route: "/(tabs)/(settings)/editProfile",
      },
      {
        id: "changePassword",
        icon: "lock",
        text: "Change Password",
        route: "/(tabs)/(settings)/changePassword",
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
        actionKey: "showNotificationSheet",
      },
      // {
      //   id: "darkMode",
      //   icon: "moon",
      //   text: "Dark Mode",
      //   hasToggle: true,
      // },
    ],
  },
  {
    title: "Support",
    items: [
      {
        id: "termsConditions",
        icon: "document",
        text: "Terms & Conditions",
        route: "/(legal)/termsAndConditions",
      },
      {
        id: "privacyPolicy",
        icon: "infoCircle",
        text: "Privacy Policy",
        route: "/(legal)/privacyPolicy",
      },
      {
        id: "faq",
        icon: "helpCircle",
        text: "FAQ's",
        route: "/(tabs)/(settings)/faq",
      },
      {
        id: "contactUs",
        icon: "phone",
        text: "Contact Us",
        route: "/(tabs)/(settings)/contactUs",
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        id: "deleteAccount",
        icon: "trash",
        text: "Delete Account",
        iconColor: "#EF4444",
        actionKey: "deleteAccount",
      },
      {
        id: "logout",
        icon: "logout",
        text: "Logout",
        actionKey: "logout",
      }
    ],
  },
];

// Icon Mapper Function
export const getSettingsIcon = (iconKey: string, color: string = "#000"):
  React.ReactNode => {
  switch (iconKey) {
    case "person":
      return <PersonIcon />;
    case "lock":
      return <LockIcon />;
    case "card":
      return <CardIcon />;
    case "notification":
      return <NotificationIcon />;
    case "moon":
      return <MoonIcon />;
    case "document":
      return <MessageIcon />;
    case "infoCircle":
      return <InfoCircleIcon />;
    case "helpCircle":
      return <InfoCircleIcon />;
    case "phone":
      return <PhoneIcon />;
    case "trash":
      return <TrashIcon />;
    case "logout":
      return <LogoutIcon />;
    default:
      return null;
  }
};
