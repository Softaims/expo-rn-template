import { BookmarkIcon, PostsIcon } from "@/assets/icons";
import { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";
import { Tabs } from "./Tabs";

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
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

const basicTabs = [
  { label: "Details", value: "details" }, // unique value for each tab
  { label: "Products", value: "products" },
  { label: "Orders", value: "orders" },
  { label: "Team", value: "team" },
];

// -------------------
// Basic Variants
// -------------------

export const Underline: Story = {
  args: {
    variant: "underline",
    tabs: basicTabs,
    defaultValue: "details",

    // Naming_Convention: persist container styles, remove className
    // Remove font family prop

    // containerStyles: "gap-4 bg-red-500",
    // activeTabStyle: "bg-blue-500",
  },
};

export const Filled: Story = {
  args: {
    variant: "filled",
    tabs: basicTabs,
    defaultValue: "details",

    // 🚨🚨🚨🚨🚨🚨🚨🚨  props overriding logic wrong
    // containerStyles: "border-[1px]",
    // activeTabStyle: 'flex-1',
    // inactiveTabStyle: 'flex-1',
  },
};

export const FilledBg: Story = {
  args: {
    variant: "filled",
    tabs: basicTabs,
    defaultValue: "details",
    containerStyles: "bg-muted p-1 rounded-lg",
  },
};

export const Pill: Story = {
  args: {
    variant: "pill",
    tabs: basicTabs,
    defaultValue: "details",
  },
};

export const PillBg: Story = {
  args: {
    variant: "pill",
    tabs: basicTabs,
    defaultValue: "details",
    containerStyles: "bg-muted p-1 rounded-full",
  },
};

export const IconTabsCustom: Story = {
  args: {
    variant: "icon",
    tabs: basicTabs,
    defaultValue: "saved",
  },
  render: () => (
    <Tabs
      variant="icon"
      tabs={[
        {
          label: "Posts",
          value: "posts",
          icon: (active) => (
            <PostsIcon
              width={18}
              height={18}
              color={active ? "#000" : "#9ca3af"}
            />
          ),
        },
        {
          label: "Saved Posts",
          value: "saved",
          icon: (active) => (
            <BookmarkIcon
              width={18}
              height={18}
              color={active ? "#000" : "#9ca3af"}
            />
          ),
        },
      ]}
      defaultValue="saved"
      activeTabStyle="border-primary"
      inactiveTabStyle="border-gray-300"
      activeTextStyle="text-primary"
      inactiveTextStyle="text-gray-400"
    />
  ),
};
