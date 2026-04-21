import { useEffect, useRef, useState } from "react";
import {
  TextInput,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import { useTheme } from "@/lib/theme";
import { styles } from "./OTPInput.styles";

interface OTPInputProps {
  length?: number;
  disabled?: boolean;
  otp: string;
  setOtp: (otp: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  /** Optional NativeWind on the row — adopters only. */
  containerClassName?: string;
  numericOnly?: boolean;
}

export function OTPInput({
  length = 4,
  disabled = false,
  otp,
  setOtp,
  containerStyle,
  inputStyle,
  containerClassName,
  numericOnly = true,
}: OTPInputProps) {
  const { colors } = useTheme();
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const [otpArray, setOtpArray] = useState<string[]>(
    Array.from({ length }, () => "")
  );
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  useEffect(() => {
    const newOtpArray = otp.split("").slice(0, length);
    while (newOtpArray.length < length) {
      newOtpArray.push("");
    }
    setOtpArray(newOtpArray);
  }, [otp, length]);

  const handleOtpChange = (text: string, index: number) => {
    const filteredText = numericOnly ? text.replace(/[^0-9]/g, "") : text;

    if (filteredText.length > 1) {
      const pastedText = filteredText.slice(0, length);
      const newOtp = [...otpArray];

      for (let i = 0; i < pastedText.length; i++) {
        if (index + i < length) {
          newOtp[index + i] = pastedText[i];
        }
      }

      setOtpArray(newOtp);
      setOtp(newOtp.join(""));

      const nextIndex = Math.min(index + pastedText.length, length - 1);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    const newOtp = [...otpArray];
    newOtp[index] = filteredText;
    setOtpArray(newOtp);
    setOtp(newOtp.join(""));

    if (filteredText && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: { nativeEvent: { key: string } }, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otpArray[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={[styles.row, containerStyle]} className={containerClassName}>
      {Array.from({ length }).map((_, index) => {
        const focused = focusedIndex === index;
        return (
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
            style={[
              styles.digit,
              {
                backgroundColor: colors.input,
                borderColor: focused ? colors.primary : colors.border,
                opacity: disabled ? 0.5 : 1,
              },
              inputStyle,
            ]}
            onFocus={() => setFocusedIndex(index)}
            onBlur={() => setFocusedIndex(null)}
          />
        );
      })}
    </View>
  );
}
