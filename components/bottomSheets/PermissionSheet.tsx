import { Image, View } from "react-native";
import { BottomSheet } from "./BottomSheet";
import { Text } from "../text";
import { useMemo } from "react";
import { Button } from "../buttons";
import { CameraIcon, MicrophoneIcon } from "@/assets/icons";
import { cn } from "@/lib/utils";

const BANNERS = {
    'location': require('../../assets/images/location-permission-banner.png'),
    'camera': require('../../assets/images/camera-permission-banner.png'),
    'microphone': require('../../assets/images/microphone-permission-banner.png'),
    'notification': require('../../assets/images/notification-permission-banner.png'),
}

const ICONS = {
    'location': <MicrophoneIcon />,
    'camera': <CameraIcon />,
    'microphone': <MicrophoneIcon />,
    'notification': <MicrophoneIcon />,
}

interface PermissionSheetProps {
    isVisible: boolean;
    setIsVisible: (isVisible: boolean) => void;

    type: 'location' | 'camera' | 'microphone' | 'notification';
    variant: 'modal' | 'modal-with-image' | 'popup';

    title?: string;
    description?: string;
    subText?: string;
    titleStyles?: string;
    descriptionStyles?: string;
    subTextStyles?: string;
    imageStyles?: string;

    permissionButtonTitle?: string;
    maybeLaterButtonTitle?: string;

    onContinue?: () => void;
    onMaybeLater?: () => void;
}

const variantStyles = {
    base: {
        title: 'text-center mb-[10px]',
        description: 'text-center color-secondary mb-[16px]',
        image: "w-full h-[187px] rounded-[10px] object-contain mb-[12px]",
        subText: 'text-left color-secondary',
    },
    'modal-with-image': {
        title: 'text-left',
        description: 'text-left',
    },
    'modal': {
        title: 'text-center',
        description: 'text-center',
    },
    'popup': {
        title: 'text-center',
        description: 'text-center',
    },
}

export function PermissionSheet({ isVisible, setIsVisible, type, variant, title, titleStyles, description, descriptionStyles, subText, subTextStyles, imageStyles, permissionButtonTitle, maybeLaterButtonTitle, onContinue, onMaybeLater }: PermissionSheetProps) {

    const renderTitle = useMemo(() => {
        switch (type) {
            case 'location':
                return title || 'Allow Location Access';
            case 'camera':
                return title || 'Camera Permission';
            case 'microphone':
                return title || 'Microphone Permission';
            case 'notification':
                return title || 'Turn on Notifications';
        }
    }, [type]);

    const renderDescription = useMemo(() => {
        switch (type) {
            case 'location':
                return description || 'We only use your location to show you near by offers.';
            case 'camera':
                return description || 'We need camera and microphone access to record your videos.';
            case 'microphone':
                return description || 'Enable microphone access to record voice, make calls, and interact.';
            case 'notification':
                return description || 'Get notified about new deals near you,  only when it matters.';
        }
    }, [type]);

    const renderSubText = useMemo(() => {
        return subText || 'You can change this anytime in settings.';
    }, [subText]);

    return (
        <BottomSheet isVisible={isVisible} setIsVisible={setIsVisible}>
            <View className="">
                {variant !== 'modal-with-image' && <View className="mb-[12px] self-center">{ICONS[type]}</View>}
                <Text variant="heading3" className={cn(variantStyles.base.title, variantStyles[variant].title, titleStyles)}>{renderTitle}</Text>
                <Text variant="bodyText2" className={cn(variantStyles.base.description, variantStyles[variant].description, descriptionStyles)}>{renderDescription}</Text>
                {variant === 'modal-with-image' && <Image source={BANNERS[type]} className={cn(variantStyles.base.image, imageStyles)} />}
                {variant === 'modal-with-image' && <Text variant="bodyText2" className={cn(variantStyles.base.subText, subTextStyles)}>{renderSubText}</Text>}
                <View className="h-[100px]" />
                <View>
                    <Button title={permissionButtonTitle || 'Continue'} size="lg" containerStyles="mb-[6px]" onPress={onContinue} />
                    <Button title={maybeLaterButtonTitle || 'Maybe Later'} variant="text" onPress={onMaybeLater} />
                </View>
            </View>
        </BottomSheet>
    )
}