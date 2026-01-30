import { CloseCircleIcon, EnvelopeIcon, EyeCloseIcon, EyeOpenIcon, LockIcon, MagnifierIcon, PaperClipIcon, PlaneIcon } from "@/assets/icons";
import { cn } from "@/lib/utils";
import { useCallback, useState } from "react";
import { TextInput as RNTextInput, TextInputProps, Text, View, Pressable } from "react-native";

const ICONS: Record<string, React.ReactNode | null> = {
    'default': null,
    'email': <EnvelopeIcon />,
    'password': <LockIcon />,
    'eye-open': <EyeOpenIcon />,
    'eye-close': <EyeCloseIcon />,
    'number': null,
    'tel': null,
    'url': null,
    'search': <MagnifierIcon />,
    'close': <CloseCircleIcon />,
    'textarea': null,
    'paper-clip': <PaperClipIcon />,
    'plane': <PlaneIcon />,
}

type InputType = 'default' | 'email' | 'password' | 'number' | 'tel' | 'search' | 'textarea' | 'chat';

export interface InputProps extends TextInputProps {
    type?: InputType;

    value?: string;
    label?: string;

    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    leftIconColor?: string;
    rightIconColor?: string;

    onRightIconPress?: () => void;
}

export function TextInput(props: InputProps) {
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [isFocused, setIsFocused] = useState<boolean>(false);

    let leftIcon: React.ReactNode | null = null;
    let rightIcon: React.ReactNode | null = null;

    switch (props.type) {
        case 'email':
            leftIcon = ICONS['email'];
            break;
        case 'password':
            leftIcon = ICONS['password'];
            rightIcon = isPasswordVisible ? ICONS['eye-close'] : ICONS['eye-open'];
            break;
        case 'search':
            leftIcon = ICONS['search'];
            rightIcon = ICONS['close'];
            break;
        case 'chat':
            leftIcon = ICONS['paper-clip'];
            rightIcon = ICONS['plane'];
            break;
        default:
            break;
    }

    const handleRightIconPress = useCallback(() => {
        if (props.type === 'password') {
            setIsPasswordVisible(prev => !prev);
            return;
        }
        if (!props.onRightIconPress) return;
        props.onRightIconPress();
    }, [props.onRightIconPress, props.type]);

    return (
        <View>
            {props.label && <Text className="">{props.label}</Text>}
            <View>
                {leftIcon && leftIcon}
                <RNTextInput
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    secureTextEntry={props.type === 'password' && !isPasswordVisible}
                    {...props}
                />
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