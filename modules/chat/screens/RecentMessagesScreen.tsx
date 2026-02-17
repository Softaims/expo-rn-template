import { FlatList, Pressable, View } from "react-native"
import { UserMessageCardProps } from "../types"
import { UserMessageCard } from "../components/UserMessageCard"
import { HeaderBackButton, TextInput } from "@/components"
import { useLayoutEffect, useState } from "react"
import { router } from "expo-router"
import { useNavigation } from "expo-router";
import { AltArrowLeftIcon } from "@/assets/icons/AltArrowLeftIcon"


const users: UserMessageCardProps[] = [
    {
        user: {
            id: "1",
            name: "John Doe",
            avatar: "https://www.cnet.com/a/img/resize/0e9874cc9d6b18489f832793796d285141496106/hub/2021/10/16/11804578-0dbc-42af-bcd1-3bc7b1394962/the-batman-2022-teaser-poster-batman-01-promo.jpg?auto=webp&fit=bounds&height=900&precrop=1881,1411,x423,y0&width=1200",
        },
        message: "Hello, how are you?",
        createdAt: new Date(),
        unreadMessagesCount: 0,
        onPress: () => { },
    },
    {
        user: {
            id: "2",
            name: "Jane Doe",
            avatar: "https://www.cnet.com/a/img/resize/0e9874cc9d6b18489f832793796d285141496106/hub/2021/10/16/11804578-0dbc-42af-bcd1-3bc7b1394962/the-batman-2022-teaser-poster-batman-01-promo.jpg?auto=webp&fit=bounds&height=900&precrop=1881,1411,x423,y0&width=1200",
        },
        message: "Hello, how are you?",
        createdAt: new Date(),
        unreadMessagesCount: 0,
        onPress: () => { },
    },
]

export const RecentMessagesScreen = () => {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState("")

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "Chats",
            headerStyle: {
                backgroundColor: "white",
            },
            headerShadowVisible: false,
            headerLeft: () => <HeaderBackButton onPress={() => router.back()} />,
        })
    }, [navigation])

    const renderItem = ({ item }: { item: UserMessageCardProps }) => {
        return <UserMessageCard {...item} onPress={() => { }} />
    }

    return (
        <View className="px-[16px] pt-[16px] bg-white flex-1">
            <TextInput
                type="search"
                placeholder="Search"
                value={searchQuery}
                onChangeText={setSearchQuery}
                inputContainerStyles="mb-[16px]"
            />
            <FlatList
                data={users}
                renderItem={renderItem}
                contentContainerClassName="gap-[16px]"
            />
        </View>
    )
}