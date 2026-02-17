import { View } from "react-native";
import { Meta, StoryObj } from "@storybook/react-native";
import { Accordion } from "./Accordion";
import { ChevronDownIcon, ChevronRightIcon } from "@/assets/icons";

const meta = {
  title: "Components/Accordion",
  component: Accordion,
  decorators: [
    (Story) => (
      <View style={{ padding: 16, backgroundColor: "#fff" }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

const sampleItems = [
  {
    id: "1",
    title: "What image formats are supported?",
    content:
      "We support jpg, png, and tiff formats. For accurate analysis, please upload high-resolution images.",
  },
  {
    id: "2",
    title: "Who can use pocket coach mobile app",
    content:
      "Anyone with a smartphone can download and use our app. It's available on both iOS and Android platforms.",
  },
  {
    id: "3",
    title: "Is my data secure?",
    content:
      "Yes, we use industry-standard encryption and security measures to protect your data. Your privacy is our top priority.",
  },
  {
    id: "4",
    title: "Can I use my own videos?",
    content:
      "Absolutely! You can upload your own videos for analysis. Our AI will process them and provide detailed feedback.",
  },
];

export const Default: Story = {
  args: {
    items: sampleItems,
  },
};

export const SingleOpenDefault: Story = {
  args: {
    items: sampleItems,
    defaultOpenIds: ["2"],
  },
};

export const AllowMultiple: Story = {
  args: {
    items: sampleItems,
    allowMultiple: true,
    defaultOpenIds: ["1", "3"],
  },
};

export const CustomIcons: Story = {
  args: {
    items: sampleItems,
  },
  render: (args) => (
    <Accordion
      {...args}
      openIcon={<ChevronDownIcon width={20} height={20} color="#000" />}
      closedIcon={<ChevronRightIcon width={20} height={20} stroke="#000" />}
    />
  ),
};

export const CustomStyles: Story = {
  args: {
    items: sampleItems,
    itemContainerStyles: "bg-gray-50 mb-2 rounded-lg px-4",
    headerStyles: "py-5",
    titleStyles: "text-lg font-bold text-primary",
    contentStyles: "text-base text-gray-700",
  },
};
