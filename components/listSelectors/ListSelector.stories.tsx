import { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";
import { ListSelector, ListSelectorItem } from "./ListSelector";
import { useState } from "storybook/internal/preview-api";

const meta = {
    title: "ListSelectors/ListSelector",
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
        label: 'Apple Pie with Ice Cream',
        value: 'item1',
    },
    {
        id: '2',
        label: 'Chocolate Cake with Ice Cream',
        value: 'item2',
    },
    {
        id: '3',
        label: 'Vanilla Cake with Ice Cream',
        value: 'item3',
    },
]

const itemsWithIcon: ListSelectorItem[] = [
    {
        id: '1',
        label: 'Snowboarding',
        value: 'item1',
        imageUrl: "https://www.cnet.com/a/img/resize/0e9874cc9d6b18489f832793796d285141496106/hub/2021/10/16/11804578-0dbc-42af-bcd1-3bc7b1394962/the-batman-2022-teaser-poster-batman-01-promo.jpg?auto=webp&fit=bounds&height=900&precrop=1881,1411,x423,y0&width=1200"
    },
    {
        id: '2',
        label: 'Skiing',
        value: 'item2',
        imageUrl: "https://www.cnet.com/a/img/resize/0e9874cc9d6b18489f832793796d285141496106/hub/2021/10/16/11804578-0dbc-42af-bcd1-3bc7b1394962/the-batman-2022-teaser-poster-batman-01-promo.jpg?auto=webp&fit=bounds&height=900&precrop=1881,1411,x423,y0&width=1200"
    },
    {
        id: '3',
        label: 'Surfing',
        value: 'item3',
        imageUrl: "https://www.cnet.com/a/img/resize/0e9874cc9d6b18489f832793796d285141496106/hub/2021/10/16/11804578-0dbc-42af-bcd1-3bc7b1394962/the-batman-2022-teaser-poster-batman-01-promo.jpg?auto=webp&fit=bounds&height=900&precrop=1881,1411,x423,y0&width=1200"
    },
    {
        id: '4',
        label: 'Skateboarding',
        value: 'item3',
        imageUrl: "https://www.cnet.com/a/img/resize/0e9874cc9d6b18489f832793796d285141496106/hub/2021/10/16/11804578-0dbc-42af-bcd1-3bc7b1394962/the-batman-2022-teaser-poster-batman-01-promo.jpg?auto=webp&fit=bounds&height=900&precrop=1881,1411,x423,y0&width=1200"
    },
    {
        id: '5',
        label: 'Ice',
        value: 'Biking',
        imageUrl: "https://www.cnet.com/a/img/resize/0e9874cc9d6b18489f832793796d285141496106/hub/2021/10/16/11804578-0dbc-42af-bcd1-3bc7b1394962/the-batman-2022-teaser-poster-batman-01-promo.jpg?auto=webp&fit=bounds&height=900&precrop=1881,1411,x423,y0&width=1200"
    },
    {
        id: '6',
        label: 'Cream',
        value: 'item3',
        imageUrl: "https://www.cnet.com/a/img/resize/0e9874cc9d6b18489f832793796d285141496106/hub/2021/10/16/11804578-0dbc-42af-bcd1-3bc7b1394962/the-batman-2022-teaser-poster-batman-01-promo.jpg?auto=webp&fit=bounds&height=900&precrop=1881,1411,x423,y0&width=1200"
    },
]

export const SingleSelector: Story = {
    args: {
        variant: 'list',
        singleSelect: true,
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

export const SingleSelectorWithIcon: Story = {
    args: {
        variant: 'list',
        singleSelect: true,
        items: itemsWithIcon,
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
}

export const MultiSelectorWithIcon: Story = {
    args: {
        variant: 'list',
        singleSelect: false,
        items: itemsWithIcon,
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
}

export const WrappedMultiSelectorWithIcon: Story = {
    args: {
        variant: 'list-wrapped',
        singleSelect: false,
        items: itemsWithIcon,
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
}