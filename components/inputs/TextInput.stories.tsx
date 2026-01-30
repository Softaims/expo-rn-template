import { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";
import { TextInput } from "./TextInput";

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