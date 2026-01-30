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
      <View style={{ padding: 16 }}>
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

// Variant 1: Underline
export const UnderlineDetails: Story = {
  args: {
    variant: "underline",
    tabs: basicTabs,
    defaultValue: "details",
    onValueChange: (value) => console.log("Tab changed to:", value),
  },
};

export const FilledDetails: Story = {
  args: {
    variant: "filled",
    tabs: basicTabs,
    defaultValue: "details",
    onValueChange: (value) => console.log("Tab changed to:", value),
  },
};

// export const FilledProducts: Story = {
//   args: {
//     variant: "filled",
//     tabs: basicTabs,
//     defaultValue: "products",
//     onValueChange: (value) => console.log("Tab changed to:", value),
//   },
// };

// export const FilledOrders: Story = {
//   args: {
//     variant: "filled",
//     tabs: basicTabs,
//     defaultValue: "orders",
//     onValueChange: (value) => console.log("Tab changed to:", value),
//   },
// };

// export const FilledTeam: Story = {
//   args: {
//     variant: "filled",
//     tabs: basicTabs,
//     defaultValue: "team",
//     onValueChange: (value) => console.log("Tab changed to:", value),
//   },
// };

// Variant 3: Filled Rounded
// export const FilledRoundedDetails: Story = {
//   args: {
//     variant: "filled-rounded",
//     tabs: basicTabs,
//     defaultValue: "details",
//     onValueChange: (value) => console.log("Tab changed to:", value),
//   },
// };

// export const FilledRoundedProducts: Story = {
//   args: {
//     variant: "filled-rounded",
//     tabs: basicTabs,
//     defaultValue: "products",
//     onValueChange: (value) => console.log("Tab changed to:", value),
//   },
// };

// export const FilledRoundedOrders: Story = {
//   args: {
//     variant: "filled-rounded",
//     tabs: basicTabs,
//     defaultValue: "orders",
//     onValueChange: (value) => console.log("Tab changed to:", value),
//   },
// };

// export const FilledRoundedTeam: Story = {
//   args: {
//     variant: "filled-rounded",
//     tabs: basicTabs,
//     defaultValue: "team",
//     onValueChange: (value) => console.log("Tab changed to:", value),
//   },
// };

// Variant 4: Pill
export const PillDetails: Story = {
  args: {
    variant: "pill",
    tabs: basicTabs,
    defaultValue: "details",
    onValueChange: (value) => console.log("Tab changed to:", value),
  },
};

// export const PillProducts: Story = {
//   args: {
//     variant: "pill",
//     tabs: basicTabs,
//     defaultValue: "products",
//     onValueChange: (value) => console.log("Tab changed to:", value),
//   },
// };

// export const PillOrders: Story = {
//   args: {
//     variant: "pill",
//     tabs: basicTabs,
//     defaultValue: "orders",
//     onValueChange: (value) => console.log("Tab changed to:", value),
//   },
// };

// export const PillTeam: Story = {
//   args: {
//     variant: "pill",
//     tabs: basicTabs,
//     defaultValue: "team",
//     onValueChange: (value) => console.log("Tab changed to:", value),
//   },
// };

// Variant 5: Icon Tabs
export const IconPosts: Story = {
  args: { variant: "icon", tabs: basicTabs, defaultValue: "posts" },
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
      defaultValue="posts"
      onValueChange={(value) => console.log("Tab changed to:", value)}
    />
  ),
};

export const IconSaved: Story = {
  args: { variant: "icon", tabs: basicTabs, defaultValue: "saved" },
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
      onValueChange={(value) => console.log("Tab changed to:", value)}
    />
  ),
};
