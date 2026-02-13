import { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";
import { TextInput } from "./TextInput";
import { useState } from "react";

const meta = {
  title: "Inputs/TextInput",
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
  render: (args) => {
    const [value, setValue] = useState('');
    return <TextInput {...args} value={value} onChangeText={setValue} />;
  },
};

export const EmailField: Story = {
  args: {
    type: 'email',
    label: 'Email Field',
    placeholder: 'Enter your email',
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return <TextInput {...args} value={value} onChangeText={setValue} />;
  },
};

export const PasswordField: Story = {
  args: {
    type: 'password',
    label: 'Password Field',
    placeholder: 'Enter your password',
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return <TextInput {...args} value={value} onChangeText={setValue} />;
  },
};

export const NumberField: Story = {
  args: {
    type: 'number',
    label: 'Number Field',
    placeholder: 'Enter your number',
    keyboardType: 'numeric',
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return <TextInput {...args} value={value} onChangeText={setValue} />;
  },
};

export const SearchField: Story = {
  args: {
    type: 'search',
    label: 'Search Field',
    placeholder: 'Search',
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return <TextInput {...args} value={value} onChangeText={setValue} />;
  },
};

export const ChatField: Story = {
  args: {
    type: 'chat',
    label: 'Chat Field',
    placeholder: 'Enter your message',
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return <TextInput {...args} value={value} onChangeText={setValue} />;
  }
};

export const TextareaField: Story = {
  args: {
    type: 'textarea',
    label: 'Textarea Field',
    placeholder: 'Enter your message',
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return <TextInput {...args} value={value} onChangeText={setValue} />;
  }
};

export const PhoneField: Story = {
  args: {
    type: 'phone-basic',
    label: 'Phone Field',
    placeholder: 'Enter your phone',
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return <TextInput {...args} value={value} onChangeText={setValue} />;
  }
};

export const PhoneCodeField: Story = {
  args: {
    type: 'phone-code',
    label: 'Phone Code Field',
    placeholder: 'Enter your phone',
    countryCode: 'PK',
    callingCode: '92',
  },
  render: (args) => {
    const [value, setValue] = useState('');
    const [countryCode, setCountryCode] = useState(args.countryCode);
    const [callingCode, setCallingCode] = useState(args.callingCode);
    return <TextInput {...args} value={value} onChangeText={setValue} countryCode={countryCode} callingCode={callingCode} setCountryCode={setCountryCode} setCallingCode={setCallingCode} />;
  }
};

export const PhoneCodeIconField: Story = {
  args: {
    type: 'phone-code-icon',
    label: 'Phone Code Icon Field',
    placeholder: 'Enter your phone',
    countryCode: 'PK',
    callingCode: '92',
  },
  render: (args) => {
    const [value, setValue] = useState('');
    const [countryCode, setCountryCode] = useState(args.countryCode);
    const [callingCode, setCallingCode] = useState(args.callingCode);
    return <TextInput {...args} value={value} onChangeText={setValue} countryCode={countryCode} callingCode={callingCode} setCountryCode={setCountryCode} setCallingCode={setCallingCode} />;
  }
};