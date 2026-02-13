import { View, ScrollView} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ScreenHeader } from "@/components/headers";
import { TextInput } from "@/components/inputs";
import { Button } from "@/components/buttons/Button";
import { Text } from "@/components/text";
import {
  EditableAvatar,
  ImagePickerBottomSheet,
  ImagePickerFloatingMenu,
} from "@/modules/settings/components";
import { showSuccessAlert } from "@/components/alerts";
import { editProfileSchema, EditProfileFormData } from "@/modules/settings/schemas";

type PickerVariant = "bottomSheet" | "floatingMenu";

export function EditProfileScreen() {
  const router = useRouter();
  const [variant, setVariant] = useState<PickerVariant>("bottomSheet");
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [isFloatingMenuVisible, setIsFloatingMenuVisible] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      username: "",
    },
  });

  const handleImagePicker = (action: "camera" | "gallery") => {
    console.log(action);
    setIsBottomSheetVisible(false);
    setIsFloatingMenuVisible(false);
  };

  const handleAvatarPress = () => {
    if (variant === "bottomSheet") {
      setIsBottomSheetVisible(true);
    } else {
      setIsFloatingMenuVisible(!isFloatingMenuVisible);
    }
  };

  const handleUpdateProfile = (data: EditProfileFormData) => {
    console.log("Profile data:", data);
    showSuccessAlert({
      title: "Profile Updated",
      message: "Your profile has been updated successfully.",
      buttonText: "OK",
      onPress: () => router.back(),
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScreenHeader title="Edit Profile" onBackPress={() => router.back()} />

      <ScrollView className="flex-1 px-4" contentContainerStyle={{ paddingVertical: 24 }}>
        <View className="items-center mb-8">
          <View className="relative">
            <Controller
              control={control}
              name="username"
              render={({ field: { value } }) => (
                <EditableAvatar name={value || "S"} onEditPress={handleAvatarPress} />
              )}
            />

            {variant === "floatingMenu" && isFloatingMenuVisible && (
              <View className="absolute top-0 z-10">
                <ImagePickerFloatingMenu
                  onTakePhoto={() => handleImagePicker("camera")}
                  onUploadFromGallery={() => handleImagePicker("gallery")}
                />
              </View>
            )}
          </View>
        </View>

        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Username"
              placeholder="Enter Username"
              value={value}
              onChangeText={onChange}
              leftIcon={null}
              inputContainerStyles="bg-background"
              errorMessage={errors.username?.message}
            />
          )}
        />
      </ScrollView>

      <View className="px-4 pb-4">
        <Button
          title="Update Username"
          variant="primary"
          size="lg"
          onPress={handleSubmit(handleUpdateProfile)}
          containerStyles="bg-foreground"
          textStyles="text-background"
        />
      </View>

      <ImagePickerBottomSheet
        isVisible={isBottomSheetVisible}
        onClose={() => setIsBottomSheetVisible(false)}
        onTakePhoto={() => handleImagePicker("camera")}
        onUploadFromGallery={() => handleImagePicker("gallery")}
      />
    </SafeAreaView>
  );
}
