import { cn } from "@/lib/utils";
import { FlatList, Image, Pressable, View, ViewStyle } from "react-native";
import { Checkbox, RadioButton } from "../buttons";
import { TextInput } from "../inputs";
import { Text } from "../text";

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
    variant: 'list' | 'list-wrapped';
    singleSelect: boolean;
    items: ListSelectorItem[];
    selectedItems: any[];
    setSelectedItems: (item: any) => void;
    containerStyles?: string;
    listContainerStyles?: ViewStyle;

    searchEnabled?: boolean;
    searchPlaceholder?: string;
    placeholderTextColor?: string;
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
    const filteredItems = props.searchQuery ? props.items.filter((item) => item.label.toLowerCase().includes(props.searchQuery?.toLowerCase() || '')) : props.items;

    const renderItem = ({ item }: { item: ListSelectorItem }) => {
        const handleSelect = () => {
            if (props.singleSelect) {
                props.setSelectedItems?.(item.id);
            } else {
                const isItemPresent = props.selectedItems.includes(item.id);
                if (isItemPresent) {
                    props.setSelectedItems?.(props.selectedItems.filter((id: string) => id !== item.id));
                } else {
                    props.setSelectedItems?.([...props.selectedItems, item.id]);
                }
            }
        }
        const isSelected = props.selectedItems.includes(item.id);

        return (
            <Pressable
                className={cn(
                    listSelectorVariants.item.base,
                    props.variant === 'list-wrapped' && "gap-[10px]",
                    isSelected ? listSelectorVariants.item.selected : listSelectorVariants.item.unselected,
                    isSelected ? props.selectedItemStyles : props.unselectedItemStyles,
                )}
                onPress={handleSelect}
            >
                <View className={cn(listSelectorVariants.item.textContainer)}>
                    {item.imageUrl && <Image source={{ uri: item.imageUrl }} className={cn(listSelectorVariants.item.image, props.itemImageStyles)} />}
                    <Text className={cn(listSelectorVariants.item.text, props.itemTextStyles)}>{item.label}</Text>
                </View>
                {
                    props.singleSelect ?
                        <RadioButton
                            selected={isSelected}
                            onSelect={handleSelect}
                        />
                        :
                        <Checkbox
                            value={isSelected}
                            onValueChange={() => handleSelect()}
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
                    placeholderTextColor={props.placeholderTextColor}
                    inputContainerStyles={cn(listSelectorVariants.searchBar, props.searchBarStyles)}
                />
            }
            <FlatList
                data={filteredItems}
                renderItem={renderItem}
                contentContainerStyle={[
                    { gap: 12 },
                    props.variant === 'list-wrapped' && {
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                    },
                    props.listContainerStyles,
                ]}
            />
        </View>
    )
}