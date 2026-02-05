import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { TextInput, View } from "react-native";

interface OTPInputProps {
    length?: number;
    disabled?: boolean;
    otp: string;
    setOtp: (otp: string) => void;
    containerStyles?: string;
    inputStyles?: string;
    borderActiveColor?: string;
    borderInactiveColor?: string;
    numericOnly?: boolean;
}

export function OTPInput({ 
    length = 4, 
    disabled = false, 
    otp, 
    setOtp, 
    containerStyles, 
    inputStyles, 
    borderActiveColor, 
    borderInactiveColor,
    numericOnly = true
}: OTPInputProps) {
    const inputRefs = useRef<(TextInput | null)[]>([]);
    const [otpArray, setOtpArray] = useState<string[]>(Array.from({ length }, () => ''));
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

    // Sync external otp value with internal state
    useEffect(() => {
        const newOtpArray = otp.split('').slice(0, length);
        while (newOtpArray.length < length) {
            newOtpArray.push('');
        }
        setOtpArray(newOtpArray);
    }, [otp, length]);

    const handleOtpChange = (text: string, index: number) => {
        // Filter characters based on numericOnly prop
        const filteredText = numericOnly ? text.replace(/[^0-9]/g, '') : text;
        
        // Handle paste event - if text length > 1, distribute across inputs
        if (filteredText.length > 1) {
            const pastedText = filteredText.slice(0, length);
            const newOtp = [...otpArray];
            
            for (let i = 0; i < pastedText.length; i++) {
                if (index + i < length) {
                    newOtp[index + i] = pastedText[i];
                }
            }
            
            setOtpArray(newOtp);
            setOtp(newOtp.join(''));
            
            // Focus the next empty input or the last filled input
            const nextIndex = Math.min(index + pastedText.length, length - 1);
            inputRefs.current[nextIndex]?.focus();
            return;
        }

        // Handle single character input
        const newOtp = [...otpArray];
        newOtp[index] = filteredText;
        setOtpArray(newOtp);
        setOtp(newOtp.join(''));

        // Move to next input if current input has a value
        if (filteredText && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (e: any, index: number) => {
        // Handle backspace - move to previous input if current is empty
        if (e.nativeEvent.key === 'Backspace' && !otpArray[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    return (
        <View className={cn("flex-row gap-[10px]", containerStyles)}>
            {Array.from({ length }).map((_, index) => (
                <TextInput
                    key={index}
                    ref={(ref) => {
                        inputRefs.current[index] = ref;
                    }}
                    keyboardType={numericOnly ? "number-pad" : "default"}
                    inputMode={numericOnly ? "numeric" : "text"}
                    value={otpArray[index]}
                    onChangeText={(text) => handleOtpChange(text, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    maxLength={1}
                    editable={!disabled}
                    className={cn(
                        "border-[1.2px] rounded-[10px] bg-input text-center text-[14px] font-weight-[500] h-[46px] w-[46px]",
                        focusedIndex === index 
                            ? borderActiveColor || "border-primary" 
                            : borderInactiveColor || "border-border",
                        disabled && "opacity-50",
                        inputStyles
                    )}
                    onFocus={() => setFocusedIndex(index)}
                    onBlur={() => setFocusedIndex(null)}
                />
            ))}
        </View>
    );
}