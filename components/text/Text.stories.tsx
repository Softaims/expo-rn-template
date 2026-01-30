import { View } from "react-native";
import { Meta, StoryObj } from "@storybook/react-native";
import { Text } from "./Text";

const meta = {
  component: Text,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: [
        "heading1",
        "heading2",
        "heading3",
        "subheading1",
        "subheading2",
        "subheading3",
        "subheading4",
        "bodyText1",
        "bodyText2",
        "bodyText3",
        "bodyText4",
      ],
    },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Heading1: Story = {
  args: {
    variant: "heading1",
    children: "Heading 1 - Bold 28",
  },
};

export const Heading2: Story = {
  args: {
    variant: "heading2",
    children: "Heading 2 - Bold 24",
  },
};

export const Heading3: Story = {
  args: {
    variant: "heading3",
    children: "Heading 3 - Bold 22",
  },
};

export const Subheading1: Story = {
  args: {
    variant: "subheading1",
    children: "Subheading 1 - Semibold 20",
  },
};

export const Subheading2: Story = {
  args: {
    variant: "subheading2",
    children: "Subheading 2 - Bold 18",
  },
};

export const Subheading3: Story = {
  args: {
    variant: "subheading3",
    children: "Subheading 3 - Semibold 16",
  },
};

export const Subheading4: Story = {
  args: {
    variant: "subheading4",
    children: "Subheading 4 - Semibold 14",
  },
};

export const BodyText1: Story = {
  args: {
    variant: "bodyText1",
    children: "Body Text 1 - Medium 14",
  },
};

export const BodyText2: Story = {
  args: {
    variant: "bodyText2",
    children: "Body Text 2 - Medium 13",
  },
};

export const BodyText3: Story = {
  args: {
    variant: "bodyText3",
    children: "Body Text 3 - Medium 12",
  },
};

export const BodyText4: Story = {
  args: {
    variant: "bodyText4",
    children: "Body Text 4 - Medium 10",
  },
};

export const AllVariants: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <Text variant="heading1">Heading 1 - Bold 28</Text>
      <Text variant="heading2">Heading 2 - Bold 24</Text>
      <Text variant="heading3">Heading 3 - Bold 22</Text>
      <Text variant="subheading1">Subheading 1 - Semibold 20</Text>
      <Text variant="subheading2">Subheading 2 - Bold 18</Text>
      <Text variant="subheading3">Subheading 3 - Semibold 16</Text>
      <Text variant="subheading4">Subheading 4 - Semibold 14</Text>
      <Text variant="bodyText1">Body Text 1 - Medium 14</Text>
      <Text variant="bodyText2">Body Text 2 - Medium 13</Text>
      <Text variant="bodyText3">Body Text 3 - Medium 12</Text>
      <Text variant="bodyText4">Body Text 4 - Medium 10</Text>
    </View>
  ),
};

export const WithCustomColor: Story = {
  args: {
    variant: "heading1",
    children: "Custom Color Text",
    className: "text-primary",
  },
};

export const WithMultipleLines: Story = {
  args: {
    variant: "bodyText1",
    children:
      "This is a longer text that demonstrates how the Text component handles multiple lines of content. The line height is properly set for readability.",
  },
};
