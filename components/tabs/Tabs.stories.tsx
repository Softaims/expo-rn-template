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
  { label: "Details", value: "details", }, // unique value for each tab
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

// remove extra
// export const FilledRounded: Story = {
//   args: {
//     variant: "filled-rounded",
//     tabs: basicTabs,
//     defaultValue: "details",
//   },
// };

export const Pill: Story = {
  args: {
    variant: "pill",
    tabs: basicTabs,
    defaultValue: "details",
  },
};

// -------------------
// Custom Styling
// -------------------

// export const CustomActiveInactive: Story = {
//   args: {
//     variant: "filled",
//     tabs: basicTabs,
//     defaultValue: "products",
//     containerStyles: "gap-4",
//     activeTabStyle: "bg-blue-600 px-6 py-4 rounded-xl",
//     inactiveTabStyle: "bg-gray-100 px-6 py-4 rounded-xl",
//     activeTextStyle: "text-white text-lg font-bold",
//     inactiveTextStyle: "text-gray-500 text-lg",
//   },
// };

export const CustomPillColors: Story = {
  args: {
    variant: "pill",
    tabs: basicTabs,
    defaultValue: "orders",
    activeTabStyle: "bg-green-500",
    inactiveTabStyle: "bg-green-100",
    activeTextStyle: "text-white font-semibold tracking-widest",
    inactiveTextStyle: "text-green-700 tracking-widest",
  },
};

export const CustomUnderline: Story = {
  args: {
    variant: "underline",
    tabs: basicTabs,
    defaultValue: "team",
    activeTabStyle: "border-purple-500",
    inactiveTabStyle: "border-transparent",
    activeTextStyle: "text-purple-600 font-bold",
    inactiveTextStyle: "text-gray-400",
  },
};

export const CustomOrange: Story = {
  args: {
    variant: "filled",
    tabs: basicTabs,
    defaultValue: "details",
    activeTabStyle: "bg-orange-500 rounded-full",
    inactiveTabStyle: "bg-orange-100 rounded-full",
    activeTextStyle: "text-white font-bold",
    inactiveTextStyle: "text-orange-600",
  },
};

// -------------------
// Icon Tabs
// -------------------

// export const IconTabs: Story = {
//   args: {
//     variant: "icon",
//     tabs: [
//       { label: "Orders", value: "orders", icon: <PostsIcon width={18} height={18} /> },
//       { label: "Team", value: "team", icon: <PostsIcon width={18} height={18} /> },
//     ],
//     defaultValue: "posts",



//   },
//   // parameters: {
//   //   docs: {
//   //     source: { type: 'code', transform: () => null }, // Prevents rendering complex JSX in source blocks
//   //   },
//   // },
// };

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
          icon: <PostsIcon width={18} height={18} />,
        },
        {
          label: "Saved Posts",
          value: "saved",
          icon: <BookmarkIcon width={18} height={18} />,
        },
      ]}
      defaultValue="saved"
      activeTabStyle="border-blue-500"
      inactiveTabStyle="border-gray-300"
      activeTextStyle="text-blue-600 font-bold"
      inactiveTextStyle="text-gray-400"
    />
  ),
};

// -------------------
// Minimal Override
// -------------------

export const MinimalOverride: Story = {
  args: {
    variant: "underline",
    tabs: basicTabs,
    defaultValue: "products",
    activeTextStyle: "text-blue-600 font-extrabold",
  },
};

// -------------------
// No Customization
// -------------------

export const Default: Story = {
  args: {
    variant: "filled",
    tabs: basicTabs,
  },
};
