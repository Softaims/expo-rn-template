import { useState } from "react";
import { useRoutingUtils } from "@/lib/routingUtils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { showSuccessAlert } from "@/components/alerts";
import { editProfileSchema, EditProfileFormData } from "@/modules/settings/schemas";

type PickerVariant = "bottomSheet" | "floatingMenu";

export function useEditProfileScreen() {
  const { back } = useRoutingUtils();
  const [variant] = useState<PickerVariant>("bottomSheet");
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

  const handleAvatarPress = () => {
    if (variant === "bottomSheet") {
      setIsBottomSheetVisible(true);
    } else {
      setIsFloatingMenuVisible((prev) => !prev);
    }
  };

  const handleUpdateProfile = (data: EditProfileFormData) => {
    console.log("Profile data:", data);
    showSuccessAlert({
      title: "Profile Updated",
      message: "Your profile has been updated successfully.",
      buttonText: "OK",
      onPress: () => back(),
    });
  };

  return {
    control,
    handleSubmit,
    errors,
    variant,
    isBottomSheetVisible,
    setIsBottomSheetVisible,
    isFloatingMenuVisible,
    setIsFloatingMenuVisible,
    handleAvatarPress,
    handleUpdateProfile,
  };
}
