import React, { useCallback, useEffect, useRef } from "react";
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import { useTheme } from "@/lib/theme";
import { Text } from "../text";
import { Button } from "../buttons";
import { bottomSheetStyles as styles } from "./BottomSheet.styles";

const IMAGES = {
  check: require("../../assets/images/check.png"),
};

interface BottomSheetProps {
  children?: React.ReactNode;
  isVisible: boolean;
  backDropColor?: string;

  image?: keyof typeof IMAGES;
  customImage?: ImageSourcePropType;
  imageStyle?: StyleProp<ImageStyle>;

  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  description?: string;
  descriptionStyle?: StyleProp<TextStyle>;
  buttonTitle?: string;
  buttonTitleStyle?: StyleProp<TextStyle>;
  buttonStyle?: StyleProp<ViewStyle>;

  sheetContainerStyles?: StyleProp<ViewStyle>;
  sheetContentContainerStyle?: StyleProp<ViewStyle>;
  /** Optional NativeWind classes on the sheet content wrapper — adopters only. */
  sheetContentContainerStyles?: string;
  backgroundStyle?: StyleProp<ViewStyle>;

  setIsVisible: (isVisible: boolean) => void;
  onOpen?: () => void;
  onClose?: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
  onBackdropPress?: () => void;
  backDropStyles?: StyleProp<ViewStyle>;
  enableBackdropDismiss?: boolean;
  enablePanDownToClose?: boolean;
}

export const BottomSheet = ({
  children,
  isVisible,
  image = "check",
  customImage,
  imageStyle,
  title,
  titleStyle,
  description,
  descriptionStyle,
  buttonTitle,
  buttonTitleStyle,
  buttonStyle,
  sheetContainerStyles,
  sheetContentContainerStyle,
  sheetContentContainerStyles,
  backgroundStyle,
  setIsVisible,
  onOpen,
  onClose,
  onConfirm,
  onCancel,
  onBackdropPress,
  backDropStyles,
  enableBackdropDismiss = true,
  enablePanDownToClose = false,
}: BottomSheetProps) => {
  const { colors } = useTheme();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    if (isVisible) {
      bottomSheetModalRef.current?.present();
      onOpen?.();
    } else {
      bottomSheetModalRef.current?.dismiss();
      onClose?.();
    }
  }, [isVisible]);

  const handleDismiss = useCallback(() => {
    setIsVisible(false);
  }, [setIsVisible]);

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        handleDismiss();
      }
    },
    [handleDismiss]
  );

  const handleConfirm = useCallback(() => {
    onConfirm?.();
    handleDismiss();
  }, [onConfirm, handleDismiss]);

  const handleCancel = useCallback(() => {
    onCancel?.();
    handleDismiss();
  }, [onCancel, handleDismiss]);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => {
      return (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          pressBehavior={enableBackdropDismiss ? "close" : "none"}
          onPress={onBackdropPress}
          style={backDropStyles}
        />
      );
    },
    [onBackdropPress, backDropStyles, enableBackdropDismiss]
  );

  const contentStyle: StyleProp<ViewStyle> = [
    styles.content,
    sheetContentContainerStyle,
  ];

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      onChange={handleSheetChanges}
      style={sheetContainerStyles}
      backgroundStyle={backgroundStyle}
      backdropComponent={renderBackdrop}
      enablePanDownToClose={enablePanDownToClose}
    >
      <BottomSheetView>
        <View style={contentStyle} className={sheetContentContainerStyles}>
          {children ? (
            children
          ) : (
            <>
              <Image
                source={customImage || IMAGES[image]}
                style={[styles.defaultImage, imageStyle]}
              />
              {title && (
                <Text
                  variant="heading3"
                  style={[styles.title, { color: colors.text }, titleStyle]}
                >
                  {title}
                </Text>
              )}
              {description && (
                <Text
                  variant="bodyText2"
                  style={[
                    styles.description,
                    { color: colors.secondary },
                    descriptionStyle,
                  ]}
                >
                  {description}
                </Text>
              )}
              <Button
                title={buttonTitle || "DEFAULT"}
                onPress={handleConfirm}
                containerStyle={buttonStyle}
                textStyle={buttonTitleStyle}
              />
            </>
          )}
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};
