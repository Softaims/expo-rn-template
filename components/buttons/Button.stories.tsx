import { View } from "react-native";
import { Meta, StoryObj } from "@storybook/react-native";
import { Button } from "./Button";
import { SendIcon, ArrowRightIcon, ArrowLeftIcon, CheckIcon } from "@/assets/icons";

const meta = {
  component: Button,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "disabled", "actioned", "text"],
    },
    size: {
      control: { type: "select" },
      options: ["lg", "md", "sm"],
    },
    disabled: {
      control: { type: "boolean" },
    },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

// -------------------
// Basic Variants & Sizes
// -------------------

export const PrimaryLarge: Story = {
  args: {
    title: "Button",
    variant: "primary",
    size: "lg",
    onPress: () => console.log("Pressed"),
  },
};

export const PrimaryMedium: Story = {
  args: {
    title: "Button",
    variant: "primary",
    size: "md",
    onPress: () => console.log("Pressed"),
  },
};

export const PrimarySmall: Story = {
  args: {
    title: "Button",
    variant: "primary",
    size: "sm",
    onPress: () => console.log("Pressed"),
  },
};

export const SecondaryLarge: Story = {
  args: {
    title: "Button",
    variant: "secondary",
    size: "lg",
    onPress: () => console.log("Pressed"),
  },
};

export const SecondaryMedium: Story = {
  args: {
    title: "Button",
    variant: "secondary",
    size: "md",
    onPress: () => console.log("Pressed"),
  },
};

export const Disabled: Story = {
  args: {
    title: "Button",
    variant: "primary",
    size: "md",
    disabled: true,
    onPress: () => console.log("Pressed"),
  },
};

export const Actioned: Story = {
  args: {
    title: "Button",
    variant: "actioned",
    size: "md",
    onPress: () => console.log("Pressed"),
  },
};

export const TextVariant: Story = {
  args: {
    title: "Button",
    variant: "text",
    size: "md",
    onPress: () => console.log("Pressed"),
  },
};

// -------------------
// With Left Icons
// -------------------

export const PrimaryWithLeftIcon: Story = {
  args: {
    title: "Send Message",
    variant: "primary",
    size: "lg",
  },
  render: (args) => (
    <Button
      {...args}
      leftIcon={<SendIcon width={20} height={20} color="#ffffff" />}
      onPress={() => console.log("Pressed")}
    />
  ),
};

export const SecondaryWithLeftIcon: Story = {
  args: {
    title: "Go Back",
    variant: "secondary",
    size: "md",
  },
  render: (args) => (
    <Button
      {...args}
      leftIcon={<ArrowLeftIcon width={18} height={18} color="#3b82f6" />}
      onPress={() => console.log("Pressed")}
    />
  ),
};

export const SmallWithLeftIcon: Story = {
  args: {
    title: "Check",
    variant: "primary",
    size: "sm",
  },
  render: (args) => (
    <Button
      {...args}
      leftIcon={<CheckIcon width={16} height={16} color="#ffffff" />}
      onPress={() => console.log("Pressed")}
    />
  ),
};

// -------------------
// With Right Icons
// -------------------

export const PrimaryWithRightIcon: Story = {
  args: {
    title: "Continue",
    variant: "primary",
    size: "lg",
  },
  render: (args) => (
    <Button
      {...args}
      rightIcon={<ArrowRightIcon width={20} height={20} color="#ffffff" />}
      onPress={() => console.log("Pressed")}
    />
  ),
};

export const SecondaryWithRightIcon: Story = {
  args: {
    title: "Next Step",
    variant: "secondary",
    size: "md",
  },
  render: (args) => (
    <Button
      {...args}
      rightIcon={<ArrowRightIcon width={18} height={18} color="#3b82f6" />}
      onPress={() => console.log("Pressed")}
    />
  ),
};

export const TextWithRightIcon: Story = {
  args: {
    title: "Learn More",
    variant: "text",
    size: "md",
  },
  render: (args) => (
    <Button
      {...args}
      rightIcon={<ArrowRightIcon width={16} height={16} color="#3b82f6" />}
      onPress={() => console.log("Pressed")}
    />
  ),
};

// -------------------
// With Both Icons
// -------------------

export const WithBothIcons: Story = {
  args: {
    title: "Transfer",
    variant: "primary",
    size: "md",
  },
  render: (args) => (
    <Button
      {...args}
      leftIcon={<ArrowLeftIcon width={18} height={18} color="#ffffff" />}
      rightIcon={<ArrowRightIcon width={18} height={18} color="#ffffff" />}
      onPress={() => console.log("Pressed")}
    />
  ),
};

// -------------------
// Custom Styling
// -------------------

export const RoundedButton: Story = {
  args: {
    title: "Continue",
    variant: "secondary",
    containerStyles: "rounded-full",
    innerWrapperStyles: "gap-3",
  },
  render: (args) => (
    <Button
      {...args}
      rightIcon={<ArrowRightIcon width={18} height={18} color="#3b82f6" />}
      onPress={() => console.log("Pressed")}
    />
  ),
};

export const CustomIconWrapper: Story = {
  args: {
    title: "Check Status",
    variant: "primary",
  },
  render: (args) => (
    <Button
      {...args}
      leftIcon={
        <View className="bg-white/20 rounded-full p-1">
          <CheckIcon width={18} height={18} color="#ffffff" />
        </View>
      }
      onPress={() => console.log("Pressed")}
    />
  ),
};

export const DisabledWithIcon: Story = {
  args: {
    title: "Disabled",
    variant: "primary",
    disabled: true,
  },
  render: (args) => (
    <Button
      {...args}
      rightIcon={<SendIcon width={18} height={18} color="#9ca3af" />}
      onPress={() => console.log("Pressed")}
    />
  ),
};
