import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

export function useImagePicker() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isPermissionSheetVisible, setIsPermissionSheetVisible] = useState(false);
  const [pendingAction, setPendingAction] = useState<"camera" | "gallery" | null>(null);

  const launchCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const launchGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleImagePicker = async (action: "camera" | "gallery") => {
    if (action === "camera") {
      const { status } = await ImagePicker.getCameraPermissionsAsync();
      if (status !== "granted") {
        setPendingAction("camera");
        setIsPermissionSheetVisible(true);
        return;
      }
      await launchCamera();
    } else {
      const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        setPendingAction("gallery");
        setIsPermissionSheetVisible(true);
        return;
      }
      await launchGallery();
    }
  };

  const handlePermissionContinue = async () => {
    setIsPermissionSheetVisible(false);
    if (pendingAction === "camera") {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status === "granted") {
        await launchCamera();
      }
    } else if (pendingAction === "gallery") {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      console.log("Gallery permission status:", status);
      if (status === "granted") {
        await launchGallery();
      }
    }
    setPendingAction(null);
  };

  return {
    selectedImage,
    isPermissionSheetVisible,
    setIsPermissionSheetVisible,
    pendingAction,
    handleImagePicker,
    handlePermissionContinue,
  };
}
