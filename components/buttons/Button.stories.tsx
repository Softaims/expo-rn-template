import { View } from "react-native";
import { Meta, StoryObj } from "@storybook/react-native";
import { Button } from "./Button";
import {
  SendIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  CheckIcon,
} from "@/assets/icons";

const meta = {
  title: "Buttons/Button",
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

export const SecondarySmall: Story = {
  args: {
    title: "Button",
    variant: "secondary",
    size: "sm",
    onPress: () => console.log("Pressed"),
  },
};

export const DisabledLarge: Story = {
  args: {
    title: "Button",
    variant: "primary",
    size: "lg",
    disabled: true,
    onPress: () => console.log("Pressed"),
  },
};

export const DisabledMedium: Story = {
  args: {
    title: "Button",
    variant: "primary",
    size: "md",
    disabled: true,
    onPress: () => console.log("Pressed"),
  },
};

export const DisabledSmall: Story = {
  args: {
    title: "Button",
    variant: "primary",
    size: "sm",
    disabled: true,
    onPress: () => console.log("Pressed"),
  },
};

export const ActionedLarge: Story = {
  args: {
    title: "Button",
    variant: "actioned",
    size: "lg",
    onPress: () => console.log("Pressed"),
  },
};

export const ActionedMedium: Story = {
  args: {
    title: "Button",
    variant: "actioned",
    size: "md",
    onPress: () => console.log("Pressed"),
  },
};

export const ActionedSmall: Story = {
  args: {
    title: "Button",
    variant: "actioned",
    size: "sm",
    onPress: () => console.log("Pressed"),
  },
};

export const TextLarge: Story = {
  args: {
    title: "Button",
    variant: "text",
    size: "lg",
    onPress: () => console.log("Pressed"),
  },
};

export const TextMedium: Story = {
  args: {
    title: "Button",
    variant: "text",
    size: "md",
    onPress: () => console.log("Pressed"),
  },
};

export const TextSmall: Story = {
  args: {
    title: "Button",
    variant: "text",
    size: "sm",
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
      innerWrapperStyles="gap-2 items-center justify-center"
    />
  ),
};

export const MediumWithLeftIcon: Story = {
  args: {
    title: "Next",
    variant: "primary",
    size: "md",
  },
  render: (args) => (
    <Button
      {...args}
      leftIcon={<ArrowRightIcon width={18} height={18} color="#ffffff" />}
      onPress={() => console.log("Pressed")}
      innerWrapperStyles="gap-2 items-center justify-center"
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
      leftIcon={<CheckIcon width={18} height={18} color="#ffffff" />}
      onPress={() => console.log("Pressed")}
      innerWrapperStyles="gap-1 items-center justify-center"
    />
  ),
};