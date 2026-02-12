import { View } from "react-native";
import { Text } from "@/components/text";
import { Button } from "@/components/buttons";
import { CheckIcon } from "@/assets/icons";
import { Alert, AlertButton } from "./Alert";

interface SuccessAlertOptions {
  title: string;
  message: string;
  buttonText: string;
  onPress?: () => void;
}

interface ErrorAlertOptions {
  title: string;
  message: string;
  buttonText?: string;
  onPress?: () => void;
}

export const showSuccessAlert = ({
  title,
  message,
  buttonText,
  onPress,
}: SuccessAlertOptions) => {
  Alert.custom(
    <View className="items-center">
      {/* Icon Container with double circle border */}
      <View className="mb-6">
        <View className="w-24 h-24 border-2 border-gray-200 rounded-full items-center justify-center">
          <View className="w-20 h-20 bg-black rounded-full items-center justify-center">
            <CheckIcon width={40} height={40} color="#FFFFFF" />
          </View>
        </View>
      </View>

      {/* Title */}
      <Text className="text-2xl font-bold text-center mb-3">
        {title}
      </Text>

      {/* Message */}
      <Text className="text-base text-gray-500 text-center mb-8 px-4">
        {message}
      </Text>

      {/* Button */}
      <Button
        variant="primary"
        size="lg"
        title={buttonText}
        onPress={() => {
          Alert.dismiss();
          onPress?.();
        }}
        containerStyles="w-full rounded-2xl"
        innerWrapperStyles="w-full justify-center"
      />
    </View>,
    {
      animationIn: "zoomIn",
      animationOut: "zoomOut",
      containerStyles: "px-6 py-8",
    }
  );
};

export const showErrorAlert = ({
  title,
  message,
  buttonText = "OK",
  onPress,
}: ErrorAlertOptions) => {
  const buttons: AlertButton[] = [
    {
      text: buttonText,
      onPress,
      variant: "primary",
    },
  ];

  Alert.alert(title, message, buttons, {
    animationIn: "zoomIn",
    animationOut: "zoomOut",
  });
};

export const showConfirmAlert = (
  title: string,
  message: string,
  onConfirm?: () => void,
  onCancel?: () => void
) => {
  const buttons: AlertButton[] = [
    {
      text: "Cancel",
      variant: "secondary",
      onPress: onCancel,
    },
    {
      text: "Confirm",
      onPress: onConfirm,
      variant: "primary",
    },
  ];

  Alert.alert(title, message, buttons, {
    animationIn: "zoomIn",
    animationOut: "zoomOut",
  });
};
