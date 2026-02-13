import { FlatList, FlatListProps, StyleSheet, View } from "react-native"
import { NotificationCard } from "./NotificationCard"
import { Notification } from "../types";
import { Text } from "@/components";
import { format } from "date-fns";

export interface NotificationFeedProps {
    variant: 'primary' | 'secondary';
    notifications: Notification[];
    listProps?: FlatListProps<Notification>;
    groupByDates?: boolean; // group by today and previos each month
}

export const NotificationFeed = (props: NotificationFeedProps) => {

    const renderItem = ({ item }: { item: Notification }) => {
        return <NotificationCard notification={item} variant={props.variant} />
    }

    return (
        <View>
            <FlatList
                data={props.notifications}
                renderItem={renderItem}
                contentContainerStyle={styles[`${props.variant}List`]}
                {...props.listProps}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    primaryList: {
        backgroundColor: '#F5F5F5',
    },
    secondaryList: {

    },
})