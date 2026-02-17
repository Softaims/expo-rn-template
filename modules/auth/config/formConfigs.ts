import type { FieldConfig } from '@/modules/auth/types';

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
    placeholder: 'Enter your password',
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
    placeholder: 'Enter your password',
  },
  {
    name: 'repeatPassword',
    label: 'Repeat Password',
    type: 'password',
    placeholder: 'Confirm your password',
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
    placeholder: 'Enter your new password',
  },
  {
    name: 'confirmPassword',
    label: 'Confirm Password',
    type: 'password',
    placeholder: 'Confirm your new password',
  },
];
