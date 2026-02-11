import type { FieldConfig } from '@/app/(auth)/_components/AuthForm';

export const loginFields: FieldConfig[] = [
  {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    placeholder: 'example@gmail.com',
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: '********',
  },
];

export const signupFields: FieldConfig[] = [
  {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    placeholder: 'example@gmail.com',
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: '********',
  },
  {
    name: 'repeatPassword',
    label: 'Repeat Password',
    type: 'password',
    placeholder: '********',
  },
];

export const forgotPasswordFields: FieldConfig[] = [
  {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    placeholder: 'example@gmail.com',
  },
];

export const resetPasswordFields: FieldConfig[] = [
  {
    name: 'newPassword',
    label: 'New Password',
    type: 'password',
    placeholder: '********',
  },
  {
    name: 'confirmPassword',
    label: 'Confirm Password',
    type: 'password',
    placeholder: '********',
  },
];
