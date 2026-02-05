import { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";
import { TextInput } from "./TextInput";
import { CountryCode } from "react-native-country-picker-modal";

const meta = {
  component: TextInput,
  decorators: [
    (Story) => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof TextInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultField: Story = {
  args: {
    type: 'default',
    label: 'Default Field',
    placeholder: 'Enter your text',
  },
};

export const EmailField: Story = {
  args: {
    type: 'email',
    label: 'Email Field',
    placeholder: 'Enter your email',
  },
};

export const PasswordField: Story = {
  args: {
    type: 'password',
    label: 'Password Field',
    placeholder: 'Enter your password',
  },
};

export const NumberField: Story = {
  args: {
    type: 'number',
    label: 'Number Field',
    placeholder: 'Enter your number',
    keyboardType:'numeric',
  },
};

export const SearchField: Story = {
  args: {
    type: 'search',
    label: 'Search Field',
    placeholder: 'Search',
  },
};

export const ChatField: Story = {
  args: {
    type: 'chat',
    label: 'Chat Field',
    placeholder: 'Enter your message',
  },
};

export const TextareaField: Story = {
  args: {
    type: 'textarea',
    label: 'Textarea Field',
    placeholder: 'Enter your message',
    // errorMessage: 'This is an error message',
  },
};

export const PhoneField: Story = {
  args: {
    type: 'phone-basic',
    label: 'Phone Field',
    placeholder: 'Enter your phone',
  },
};
export const PhoneCodeField: Story = {
  args: {
    type: 'phone-code',
    label: 'Phone Code Field',
    placeholder: 'Enter your phone',
    countryCode: 'PK',
    callingCode: '92',
    setCountryCode: (countryCode: CountryCode) => {
      console.log(countryCode);
    },
    setCallingCode: (callingCode: string) => {
      console.log(callingCode);
    },
  },
};

export const PhoneCodeIconField: Story = {
  args: {
    type: 'phone-code-icon',
    label: 'Phone Code Icon Field',
    placeholder: 'Enter your phone',
    countryCode: 'PK',
    callingCode: '92',
    setCountryCode: (countryCode: CountryCode) => {
      console.log(countryCode);
    },
    setCallingCode: (callingCode: string) => {
      console.log(callingCode);
    },
  },
};