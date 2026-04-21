import {
  AltArrowDownIcon,
  CloseCircleIcon,
  EnvelopeIcon,
  EyeCloseIcon,
  EyeOpenIcon,
  InfoCircleIcon,
  LockIcon,
  MagnifierIcon,
  PaperClipIcon,
  PhoneIcon,
  PlaneIcon,
} from "@/assets/icons";
import { useTheme } from "@/lib/theme";
import { typography } from "@/lib/theme/fonts";
import { useCallback, useMemo, useState } from "react";
import {
  TextInput as RNTextInput,
  TextInputProps,
  View,
  Pressable,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import CountryPicker, {
  Country,
  CountryCode,
  Flag,
} from "react-native-country-picker-modal";
import { Text } from "../text";
import { textInputStyles as styles } from "./TextInput.styles";

type InputType =
  | "default"
  | "email"
  | "password"
  | "number"
  | "search"
  | "textarea"
  | "chat"
  | "phone-basic"
  | "phone-code"
  | "phone-code-icon";

export interface InputProps extends TextInputProps {
  type?: InputType;

  label?: string;
  /** Prefer this; merges after label typography. */
  labelStyle?: StyleProp<TextStyle>;

  inputContainerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;

  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  leftIconColor?: string;
  rightIconColor?: string;

  /** Border color when focused; defaults to `colors.primary`. */
  borderActiveColor?: string;
  /** Border color when not focused; defaults to `colors.border`. */
  borderInactiveColor?: string;

  countryCode?: CountryCode;
  callingCode?: string;
  setCountryCode?: (countryCode: CountryCode) => void;
  setCallingCode?: (callingCode: string) => void;

  onRightIconPress?: () => void;

  errorMessage?: string;
  errorMessageStyle?: StyleProp<TextStyle>;
  errorComponent?: React.ReactNode;

  /** Optional NativeWind classes on the outer wrapper — for adopters; template uses `inputContainerStyle` / theme. */
  containerClassName?: string;
}

export function TextInput({
  type: inputType = "default",
  label,
  labelStyle,
  inputContainerStyle,
  inputStyle,
  leftIcon: leftIconProp,
  rightIcon: rightIconProp,
  leftIconColor,
  rightIconColor,
  borderActiveColor,
  borderInactiveColor,
  countryCode,
  callingCode,
  setCountryCode,
  setCallingCode,
  onRightIconPress,
  errorMessage,
  errorMessageStyle,
  errorComponent,
  containerClassName,
  ...rest
}: InputProps) {
  const { colors } = useTheme();
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const onSelect = (country: Country) => {
    setCountryCode?.(country.cca2);
    setCallingCode?.(country.callingCode[0]);
  };

  let leftIcon: React.ReactNode | null = null;
  let rightIcon: React.ReactNode | null = null;

  let additionalProps: TextInputProps = {};

  const borderColor = useMemo(() => {
    if (errorMessage || errorComponent) {
      return colors.destructive;
    }
    if (isFocused) {
      return borderActiveColor ?? colors.primary;
    }
    return borderInactiveColor ?? colors.border;
  }, [
    colors.border,
    colors.destructive,
    colors.primary,
    isFocused,
    borderActiveColor,
    borderInactiveColor,
    errorComponent,
    errorMessage,
  ]);

  const renderFlagButton = () => {
    if (countryCode && callingCode) {
      return (
        <View style={styles.phoneRow}>
          <CountryPicker
            countryCode={countryCode}
            withFlag
            withCallingCode
            withFilter
            withEmoji={false}
            onSelect={onSelect}
            containerButtonStyle={{ width: 32 }}
            renderFlagButton={({ onOpen }) => {
              return (
                <Pressable onPress={onOpen} style={styles.phoneRow}>
                  {inputType === "phone-code-icon" && (
                    <View style={styles.phoneFlagWrap}>
                      <Flag
                        countryCode={countryCode as CountryCode}
                        flagSize={30}
                        withFlagButton={true}
                      />
                    </View>
                  )}
                  <Text
                    style={[
                      typography.textVariants.bodyText2,
                      styles.phoneCalling,
                      { color: colors.text },
                    ]}
                  >
                    +{callingCode}
                  </Text>
                  <AltArrowDownIcon color={leftIconColor} />
                  <View
                    style={[
                      styles.phoneDivider,
                      { backgroundColor: colors.border },
                    ]}
                  />
                </Pressable>
              );
            }}
          />
        </View>
      );
    }
  };

  switch (inputType) {
    case "email":
      leftIcon = leftIconProp || <EnvelopeIcon fill={leftIconColor} />;
      additionalProps.keyboardType = "email-address";
      break;
    case "password":
      leftIcon = leftIconProp || <LockIcon fill={leftIconColor} />;
      rightIcon = isPasswordVisible ? <EyeCloseIcon /> : <EyeOpenIcon />;
      additionalProps.keyboardType = "visible-password";
      break;
    case "search":
      leftIcon = leftIconProp || <MagnifierIcon fill={leftIconColor} />;
      rightIcon =
        rest.value && String(rest.value).length > 0 ? <CloseCircleIcon /> : null;
      break;
    case "chat":
      leftIcon = leftIconProp || (
        <PaperClipIcon stroke={leftIconColor} />
      );
      rightIcon =
        rest.value && String(rest.value).length > 0 ? (
          <PlaneIcon />
        ) : (
          <PlaneIcon fill={"#26291F80"} />
        );
      break;
    case "phone-basic":
      leftIcon = leftIconProp || <PhoneIcon fill={leftIconColor} />;
      additionalProps.keyboardType = "phone-pad";
      break;
    case "phone-code":
      leftIcon = renderFlagButton();
      additionalProps.keyboardType = "phone-pad";
      break;
    case "phone-code-icon":
      leftIcon = renderFlagButton();
      additionalProps.keyboardType = "phone-pad";
      break;
    case "textarea":
      additionalProps.multiline = true;
      break;
    default:
      leftIcon = leftIconProp || null;
      rightIcon = rightIconProp || null;
      break;
  }

  const handleRightIconPress = useCallback(() => {
    if (inputType === "password") {
      setIsPasswordVisible((prev) => !prev);
    } else if (inputType === "search") {
      rest.onChangeText?.("");
    } else {
      onRightIconPress?.();
    }
  }, [inputType, onRightIconPress, rest.onChangeText]);

  const fieldShellStyle: StyleProp<ViewStyle> = [
    styles.fieldRow,
    {
      borderColor,
      backgroundColor: colors.input,
    },
    rest.editable === false && styles.fieldRowDisabled,
    inputContainerStyle,
  ];

  const inputCombinedStyle: StyleProp<TextStyle> = [
    styles.input,
    typography.textVariants.bodyText1,
    inputType === "textarea" && styles.inputMultiline,
    { color: colors.text },
    inputStyle,
    rest.style,
  ];

  const {
    onFocus: onFocusProp,
    onBlur: onBlurProp,
    style: _style,
    ...restInput
  } = rest;

  return (
    <View className={containerClassName}>
      {label && (
        <Text
          style={[
            typography.bodyBold,
            styles.labelSpacing,
            { color: colors.primary },
            labelStyle,
          ]}
        >
          {label}
        </Text>
      )}
      <View style={fieldShellStyle}>
        <View style={styles.innerRow}>
          {leftIcon && leftIcon}
          <RNTextInput
            {...restInput}
            {...additionalProps}
            onFocus={(e) => {
              setIsFocused(true);
              onFocusProp?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              onBlurProp?.(e);
            }}
            secureTextEntry={
              inputType === "password" && !isPasswordVisible
            }
            style={inputCombinedStyle}
            placeholderTextColor={
              rest.placeholderTextColor ?? colors.mutedForeground
            }
          />
        </View>
        {rightIcon && (
          <Pressable
            disabled={
              !(
                inputType === "chat" ||
                inputType === "search" ||
                inputType === "password"
              )
            }
            onPress={handleRightIconPress}
          >
            {rightIcon}
          </Pressable>
        )}
      </View>
      {errorMessage && (
        <View style={styles.errorRow}>
          <InfoCircleIcon fill="#FF5050" />
          <Text
            variant="bodyText3"
            style={[{ color: colors.destructive }, errorMessageStyle]}
          >
            {errorMessage}
          </Text>
        </View>
      )}
      {errorComponent && errorComponent}
    </View>
  );
}
