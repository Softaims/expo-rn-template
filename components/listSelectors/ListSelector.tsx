import { useTheme } from "@/lib/theme";
import {
  FlatList,
  Image,
  ImageStyle,
  Pressable,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { Checkbox, RadioButton } from "../buttons";
import { TextInput } from "../inputs";
import { Text } from "../text";
import {
  defaultItemImageStyle,
  itemLabelStyle,
  itemPressableStyle,
  listSelectorLayout,
} from "./ListSelector.styles";

export interface ListSelectorItem {
  id: string;
  label: string;
  value: string;
  imageUrl?: string;
}

export interface ListSelectorProps {
  variant: "list" | "list-wrapped";
  singleSelect: boolean;
  items: ListSelectorItem[];
  selectedItems: any[];
  setSelectedItems: (item: any) => void;
  containerStyle?: StyleProp<ViewStyle>;
  listContainerStyles?: ViewStyle;

  searchEnabled?: boolean;
  searchPlaceholder?: string;
  placeholderTextColor?: string;
  searchQuery?: string;
  searchQueryChange?: (query: string) => void;
  searchBarStyle?: StyleProp<ViewStyle>;

  slectedIcon?: React.ReactNode;
  unselectedIcon?: React.ReactNode;

  selectedItemStyle?: StyleProp<ViewStyle>;
  unselectedItemStyle?: StyleProp<ViewStyle>;
  itemTextStyle?: StyleProp<TextStyle>;
  itemImageStyle?: StyleProp<ImageStyle>;
}

export const ListSelector = (props: ListSelectorProps) => {
  const { colors } = useTheme();
  const filteredItems = props.searchQuery
    ? props.items.filter((item) =>
        item.label
          .toLowerCase()
          .includes(props.searchQuery?.toLowerCase() || "")
      )
    : props.items;

  const renderItem = ({ item }: { item: ListSelectorItem }) => {
    const handleSelect = () => {
      if (props.singleSelect) {
        props.setSelectedItems?.(item.id);
      } else {
        const isItemPresent = props.selectedItems.includes(item.id);
        if (isItemPresent) {
          props.setSelectedItems?.(
            props.selectedItems.filter((id: string) => id !== item.id)
          );
        } else {
          props.setSelectedItems?.([...props.selectedItems, item.id]);
        }
      }
    };
    const isSelected = props.selectedItems.includes(item.id);

    const base = itemPressableStyle(colors, {
      isSelected,
      variant: props.variant,
    });

    return (
      <Pressable
        style={[
          base,
          isSelected ? props.selectedItemStyle : props.unselectedItemStyle,
        ]}
        onPress={handleSelect}
      >
        <View style={listSelectorLayout.itemTextRow}>
          {item.imageUrl && (
            <Image
              source={{ uri: item.imageUrl }}
              style={[defaultItemImageStyle(), props.itemImageStyle]}
            />
          )}
          <Text style={[itemLabelStyle(colors), props.itemTextStyle]}>
            {item.label}
          </Text>
        </View>
        {props.singleSelect ? (
          <RadioButton selected={isSelected} onSelect={handleSelect} />
        ) : (
          <Checkbox value={isSelected} onValueChange={() => handleSelect()} />
        )}
      </Pressable>
    );
  };

  return (
    <View style={[listSelectorLayout.root, props.containerStyle]}>
      {props.searchEnabled && (
        <TextInput
          type="search"
          value={props.searchQuery}
          onChangeText={(text) => props.searchQueryChange?.(text)}
          placeholder={props.searchPlaceholder}
          placeholderTextColor={props.placeholderTextColor}
          inputContainerStyle={[listSelectorLayout.searchBar, props.searchBarStyle]}
        />
      )}
      <FlatList
        data={filteredItems}
        renderItem={renderItem}
        contentContainerStyle={[
          listSelectorLayout.listContent,
          props.variant === "list-wrapped" && {
            flexDirection: "row",
            flexWrap: "wrap",
          },
          props.listContainerStyles,
        ]}
      />
    </View>
  );
};
