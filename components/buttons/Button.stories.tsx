import { View } from "react-native";
import { Meta, StoryObj } from "@storybook/react-native";
import { Button } from "./Button";
import { SendIcon, ArrowRightIcon, ArrowLeftIcon } from "@/assets/icons";

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

// With Icons - Left Position
export const PrimaryWithIconLeft: Story = {
  args: { title: "Button", variant: "primary", size: "lg" },
  render: () => (
    <Button
      title="Button"
      variant="primary"
      size="lg"
      icon={<SendIcon />}
      iconPosition="left"
      onPress={() => console.log("Pressed")}
    />
  ),
};

export const PrimaryMediumWithIconLeft: Story = {
  args: { title: "Button", variant: "primary", size: "md" },
  render: () => (
    <Button
      title="Button"
      variant="primary"
      size="md"
      icon={<SendIcon width={18} height={18} />}
      iconPosition="left"
      onPress={() => console.log("Pressed")}
    />
  ),
};

export const PrimarySmallWithIconLeft: Story = {
  args: { title: "Button", variant: "primary", size: "sm" },
  render: () => (
    <Button
      title="Button"
      variant="primary"
      size="sm"
      icon={<SendIcon width={16} height={16} />}
      iconPosition="left"
      onPress={() => console.log("Pressed")}
    />
  ),
};

// With Icons - Right Position
export const PrimaryWithIconRight: Story = {
  args: { title: "Button", variant: "primary", size: "lg" },
  render: () => (
    <Button
      title="Button"
      variant="primary"
      size="lg"
      icon={<ArrowRightIcon />}
      iconPosition="right"
      onPress={() => console.log("Pressed")}
    />
  ),
};

export const PrimaryMediumWithIconRight: Story = {
  args: { title: "Button", variant: "primary", size: "md" },
  render: () => (
    <Button
      title="Button"
      variant="primary"
      size="md"
      icon={<ArrowRightIcon width={18} height={18} />}
      iconPosition="right"
      onPress={() => console.log("Pressed")}
    />
  ),
};

export const PrimarySmallWithIconRight: Story = {
  args: { title: "Button", variant: "primary", size: "sm" },
  render: () => (
    <Button
      title="Button"
      variant="primary"
      size="sm"
      icon={<ArrowRightIcon width={16} height={16} />}
      iconPosition="right"
      onPress={() => console.log("Pressed")}
    />
  ),
};

// Secondary with Icons
export const SecondaryWithIconLeft: Story = {
  args: { title: "Button", variant: "secondary", size: "md" },
  render: () => (
    <Button
      title="Button"
      variant="secondary"
      size="md"
      icon={<ArrowLeftIcon color="#000000" width={18} height={18} />}
      iconPosition="left"
      onPress={() => console.log("Pressed")}
    />
  ),
};

export const SecondaryWithIconRight: Story = {
  args: { title: "Button", variant: "secondary", size: "md" },
  render: () => (
    <Button
      title="Button"
      variant="secondary"
      size="md"
      icon={<ArrowRightIcon color="#000000" width={18} height={18} />}
      iconPosition="right"
      onPress={() => console.log("Pressed")}
    />
  ),
};
