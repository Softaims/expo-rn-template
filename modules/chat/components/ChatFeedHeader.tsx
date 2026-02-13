import { AltArrowLeftIcon, MenuDotsVerticalIcon } from "@/assets/icons";
import { FloatingActionMenu, MenuOption } from "@/components/floatingMenu";
import { Text } from "@/components/text";
import { useState } from "react";
import { Image, Pressable, View } from "react-native";
import { ChatFeedHeaderProps } from "../types";

export const ChatFeedHeader = (props: ChatFeedHeaderProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuOptions: MenuOption[] = [
        { label: "Block User", onPress: props?.onBlockUser },
        { label: "Report User", onPress: props?.onReportUser },
        { label: "Clear Chat", onPress: props?.onClearChat, destructive: true },
    ];

    return (
        <View className="flex-row items-center justify-between px-[16px] py-[12px]">
            <View className="flex-row items-center gap-5">
                <Pressable onPress={props?.onPressBack}>
                    <AltArrowLeftIcon />
                </Pressable>
                <Pressable onPress={props?.onPressProfile} className="flex-row items-center gap-2">
                    <Image source={{ uri: props?.avatar || '' }} className="w-[40px] h-[40px] rounded-full" />
                    <View>
                        <Text variant="subheading4" className="text-primary">{props?.name}</Text>
                        <Text variant="bodyText2" className="text-secondary">@{props?.userName}</Text>
                    </View>
                </Pressable>
            </View>
            <FloatingActionMenu
                isOpen={isMenuOpen}
                onToggle={() => setIsMenuOpen(prev => !prev)}
                options={menuOptions}
                trigger={
                    <View className="h-[40px] w-[40px] items-center justify-center bg-input rounded-full">
                        <MenuDotsVerticalIcon />
                    </View>
                }
            />
        </View>
    );
};