// modules/legal/legalContent.ts

import { LegalSection } from "../types";

export const termsSections: LegalSection[] = [
  {
    title: "Acceptance of Terms",
    content: [
      "By accessing or using our fitness app, you confirm that you have read, understood, and agreed to these Terms and Conditions.",
      "These terms apply to all users, including visitors, registered members, and subscribers.",
      "Continued use of the app indicates acceptance of any updates or modifications.",
    ],
  },
  {
    title: "Eligibility and User Account",
    content: [
      "You must be at least 13 years of age to use this app.",
      "By creating an account, you agree to provide accurate, complete, and updated information.",
      "You are responsible for maintaining the confidentiality of your login credentials.",
      "You are responsible for all activities conducted under your account.",
    ],
  },
  {
    title: "Health Disclaimer",
    content: [
      "Our fitness app provides general health, workout, and nutrition guidance for informational purposes only.",
      "It is not intended to replace professional medical advice, diagnosis, or treatment.",
      "Always consult a qualified healthcare provider before starting any fitness or nutrition program.",
    ],
  },
  {
    title: "Use of Services",
    content: [
      "You agree to use the app only for lawful and personal purposes.",
    ],
    bullets: [
      "Misuse the app or attempt unauthorized access",
      "Distribute harmful software or viruses",
      "Interfere with system security",
      "Harass or harm other users",
    ],
  },
  {
    title: "Subscription and Payments",
    content: [
      "Some features of the app may require paid subscriptions.",
      "All fees, billing cycles, and renewal terms will be clearly displayed before purchase.",
      "Payments are processed through secure third-party platforms.",
      "We are not responsible for payment processing errors.",
      "Refunds, if applicable, are subject to our refund guidelines and cancellation policy.",
    ],
  },
];

export const privacySections: LegalSection[] = [
  {
    title: "Information We Collect",
    content: [
      "We collect different types of information to provide and improve our services.",
    ],
    bullets: [
      "Personal information such as name, email address, and gender",
      "Account details such as username and profile information",
      "Fitness-related data including workout history, goals, and progress",
      "Technical data such as device type, IP address, and app usage behavior",
      "Information used to personalize your experience and enhance app performance",
    ],
  },
  {
    title: "How We Use Your Information",
    content: [
      "We use your information for the following purposes:",
    ],
    bullets: [
      "To create and manage your account",
      "To provide personalized workout and fitness plans",
      "To track progress and display performance insights",
      "To send notifications, reminders, and updates",
      "To improve app features and user experience",
      "To respond to customer support requests",
    ],
  },
  {
    title: "Data Storage and Security",
    content: [
      "We use secure servers, encryption technologies, and access controls to protect your personal information.",
      "While we take reasonable steps to safeguard your data, no digital system is completely secure.",
      "You are responsible for keeping your login credentials confidential.",
    ],
  },
  {
    title: "Children’s Privacy",
    content: [
      "Our app is not intended for children under the age of 13.",
      "We do not knowingly collect personal information from minors.",
      "If such data is identified, it will be deleted immediately.",
      "Parents or guardians may contact us if they believe their child has shared information with us.",
    ],
  },
];
