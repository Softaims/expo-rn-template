import { CloseCircleIcon, EnvelopeIcon, EyeCloseIcon, EyeOpenIcon, LockIcon, MagnifierIcon, PaperClipIcon, PlaneIcon } from "@/assets/icons";
import { cn } from "@/lib/utils";
import { useCallback, useState } from "react";
import { TextInput as RNTextInput, TextInputProps, View, Pressable, Text, TextStyle, ViewStyle } from "react-native";

type InputType = 'default' | 'email' | 'password' | 'number' | 'tel' | 'search' | 'textarea' | 'chat';

export interface InputProps extends TextInputProps {
    type?: InputType;

    label?: string;
    labelStyles?: string | TextStyle;

    inputContainerStyles?: string | ViewStyle;
    inputStyles?: string | TextStyle;

    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    leftIconColor?: string;
    rightIconColor?: string;

    borderActiveColor?: string;
    borderInactiveColor?: string;

    onRightIconPress?: () => void;
}

export function TextInput(props: InputProps) {
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [isFocused, setIsFocused] = useState<boolean>(false);

    let leftIcon: React.ReactNode | null = null;
    let rightIcon: React.ReactNode | null = null;

    switch (props.type) {
        case 'email':
            leftIcon = props.leftIcon || <EnvelopeIcon fill={props.leftIconColor} />;
            break;
        case 'password':
            leftIcon = props.leftIcon || <LockIcon fill={props.leftIconColor} />;
            rightIcon = isPasswordVisible ? <EyeCloseIcon /> : <EyeOpenIcon />;
            break;
        case 'search':
            leftIcon = props.leftIcon || <MagnifierIcon fill={props.leftIconColor} />;
            rightIcon = props.value && props.value.length > 0 ? <CloseCircleIcon /> : null;
            break;
        case 'chat':
            leftIcon = props.leftIcon || <PaperClipIcon stroke={props.leftIconColor} />;
            rightIcon = props.value && props.value.length > 0 ? <PlaneIcon /> : <PlaneIcon fill={"#26291F80"} />;
            break;
        default:
            leftIcon = props.leftIcon || null;
            rightIcon = props.rightIcon || null;
            break;
    }

    const handleRightIconPress = useCallback(() => {
        if (props.type === 'password') {
            setIsPasswordVisible(prev => !prev);
        } else if (props.type === 'search') {
            props.onChangeText?.('');
        } else {
            props.onRightIconPress?.();
        }
    }, [props.type, props.onChangeText, props.onRightIconPress]);

    return (
        <View>
            {props.label && <Text className={cn("text-[16px] mb-[12px] font-bold text-primary", props.labelStyles)}>{props.label}</Text>}
            <View className={cn("flex-row border-[1.2px] border-primary justify-between items-center px-[12px] rounded-[10px] gap-[5px]", isFocused ? props.borderActiveColor || "border-primary" : props.borderInactiveColor || "border-border", props.inputContainerStyles)}>
                <View className="flex-row items-center gap-[5px] flex-1">
                    {leftIcon && leftIcon}
                    <RNTextInput
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        secureTextEntry={props.type === 'password' && !isPasswordVisible}
                        className={cn("flex-1 py-[12px]", props.inputStyles)}
                        {...props}
                    />
                </View>
                {
                    rightIcon &&
                    <Pressable
                        disabled={!(props.type === 'chat' || props.type === 'search' || props.type === 'password')}
                        onPress={handleRightIconPress}
                    >
                        {rightIcon}
                    </Pressable>
                }
            </View>
        </View>
    )
}