import { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";
import { Scale } from "./Scale";
import { useState } from "storybook/internal/preview-api";
import { useEffect } from "react";

const meta = {
    title: "Scales/Scale",
    component: Scale,
    decorators: [
        (Story) => (
            <View className="p-4">
                <Story />
            </View>
        ),
    ],
} satisfies Meta<typeof Scale>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AgePicker: Story = {
    args: {
        variant: 'age',
        label: 'Years',
        min: 1,
        max: 100,
        onValueChange: () => { },
    },
    render: (args) => {
        const [value, setValue] = useState('');
        useEffect(() => {
            console.log(value);
        }, [value]);
        return (
            <Scale {...args} onValueChange={(number) => setValue(number)} />
        )
    }
};