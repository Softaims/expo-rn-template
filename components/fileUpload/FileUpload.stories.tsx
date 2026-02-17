import { View } from "react-native";
import { Meta, StoryObj } from "@storybook/react-native";
import { FileUpload } from "./FileUpload";

const meta = {
  title: "FileUpload/FileUpload",
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
    files: [],
    uploadAreaTitle: "Tap to select file",
    uploadAreaSubtitle: "Max file size 5MB allowed",
    onUploadAreaPress: () => console.log("Upload area pressed"),
  },
};

// STATE 2: File Uploading with Progress
export const UploadingProgress: Story = {
  args: {
    files: [
      {
        id: "1",
        name: "BS40-National insurance number-4001",
        size: 122880, // 120 KB
        type: "document",
        uploadProgress: 50, // This triggers uploading state
      },
    ],
    onRemoveFile: (id) => console.log("Cancel upload:", id),
  },
};

// STATE 4: File Uploaded (Complete)
export const Uploaded: Story = {
  args: {
    files: [
      {
        id: "1",
        name: "BS40-National insurance number-4001",
        size: 122880,
        type: "document",
        // No uploadProgress means it's completed
      },
    ],
    onRemoveFile: (id) => console.log("Remove file:", id),
  },
};
