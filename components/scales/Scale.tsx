import { View } from 'react-native';
import { Text } from '../text';
import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { RulerPicker, RulerPickerProps } from './components/RulerPicker';

export interface ScaleProps extends RulerPickerProps {
    variant: 'age' | 'height' | 'weight';
    label?: string;
    orientation?: 'horizontal' | 'vertical';
    onValueChange: (number: string) => void;
}

export function Scale(props: ScaleProps) {

    const renderHeader = useMemo(() => {
        if (!props.label) return null;

        return (
            <View>
                <Text variant='subheading3'>{props.label}</Text>
            </View>
        )
    }, [props.label]);

    return (
        <View>
            {renderHeader}
            <View className={cn("overflow-hidden")}>
                <RulerPicker
                    {...props}
                    height={props.height || 260}
                    min={props.min || 0}
                    max={props.max || 240}
                    step={props.step || 1}
                    fractionDigits={props.fractionDigits || 0}
                    initialValue={props.initialValue || 0}
                    onValueChange={props.onValueChange}
                    unit={''}
                    gapBetweenSteps={props.gapBetweenSteps || 8}
                    shortStepHeight={props.shortStepHeight || 24}
                    longStepHeight={props.longStepHeight || 34}
                />
            </View>
        </View>
    )
}