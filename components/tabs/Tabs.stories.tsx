import { View } from "react-native";
import { Meta, StoryObj } from "@storybook/react-native";
import { Tabs } from "./Tabs";
import { PostsIcon, BookmarkIcon } from "@/assets/icons";

const meta = {
  component: Tabs,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["underline", "filled", "filled-rounded", "pill", "icon"],
    },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, backgroundColor: "#fff" }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

const basicTabs = [
  { label: "Details", value: "details" },
  { label: "Products", value: "products" },
  { label: "Orders", value: "orders" },
  { label: "Team", value: "team" },
];

const iconTabs = [
  {
    label: "Posts",
    value: "posts",
    icon: <PostsIcon width={18} height={18} />,
  },
  {
    label: "Saved Posts",
    value: "saved",
    icon: <BookmarkIcon width={18} height={18} />,
  },
];

// Variant 1: Underline
export const Variant1Underline: Story = {
  args: {
    variant: "underline",
    tabs: basicTabs,
    defaultValue: "details",
    onValueChange: (value) => console.log("Tab changed to:", value),
  },
};

export const Variant1UnderlineProducts: Story = {
  args: {
    variant: "underline",
    tabs: basicTabs,
    defaultValue: "products",
  },
};

export const Variant1UnderlineOrders: Story = {
  args: {
    variant: "underline",
    tabs: basicTabs,
    defaultValue: "orders",
  },
};

export const Variant1UnderlineTeam: Story = {
  args: {
    variant: "underline",
    tabs: basicTabs,
    defaultValue: "team",
  },
};

// Variant 2: Filled
export const Variant2Filled: Story = {
  args: {
    variant: "filled",
    tabs: basicTabs,
    defaultValue: "details",
  },
};

export const Variant2FilledProducts: Story = {
  args: {
    variant: "filled",
    tabs: basicTabs,
    defaultValue: "products",
  },
};

export const Variant2FilledOrders: Story = {
  args: {
    variant: "filled",
    tabs: basicTabs,
    defaultValue: "orders",
  },
};

// Variant 3: Filled Rounded (same as variant 2 in your design)
export const Variant3FilledDetails: Story = {
  args: {
    variant: "filled-rounded",
    tabs: basicTabs,
    defaultValue: "details",
  },
};

export const Variant3FilledProducts: Story = {
  args: {
    variant: "filled-rounded",
    tabs: basicTabs,
    defaultValue: "products",
  },
};

export const Variant3FilledOrders: Story = {
  args: {
    variant: "filled-rounded",
    tabs: basicTabs,
    defaultValue: "orders",
  },
};

export const Variant3FilledTeams: Story = {
  args: {
    variant: "filled-rounded",
    tabs: basicTabs,
    defaultValue: "team",
  },
};

// Variant 4: Pill
export const Variant4PillDetails: Story = {
  args: {
    variant: "pill",
    tabs: basicTabs,
    defaultValue: "details",
  },
};

export const Variant4PillProducts: Story = {
  args: {
    variant: "pill",
    tabs: basicTabs,
    defaultValue: "products",
  },
};

export const Variant4PillOrders: Story = {
  args: {
    variant: "pill",
    tabs: basicTabs,
    defaultValue: "orders",
  },
};

export const Variant4PillTeams: Story = {
  args: {
    variant: "pill",
    tabs: basicTabs,
    defaultValue: "team",
  },
};

// Variant 5: Icon Tabs
export const Variant5IconPosts: Story = {
  args: {
    variant: "icon",
    tabs: iconTabs,
    defaultValue: "posts",
  },
};

export const Variant5IconSaved: Story = {
  args: {
    variant: "icon",
    tabs: iconTabs,
    defaultValue: "saved",
  },
};
