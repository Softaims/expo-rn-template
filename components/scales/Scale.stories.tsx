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
        min: 13,
        max: 100,
        step: 1,
        fractionDigits: 0,
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

// export const HorizontalSelector: Story = {
//     args: {
//         value: 0,
//         onChange: () => { },
//         min: 0,
//         max: 100,
//         step: 1,
//         orientation: 'horizontal',
//         label: 'Years',
//         showSideValues: true,
//         showTickLabels: true,
//     },
//     render: (args) => {
//         const [value, setValue] = useState(0);
//         return (
//             <Scale
//                 {...args}
//                 value={value}
//                 onChange={setValue}
//             />
//         )
//     }
// };

// export const VerticalSelector: Story = {
//     args: {
//         value: 0,
//         onChange: () => { },
//         min: 0,
//         max: 100,
//         step: 1,
//         orientation: 'vertical',
//         label: 'Height',
//         showSideValues: true,
//         showTickLabels: true,
//     },
//     render: (args) => {
//         const [value, setValue] = useState(0);
//         return (
//             <Scale
//                 {...args}
//                 value={value}
//                 onChange={setValue}
//             />
//         )
//     }
// };