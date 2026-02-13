import { Image, Pressable, View } from "react-native";
import { Text } from "@/components/text";
import { formatDistanceToNow } from "date-fns";
import { NotificationCardProps } from "../types";

export const NotificationCard = (props: NotificationCardProps) => {

    const renderAvatar = () => {
        if (!props?.notification?.avatar) return null;
        return (
            <Pressable onPress={props?.notification?.onAvatarPress}>
                <Image source={{ uri: props?.notification?.avatar }} className="w-[40px] h-[40px] rounded-full" />
            </Pressable>
        )
    }

    const renderCenterContent = () => {
        return props.variant === 'primary' ? (
            <View className="gap-[4px]  ">
                <View className="flex-row items-center justify-between">
                    <Text variant="bodyText2" className="text-primary font-semibold">{props?.notification?.title}</Text>
                    <Text variant="bodyText3" className="text-secondary">{formatDistanceToNow(props?.notification?.createdAt)}</Text>
                </View>
                {props?.notification?.description && <Text variant="bodyText2" className="text-secondary max-w-[90%]"> {props?.notification?.description}</Text>}
            </View>
        ) : (
            <View className="gap-[10px] max-w-[82%]">
                <Text variant="bodyText2" className="text-primary">
                    <Text variant="bodyText2" className="text-primary">{props?.notification?.title}</Text>
                    {props?.notification?.description && <Text variant="bodyText2" className="text-secondary font-medium"> {props?.notification?.description}</Text>}
                    {props?.notification?.createdAt && <Text variant="bodyText2" className="text-secondary font-normal"> {formatDistanceToNow(props?.notification?.createdAt)}</Text>}
                </Text>
                {renderActionButtons()}
            </View>
        )
    }

    const renderPostPreview = () => {
        if (!props?.notification?.postPreviewUrl || props.variant === 'primary') return null;
        return (
            <Pressable onPress={props?.notification?.onPostPreviewPress}>
                <Image source={{ uri: props?.notification?.postPreviewUrl }} className="w-[40px] h-[40px] rounded-[10px]" />
            </Pressable>
        )
    }

    const renderActionButtons = () => {
        return (
            <View className="flex-row gap-[8px] flex-wrap">
                {props?.notification?.actionButtons?.map((button, index) => (
                    <Pressable key={index} onPress={button.onPress} className="flex-row items-center gap-[4px] bg-input rounded-[6px] px-[8px] py-[4px] border-[1px] border-border">
                        {button?.icon && button.icon}
                        <Text variant="bodyText2" className="text-primary">{button.title}</Text>
                    </Pressable>
                ))}
            </View>
        )
    }

    return (
        <Pressable onPress={props?.notification?.onNotificationPress} className="flex-row px-[16px] py-[12px]">
            <View className="flex-row gap-[8px] flex-1">
                {renderAvatar()}
                {renderCenterContent()}
            </View>
            {renderPostPreview()}
        </Pressable>
    );
};