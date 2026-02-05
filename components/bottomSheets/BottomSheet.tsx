import React, { useCallback, useEffect, useRef } from 'react';
import { Image, TouchableWithoutFeedback, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { Text } from '../text';
import { Button } from '..';

const IMAGES = {
    'check': require('../../assets/images/check.png'),
}

interface BottomSheetProps {
    children?: React.ReactNode;
    isVisible: boolean;
    image?: keyof typeof IMAGES;
    title?: string;
    description?: string;
    buttonTitle?: string;
    setIsVisible: (isVisible: boolean) => void;
    onOpen?: () => void;
    onClose?: () => void;
    onConfirm?: () => void;
    onCancel?: () => void;
}

export const BottomSheet = ({ children, isVisible, image = 'check', title, description, buttonTitle, setIsVisible, onOpen, onClose, onConfirm, onCancel }: BottomSheetProps) => {
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

    return (
        <TouchableWithoutFeedback onPress={handleDismiss} >
            <GestureHandlerRootView className="" >
                <BottomSheetModalProvider>
                    <BottomSheetModal
                        ref={bottomSheetModalRef}
                        onChange={handleSheetChanges}
                    >
                        <BottomSheetView>
                            <View className='p-[16px] pb-[32px]'>
                                {
                                    children ?
                                        children :
                                        <>
                                            <Image source={IMAGES[image]} className="w-[120px] h-[120px] object-contain self-center mb-[15px]" />
                                            {title && <Text variant="heading3" className='text-center mb-[10px]'>{title}</Text>}
                                            {description && <Text variant="bodyText2" className='text-secondary text-center mb-[34px]'>{description}</Text>}
                                            <Button
                                                title={buttonTitle || 'DEFAULT'}
                                                onPress={handleConfirm}
                                            />
                                        </>
                                }
                            </View>
                        </BottomSheetView>
                    </BottomSheetModal>
                </BottomSheetModalProvider>
            </GestureHandlerRootView>
        </TouchableWithoutFeedback>
    );
};