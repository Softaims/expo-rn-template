import { View, Pressable } from "react-native";
import { Text } from "@/components/text";
import { CameraIcon, ImageIcon } from "@/assets/icons";
import { cn } from "@/lib/utils";

export interface ImagePickerFloatingMenuProps {
  onTakePhoto: () => void;
  onUploadFromGallery: () => void;
  containerStyles?: string;
}

export function ImagePickerFloatingMenu({
  onTakePhoto,
  onUploadFromGallery,
  containerStyles,
}: ImagePickerFloatingMenuProps) {
  return (
    <View
      className={cn(
        "bg-white rounded-lg shadow-lg border border-gray-200 py-2",
        containerStyles
      )}
    >
      <Pressable
        onPress={onTakePhoto}
        className="flex-row items-center px-4 py-3 active:bg-gray-50"
      >
        <ImageIcon width={20} height={20} color="#000" />
        <Text className="ml-3 text-base text-foreground">Take Photo</Text>
      </Pressable>

      <View className="h-[1px] bg-gray-200 mx-4" />

      <Pressable
        onPress={onUploadFromGallery}
        className="flex-row items-center px-4 py-3 active:bg-gray-50"
      >
        <ImageIcon width={20} height={20} color="#000" />
        <Text className="ml-3 text-base text-foreground">Upload from Gallery</Text>
      </Pressable>
    </View>
  );
}
