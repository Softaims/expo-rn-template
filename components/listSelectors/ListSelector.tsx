import { FlatList, Image, Pressable, View } from "react-native"
import { TextInput } from "../inputs";
import { cn } from "@/lib/utils";
import { Text } from "../text";
import { Checkbox, RadioButton } from "..";

const listSelectorVariants = {
    listContainer: "",
    searchBar: "mb-[16px]",
    item: {
        base: "flex-row items-center justify-between bg-input p-[12px] border-[1px] rounded-[10px] border-border",
        textContainer: "flex-row items-center gap-[8px]",
        image: "w-[30px] h-[30px] rounded-full",
        text: "text-base",
        selected: "border-primary",
        unselected: "border-border",
        disabled: "bg-muted opacity-50",
    },
} as const;

export interface ListSelectorItem {
    id: string;
    label: string;
    value: string;
    imageUrl?: string;
}

export interface ListSelectorProps {
    singleSelect: boolean;
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
    itemImageStyles?: string;
}

export const ListSelector = (props: ListSelectorProps) => {

    const renderItem = ({ item }: { item: ListSelectorItem }) => {
        const isSelected = props.selectedItems.includes(item.id);
        return (
            <Pressable
                className={cn(
                    listSelectorVariants.item.base,
                    isSelected ? listSelectorVariants.item.selected : listSelectorVariants.item.unselected,
                    isSelected ? props.selectedItemStyles : props.unselectedItemStyles,
                )}
                onPress={
                    props.singleSelect ?
                        () => props.setSelectedItems?.(item.id)
                        : () => props.setSelectedItems?.(prev => [...prev.filter(id => id !== item.id), item.id]) //toggle item
                }
            >
                <View className={cn(listSelectorVariants.item.textContainer)}>
                    {item.imageUrl && <Image source={{ uri: item.imageUrl }} className={cn(listSelectorVariants.item.image, props.itemImageStyles)} />}
                    <Text className={cn(listSelectorVariants.item.text, props.itemTextStyles)}>{item.label}</Text>
                </View>
                {
                    props.singleSelect ?
                        <RadioButton
                            selected={isSelected}
                            onSelect={() => props.setSelectedItems?.(item.id)}
                        />
                        :
                        <Checkbox
                            checked={isSelected}
                            onCheckedChange={() => props.setSelectedItems?.(prev => [...prev.filter(id => id !== item.id), item.id])} //toggle item
                        />
                }
            </Pressable>
        )
    }

    return (
        <View className={cn(listSelectorVariants.listContainer, props.containerStyles)}>
            {
                props.searchEnabled &&
                <TextInput
                    type="search"
                    value={props.searchQuery}
                    onChangeText={(text) => props.searchQueryChange?.(text)}
                    placeholder={props.searchPlaceholder}
                    inputContainerStyles={cn(listSelectorVariants.searchBar, props.searchBarStyles)}
                />
            }
            <FlatList
                data={props.items}
                renderItem={renderItem}
                contentContainerStyle={{ gap: 12 }}
            />
        </View>
    )
}