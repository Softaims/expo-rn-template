import { FlatList, Pressable, View } from "react-native"
import { TextInput } from "../inputs";
import { cn } from "@/lib/utils";
import { Text } from "../text";

export interface ListSelectorItem {
    id: string;
    label: string;
    value: string;
    icon?: React.ReactNode;
}

export interface ListSelectorProps {
    singleSelect?: boolean;
    items: ListSelectorItem[];
    selectedItems: any[];
    setSelectedItems: (item: any) => void;
    containerStyles?: string;

    searchEnabled?: boolean;
    searchPlaceholder?: string;
    searchQuery?: string;
    searchQueryChange?: (query: string) => void;
    searchBarStyles?: string;

    slectedIcon?: React.ReactNode;
    unselectedIcon?: React.ReactNode;

    selectedItemStyles?: string;
    unselectedItemStyles?: string;
    itemTextStyles?: string;
}

export const ListSelector = (props: ListSelectorProps) => {

    const renderItem = ({ item }: { item: ListSelectorItem }) => {
        return (
            <Pressable>
                <View>
                    {item.icon && item.icon}
                    <Text>{item.label}</Text>
                </View>
                
            </Pressable>
        )
    }

    return (
        <View className={cn("border-[1.2px]", props.containerStyles)}>
            {
                props.searchEnabled &&
                <TextInput
                    type="search"
                    value={props.searchQuery}
                    onChangeText={(text) => props.searchQueryChange?.(text)}
                    placeholder={props.searchPlaceholder}
                    inputContainerStyles={props.searchBarStyles}
                />
            }
            <FlatList
                data={props.items}
                renderItem={renderItem}
            />
        </View>
    )
}