import { Image, View } from "react-native";
import { Text } from "@/components/text";
import { SwipeableRow } from "@/components/gestures";
import { formatDistanceToNow } from "date-fns";
import { UserMessageCardProps } from "../types";

export const UserMessageCard = (props: UserMessageCardProps) => {
    const isUnread = props?.unreadMessagesCount > 0;

    return (
        <SwipeableRow
            actions={props?.swipeActions}
            onPress={props?.onPress}
        >
            <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-2">
                    <Image
                        source={{ uri: props?.user?.avatar }}
                        className="w-[40px] h-[40px] rounded-full"
                    />
                    <View>
                        <Text variant="subheading4" className={"text-primary"}>{props?.user?.name}</Text>
                        <Text variant="bodyText2" className={isUnread ? "text-primary" : "text-secondary"}>{props?.message}</Text>
                    </View>
                </View>
                <View className="gap-[5px]">
                    <Text variant="bodyText2" className="text-secondary">{formatDistanceToNow(props?.createdAt)}</Text>
                    {
                        isUnread ?
                            <View className="self-end bg-primary rounded-full h-[20px] w-[20px] items-center justify-center">
                                <Text variant="bodyText2" className="text-primary-foreground">{props?.unreadMessagesCount}</Text>
                            </View>
                            : <View className="h-[20px] w-[20px]" />
                    }
                </View>
            </View>
        </SwipeableRow>
    );
};