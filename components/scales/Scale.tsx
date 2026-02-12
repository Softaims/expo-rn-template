import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from '../text';
import { useEffect, useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import { RulerPicker, RulerPickerProps } from './components/RulerPicker';
import WheelPicker from '@quidone/react-native-wheel-picker';

export interface ScaleProps extends RulerPickerProps {
    variant: 'age' | 'height' | 'weight';
    label?: string;
    orientation?: 'horizontal' | 'vertical';
    onValueChangeEnd: (number: string) => void;
    onUnitChange: (unit: string) => void;
}

const varientUnitTags = {
    age: ['Years'],
    height: ['CM', 'FT'],
    weight: ['KG', 'LB'],
}

export function Scale(props: ScaleProps) {
    const [selectedUnit, setSelectedUnit] = useState(varientUnitTags[props.variant][0]);
    const [feet, setFeet] = useState(4);
    const [inches, setInches] = useState(6);

    useEffect(() => {
        props.onUnitChange(selectedUnit);
    }, []);

    useEffect(() => {
        if (selectedUnit === 'FT') {
            props.onValueChangeEnd((feet + (inches / 12)).toFixed(2).toString());
        }
    }, [selectedUnit, feet, inches]);

    const FEET_DATA = useMemo(() => {
        return [...Array(10).keys()].map((index) => ({
            value: index + 1, // exclude 0
            label: (index + 1).toString(),
        }))
    }, [])

    const INCHES_DATA = useMemo(() => {
        return [...Array(12).keys()].map((index) => ({
            value: index,
            label: index.toString(),
        }))
    }, [])

    const renderHeader = () => {
        if (!props.label) return null;

        return (
            <View className='flex-row border-[1px] border-border rounded-[8px] overflow-hidden'>
                {
                    varientUnitTags[props.variant].map((unit) => (
                        <Pressable
                            key={unit}
                            onPress={() => {
                                setSelectedUnit(unit);
                                props.onValueChangeEnd(props.initialValue?.toString() || '0');
                                props.onUnitChange(unit);
                            }}
                            className={cn(
                                'flex-1 p-2',
                                selectedUnit === unit ? 'bg-border' : 'bg-input'
                            )}>
                            <Text
                                variant='subheading4'
                                className={cn(
                                    'text-center',
                                    selectedUnit === unit ? 'text-primary' : 'text-muted-foreground'
                                )}
                            >
                                {unit}
                            </Text>
                        </Pressable>
                    ))
                }
            </View>
        )
    }

    const renderOverlay = () => {
        return (
            <View style={[styles.overlayContainer]} pointerEvents={'none'}>
                <View style={[styles.selection, { height: 48 }]} />
            </View>
        )
    }

    return (
        <View>
            {renderHeader()}
            <View className={cn("overflow-hidden")}>
                {
                    selectedUnit !== 'FT' ?
                        <RulerPicker
                            key={selectedUnit}
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
                        :
                        <View className='flex-row gap-[50px] items-center justify-center mt-[32px]'>
                            <View className='flex-row items-center justify-center gap-[32px]'>
                                <Text variant='heading2'>FT</Text>
                                <WheelPicker
                                    data={FEET_DATA}
                                    value={feet}
                                    onValueChanged={({ item: { value } }) => setFeet(value)}
                                    enableScrollByTapOnItem={true}
                                    overlayItemStyle={styles.overlayItemStyle}
                                    itemTextStyle={styles.itemTextStyle}
                                    visibleItemCount={7}
                                    renderOverlay={renderOverlay}
                                />
                            </View>
                            <View className='flex-row items-center justify-center gap-[32px]'>
                                <WheelPicker
                                    data={INCHES_DATA}
                                    value={inches}
                                    onValueChanged={({ item: { value } }) => setInches(value)}
                                    enableScrollByTapOnItem={true}
                                    overlayItemStyle={styles.overlayItemStyle}
                                    itemTextStyle={styles.itemTextStyle}
                                    visibleItemCount={7}
                                    renderOverlay={renderOverlay}
                                />
                                <Text variant='heading2'>IN</Text>
                            </View>
                        </View>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    overlayItemStyle: {
        borderWidth: 10,
        borderColor: 'red',
    },
    itemTextStyle: {
        fontSize: 24,
    },
    overlayContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selection: {
        alignSelf: 'stretch',
        borderTopWidth: 1.5,
        borderBottomWidth: 1.5,
    },
})