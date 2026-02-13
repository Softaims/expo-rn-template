import { View, Pressable } from "react-native";
import Modal from "react-native-modal";
import { Text } from "@/components/text";

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
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection={["down"]}
      style={{ justifyContent: "flex-end", margin: 0 }}
      backdropOpacity={0.4}
      backdropColor="#000"
      animationIn="slideInUp"
      animationOut="slideOutDown"
      useNativeDriver
    >
      <View className="px-4 pb-8">
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
      </View>
    </Modal>
  );
}
