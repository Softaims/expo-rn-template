import { View } from "react-native";
import { Meta, StoryObj } from "@storybook/react-native";
import { FileUpload } from "./FileUpload";

const meta = {
  component: FileUpload,
  decorators: [
    (Story) => (
      <View style={{ padding: 20 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof FileUpload>;

export default meta;

type Story = StoryObj<typeof meta>;

// -------------------
// MAIN STATES
// -------------------

// STATE 1: Empty - Upload Area Only
export const Empty: Story = {
  args: {
    maxFiles: 5,
    files: [],
    onUploadAreaPress: () => console.log("Upload area pressed"),
  },
};

export const UploadingProgress: Story = {
  args: {
    maxFiles: 5,
    files: [
      {
        id: "1",
        name: "Large-Document.pdf",
        size: 5024000,
        type: "document",
      },
      {
        id: "2",
        name: "Photo.jpg",
        size: 3048000,
        type: "image",
        uri: "https://picsum.photos/200/200",
      },
    ],
    uploading: true,
    uploadProgress: 45,
  },
};


export const MixedFileTypes: Story = {
  args: {
    maxFiles: 10,
    files: [
      {
        id: "1",
        name: "Contract.pdf",
        size: 1234567,
        type: "document",
      },
      {
        id: "2",
        name: "Photo-1.jpg",
        size: 2048000,
        type: "image",
        uri: "https://picsum.photos/200/201",
      },
      {
        id: "3",
        name: "Spreadsheet.xlsx",
        size: 567890,
        type: "document",
      },
    ],
    onUploadAreaPress: () => console.log("Upload area pressed"),
    onRemoveFile: (id) => console.log("Remove file:", id),
    onUploadPress: () => console.log("Upload pressed"),
  },
};
