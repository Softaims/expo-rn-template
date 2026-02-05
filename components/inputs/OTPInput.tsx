import { cn } from "@/lib/utils";
import { View } from "react-native";
import { TextInput } from "./TextInput";

interface OTPInputProps {
    length?: number;
    disabled?: boolean;
    otp: string;
    setOtp: (otp: string) => void;
    containerStyles?: string;
    inputStyles?: string;
}

export function OTPInput({ length = 4, disabled = false, otp, setOtp, containerStyles, inputStyles }: OTPInputProps) {

    const handleOtpChange = (text: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp.join(''));
    }

    return (
        <View className={cn("flex-row gap-[10px]", containerStyles)}>
            {Array.from({ length }).map((_, index) => (
                <TextInput
                    key={index}
                    type="number"
                    value={otp[index]}
                    onChangeText={(text) => handleOtpChange(text, index)}
                    maxLength={1}
                    inputContainerStyles="px-[18px]"
                />
            ))}
        </View>
    )
}