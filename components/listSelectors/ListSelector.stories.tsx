import { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";
import { ListSelector, ListSelectorItem } from "./ListSelector";
import { useState } from "storybook/internal/preview-api";

const meta = {
    component: ListSelector,
    decorators: [
        (Story) => (
            <View className="p-4">
                <Story />
            </View>
        ),
    ],
} satisfies Meta<typeof ListSelector>;

export default meta;

type Story = StoryObj<typeof meta>;

const items: ListSelectorItem[] = [
    {
        id: '1',
        label: 'Item 1',
        value: 'item1',
    },
    {
        id: '2',
        label: 'Item 2',
        value: 'item2',
    },
    {
        id: '3',
        label: 'Item 3',
        value: 'item3',
    },
]

export const ListSelectorSingleSelection: Story = {
    args: {
        items: items,
        selectedItems: [],
        setSelectedItems: () => { },
        searchEnabled: true,
        searchPlaceholder: 'Search',
    },
    render: (args) => {
        const [selectedItems, setSelectedItems] = useState([]);
        const [searchQuery, setSearchQuery] = useState('');
        return (
            <ListSelector
                {...args}
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}

                searchQuery={searchQuery}
                searchQueryChange={setSearchQuery}
            />
        )
    }

};