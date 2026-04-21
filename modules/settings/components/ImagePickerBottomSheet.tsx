import { View, Pressable } from "react-native";
import { Text } from "@/components/text";
import { BottomSheet } from "@/components/bottomSheets";
import { useTheme } from "@/lib/theme";
import { typography } from "@/lib/theme/fonts";
import { imagePickerSheetStyles as styles } from "./ImagePickerBottomSheet.styles";

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
  const { colors } = useTheme();

  const handleTakePhoto = () => {
    onTakePhoto();
    onClose();
  };

  const handleUploadFromGallery = () => {
    onUploadFromGallery();
    onClose();
  };

  const optionText = {
    ...typography.textVariants.bodyText1,
    color: colors.text,
    fontFamily: typography.bodyBold.fontFamily,
  };

  return (
    <BottomSheet
      isVisible={isVisible}
      setIsVisible={(v) => !v && onClose()}
      enablePanDownToClose
      enableBackdropDismiss
      backgroundStyle={{ backgroundColor: "transparent" }}
    >
      <View style={[styles.card, { backgroundColor: colors.input }]}>
        <Pressable
          onPress={handleTakePhoto}
          style={({ pressed }) => [
            styles.option,
            pressed && { backgroundColor: colors.muted },
          ]}
        >
          <Text style={optionText}>Take Photo</Text>
        </Pressable>

        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        <Pressable
          onPress={handleUploadFromGallery}
          style={({ pressed }) => [
            styles.option,
            pressed && { backgroundColor: colors.muted },
          ]}
        >
          <Text style={optionText}>Upload From Gallery</Text>
        </Pressable>
      </View>

      <Pressable
        onPress={onClose}
        style={({ pressed }) => [
          styles.cancelOuter,
          { backgroundColor: colors.input },
          pressed && { backgroundColor: colors.muted },
        ]}
      >
        <Text
          style={[
            typography.textVariants.bodyText1,
            { color: colors.destructive, fontFamily: typography.bodyBold.fontFamily },
          ]}
        >
          Cancel
        </Text>
      </Pressable>
    </BottomSheet>
  );
}
