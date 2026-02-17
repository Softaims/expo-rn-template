import { View } from "react-native";
import { Stack } from "expo-router";
import { Controller } from "react-hook-form";
import { TextInput } from "@/components/inputs";
import { Button } from "@/components/buttons/Button";
import {
  EditableAvatar,
  ImagePickerBottomSheet,
} from "@/modules/settings/components";
import {
  FloatingActionMenu,
  HeaderBackButton,
  PermissionSheet,
  ScreenWrapper,
} from "@/components";
import { CameraIcon, ImageIcon } from "@/assets/icons";
import { useEditProfileScreen } from "../hooks/useEditProfileScreen";
import { useImagePicker } from "../hooks/useImagePicker";

export function EditProfileScreen() {
  const {
    control,
    handleSubmit,
    errors,
    variant,
    isBottomSheetVisible,
    setIsBottomSheetVisible,
    isFloatingMenuVisible,
    handleAvatarPress,
    handleUpdateProfile,
  } = useEditProfileScreen();

  const {
    selectedImage,
    isPermissionSheetVisible,
    setIsPermissionSheetVisible,
    pendingAction,
    handleImagePicker,
    handlePermissionContinue,
  } = useImagePicker();

  return (
    <ScreenWrapper headerTransparent>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: "Edit Profile",
          headerLeft: () => <HeaderBackButton />,
        }}
      />

      <View className="flex-1 justify-between">
        <View>
          <View className="justify-center items-center">
            <FloatingActionMenu
              isOpen={isFloatingMenuVisible}
              onToggle={handleAvatarPress}
              options={[
                {
                  label: "Take Photo",
                  icon: <CameraIcon width={20} height={20} viewBox="0 0 47 42" />,
                  onPress: () => handleImagePicker("camera"),
                },
                {
                  label: "Upload from Gallery",
                  icon: <ImageIcon width={20} height={20} />,
                  onPress: () => handleImagePicker("gallery"),
                },
              ]}
              trigger={
                <EditableAvatar
                  avatarSource={
                    selectedImage ? { uri: selectedImage } : undefined
                  }
                />
              }
            />
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
        </View>

        <Button
          title="Update Username"
          variant="primary"
          size="lg"
          onPress={handleSubmit(handleUpdateProfile)}
          containerStyles="bg-foreground"
          textStyles="text-background"
        />
      </View>

      {variant === "bottomSheet" && (
        <ImagePickerBottomSheet
          isVisible={isBottomSheetVisible}
          onClose={() => setIsBottomSheetVisible(false)}
          onTakePhoto={() => handleImagePicker("camera")}
          onUploadFromGallery={() => handleImagePicker("gallery")}
        />
      )}

      <PermissionSheet
        isVisible={isPermissionSheetVisible}
        setIsVisible={setIsPermissionSheetVisible}
        type="camera"
        variant="modal-with-image"
        title={pendingAction === "gallery" ? "Photo Library Access" : undefined}
        description={
          pendingAction === "gallery"
            ? "We need access to your photo library to update your profile picture."
            : undefined
        }
        onContinue={handlePermissionContinue}
        onMaybeLater={() => setIsPermissionSheetVisible(false)}
      />
    </ScreenWrapper>
  );
}
