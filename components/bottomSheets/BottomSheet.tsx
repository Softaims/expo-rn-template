import React, { useCallback, useEffect, useRef } from 'react';
import { Image, ImageSourcePropType, StyleProp, View, ViewStyle } from 'react-native';
import {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetBackdrop,
    BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import { Text } from '../text';
import { Button } from '../buttons';
import { cn } from '@/lib/utils';

const IMAGES = {
    'check': require('../../assets/images/check.png'),
}

interface BottomSheetProps {
    children?: React.ReactNode;
    isVisible: boolean;
    backDropColor?: string;

    image?: keyof typeof IMAGES;
    customImage?: ImageSourcePropType;
    imageStyles?: string;

    title?: string;
    titleStyles?: string;
    description?: string;
    descriptionStyles?: string;
    buttonTitle?: string;
    buttonTitleStyles?: string;
    buttonStyles?: string;

    sheetContainerStyles?: StyleProp<ViewStyle>;
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

export const BottomSheet = ({ children, isVisible, image = 'check', customImage, imageStyles, title, titleStyles, description, descriptionStyles, buttonTitle, buttonTitleStyles, buttonStyles, sheetContainerStyles, sheetContentContainerStyles, backgroundStyle, setIsVisible, onOpen, onClose, onConfirm, onCancel, onBackdropPress, backDropStyles, enableBackdropDismiss = true, enablePanDownToClose = false }
    : BottomSheetProps) => {
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

    const handleSheetChanges = useCallback((index: number) => {
        if (index === -1) {
            handleDismiss();
        }
    }, [bottomSheetModalRef]);

    const handleConfirm = useCallback(() => {
        onConfirm?.();
        handleDismiss();
    }, [onConfirm, handleDismiss]);

    const handleCancel = useCallback(() => {
        onCancel?.();
        handleDismiss();
    }, [onCancel, handleDismiss]);

    const renderBackdrop = useCallback((props: BottomSheetBackdropProps) => {
        return (
            <BottomSheetBackdrop
                {...props}
                appearsOnIndex={0}
                disappearsOnIndex={-1}
                pressBehavior={enableBackdropDismiss ? "close" : "none"}
                onPress={onBackdropPress}
                style={backDropStyles}
            />
        )
    }, [onBackdropPress, backDropStyles, enableBackdropDismiss]);

    return (
        <BottomSheetModal
            ref={bottomSheetModalRef}
            onChange={handleSheetChanges}
            style={[sheetContainerStyles]}
            backgroundStyle={backgroundStyle}
            backdropComponent={renderBackdrop}
            enablePanDownToClose={enablePanDownToClose}
        >
            <BottomSheetView>
                <View className={cn("p-[16px] pb-[32px]", sheetContentContainerStyles)} >
                    {
                        children ?
                            children :
                            <>
                                <Image source={customImage || IMAGES[image]} className={cn("w-[120px] h-[120px] object-contain self-center mb-[15px]", imageStyles)} />
                                {title && <Text variant="heading3" className={cn('text-center mb-[10px]', titleStyles)}>{title}</Text>}
                                {description && <Text variant="bodyText2" className={cn('text-secondary text-center mb-[34px]', descriptionStyles)}>{description}</Text>}
                                <Button
                                    title={buttonTitle || 'DEFAULT'}
                                    onPress={handleConfirm}
                                    containerStyles={cn(buttonStyles)}
                                    textStyles={cn(buttonTitleStyles)}
                                />
                            </>
                    }
                </View>
            </BottomSheetView>
        </BottomSheetModal>
    );
};