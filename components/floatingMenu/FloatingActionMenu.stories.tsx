import { InfoCircleIcon, MenuDotsVerticalIcon } from "@/assets/icons";
import { Meta, StoryObj } from "@storybook/react-native";
import { useState } from "react";
import { View } from "react-native";
import { FloatingActionMenu, MenuOption } from "./FloatingActionMenu";

const meta = {
    title: "FloatingMenu/FloatingActionMenu",
    component: FloatingActionMenu,
    decorators: [
        (Story) => (
            <View className="flex-1 items-center bg-red-500">
                <Story />
            </View>
        ),
    ],
} satisfies Meta<typeof FloatingActionMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultFloatingMenu: Story = {
    args: {
        isOpen: false,
        onToggle: () => { },
        options: [],
        trigger: null,
    },
    render: (args) => {
        const [isOpen, setIsOpen] = useState(false);
        return (
            <FloatingActionMenu
                {...args}
                isOpen={isOpen}
                onToggle={() => setIsOpen(prev => !prev)}
                trigger={
                    <View className="h-[40px] w-[40px] items-center justify-center bg-input rounded-full">
                        <MenuDotsVerticalIcon />
                    </View>
                }
                options={[
                    { label: "Block User", onPress: () => { }, icon: <InfoCircleIcon fill={'#000000'} /> },
                    { label: "Report User", onPress: () => { }, icon: <InfoCircleIcon fill={'#000000'} /> },
                    { label: "Clear Chat", onPress: () => { }, icon: <InfoCircleIcon />, destructive: true },
                ]}
            />
        );
    },
};
