import { View, Pressable } from "react-native";
import { Text } from "@/components/text";
import { BottomSheet } from "@/components/bottomSheets";

export interface ImagePickerBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  onTakePhoto: () => void;
  onUploadFromGallery: () => void;
}

export function ImagePickerBottomSheet({
  isVisible,
  onClose,
  onTakePhoto,
  onUploadFromGallery,
}: ImagePickerBottomSheetProps) {
  const handleTakePhoto = () => {
    onTakePhoto();
    onClose();
  };

  const handleUploadFromGallery = () => {
    onUploadFromGallery();
    onClose();
  };

  return (
    <BottomSheet
      isVisible={isVisible}
      setIsVisible={(v) => !v && onClose()}
      enablePanDownToClose
      enableBackdropDismiss
      backgroundStyle={{ backgroundColor: "transparent" }}
    >
      <View className="bg-white rounded-2xl overflow-hidden">
        <Pressable
          onPress={handleTakePhoto}
          className="py-4 items-center active:bg-gray-50"
        >
          <Text className="text-base text-foreground font-medium">
            Take Photo
          </Text>
        </Pressable>

        <View className="h-[1px] bg-gray-200" />

        <Pressable
          onPress={handleUploadFromGallery}
          className="py-4 items-center active:bg-gray-50"
        >
          <Text className="text-base text-foreground font-medium">
            Upload From Gallery
          </Text>
        </Pressable>
      </View>

      <Pressable
        onPress={onClose}
        className="bg-white rounded-2xl py-4 items-center mt-3 active:bg-gray-50"
      >
        <Text className="text-base text-red-500 font-semibold">Cancel</Text>
      </Pressable>
    </BottomSheet>
  );
}
