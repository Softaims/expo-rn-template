import { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";
import { Scale } from "./Scale";
import { useState } from "storybook/internal/preview-api";
import React, { useEffect } from "react";
import { FeetInchesScale } from "./FeetInchesScale";

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
        max: 101,
        onValueChangeEnd: () => { },
        onUnitChange: () => { },
    },
    render: (args) => {
        const [value, setValue] = useState('');
        const [unit, setUnit] = useState('');

        useEffect(() => {
            console.log(value, unit);
        }, [value, unit]);

        return (
            <Scale
                {...args}
                onValueChangeEnd={(number) => setValue(number)}
                onUnitChange={(unit) => setUnit(unit)}
            />
        )
    }
};

export const WeightPicker: Story = {
    args: {
        variant: 'weight',
        label: 'Weight',
        min: 1,
        max: 101,
        onValueChangeEnd: () => { },
        onUnitChange: () => { },
    },
    render: (args) => {
        const [value, setValue] = useState('');
        const [unit, setUnit] = useState('');

        useEffect(() => {
            console.log(value, unit);
        }, [value, unit]);
        return (
            <Scale
                {...args}
                onValueChangeEnd={(number) => setValue(number)}
                onUnitChange={(unit) => setUnit(unit)}
            />
        )
    }
};

export const HeightPicker: Story = {
    args: {
        variant: 'height',
        label: 'Height',
        min: 1,
        max: 101,
        onValueChangeEnd: () => { },
        onUnitChange: () => { },
    },
    render: (args) => {
        const [value, setValue] = useState('');
        const [unit, setUnit] = useState('');

        useEffect(() => {
            console.log(value, unit);
        }, [value, unit]);
        return (
            <Scale
                {...args}
                onValueChangeEnd={(number) => setValue(number)}
                onUnitChange={(unit) => setUnit(unit)}
            />
        )
    }
};
