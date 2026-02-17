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
import { cn } from "@/lib/utils";
import { useCallback, useState } from "react";
import {
  TextInput as RNTextInput,
  TextInputProps,
  View,
  Pressable,
} from "react-native";
import CountryPicker, {
  Country,
  CountryCode,
  Flag,
} from "react-native-country-picker-modal";
import { Text } from "../text";

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
  labelStyles?: string;

  inputContainerStyles?: string;
  inputStyles?: string;

  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  leftIconColor?: string;
  rightIconColor?: string;

  borderActiveColor?: string;
  borderInactiveColor?: string;

  countryCode?: CountryCode;
  callingCode?: string;
  setCountryCode?: (countryCode: CountryCode) => void;
  setCallingCode?: (callingCode: string) => void;

  onRightIconPress?: () => void;

  errorMessage?: string;
  errorMessageStyles?: string;
  errorComponent?: React.ReactNode;
}

export function TextInput(props: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const onSelect = (country: Country) => {
    props.setCountryCode?.(country.cca2);
    props.setCallingCode?.(country.callingCode[0]);
  };

  let leftIcon: React.ReactNode | null = null;
  let rightIcon: React.ReactNode | null = null;

  let additionalProps: TextInputProps = {};

  const renderFlagButton = () => {
    if (props.countryCode && props.callingCode) {
      return (
        <View className="flex-row items-center">
          <CountryPicker
            countryCode={props.countryCode}
            withFlag
            withCallingCode
            withFilter
            withEmoji={false}
            onSelect={onSelect}
            containerButtonStyle={{ width: 32 }}
            renderFlagButton={({ onOpen }) => {
              return (
                <Pressable onPress={onOpen} className="flex-row items-center">
                  {props.type === "phone-code-icon" && (
                    <View className="mr-[-4px]">
                      <Flag
                        countryCode={props.countryCode as CountryCode}
                        flagSize={30}
                        withFlagButton={true}
                      />
                    </View>
                  )}
                  <Text className="mt-[2px] mr-[8px]">
                    +{props.callingCode}
                  </Text>
                  <AltArrowDownIcon color={props.leftIconColor} />
                  <View className="h-[24px] bg-border w-[1px] ml-[5px] mr-[1px]" />
                </Pressable>
              );
            }}
          />
        </View>
      );
    }
  };

  switch (props.type) {
    case "email":
      leftIcon = props.leftIcon || <EnvelopeIcon fill={props.leftIconColor} />;
      additionalProps.keyboardType = "email-address";
      break;
    case "password":
      leftIcon = props.leftIcon || <LockIcon fill={props.leftIconColor} />;
      rightIcon = isPasswordVisible ? <EyeCloseIcon /> : <EyeOpenIcon />;
      additionalProps.keyboardType = "visible-password";
      break;
    case "search":
      leftIcon = props.leftIcon || <MagnifierIcon fill={props.leftIconColor} />;
      rightIcon =
        props.value && props.value.length > 0 ? <CloseCircleIcon /> : null;
      break;
    case "chat":
      leftIcon = props.leftIcon || (
        <PaperClipIcon stroke={props.leftIconColor} />
      );
      rightIcon =
        props.value && props.value.length > 0 ? (
          <PlaneIcon />
        ) : (
          <PlaneIcon fill={"#26291F80"} />
        );
      break;
    case "phone-basic":
      leftIcon = props.leftIcon || <PhoneIcon fill={props.leftIconColor} />;
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
      leftIcon = props.leftIcon || null;
      rightIcon = props.rightIcon || null;
      break;
  }

  const handleRightIconPress = useCallback(() => {
    if (props.type === "password") {
      setIsPasswordVisible((prev) => !prev);
    } else if (props.type === "search") {
      props.onChangeText?.("");
    } else {
      props.onRightIconPress?.();
    }
  }, [props.type, props.onChangeText, props.onRightIconPress]);

  return (
    <View>
      {props.label && (
        <Text
          className={cn(
            "text-[16px] mb-[12px] font-bold text-primary",
            props.labelStyles,
          )}
        >
          {props.label}
        </Text>
      )}
      <View
        className={cn(
          "flex-row border-[1.2px] border-primary justify-between items-center px-[12px] rounded-[10px] gap-[5px] bg-input",
          isFocused
            ? props.borderActiveColor || "border-primary"
            : props.borderInactiveColor || "border-border",
          props.editable === false && "opacity-50",
          (props.errorMessage || props.errorComponent) && "border-destructive",
          props.inputContainerStyles,
        )}
      >
        <View className="flex-row items-center gap-[5px] flex-1">
          {leftIcon && leftIcon}
          <RNTextInput
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            secureTextEntry={props.type === "password" && !isPasswordVisible}
            className={cn(
              "flex-1 py-[12px]",
              props.type === "textarea" && "h-[140px]",
              // (props.errorMessage || props.errorComponent) &&
              //   "text-destructive",
              props.inputStyles,
            )}
            {...props}
            {...additionalProps}
          />
        </View>
        {rightIcon && (
          <Pressable
            disabled={
              !(
                props.type === "chat" ||
                props.type === "search" ||
                props.type === "password"
              )
            }
            onPress={handleRightIconPress}
          >
            {rightIcon}
          </Pressable>
        )}
      </View>
      {props.errorMessage && (
        <View className="flex-row items-center gap-[5px] mt-[10px]">
          <InfoCircleIcon fill="#FF5050" />
          <Text
            variant="bodyText3"
            className={cn("text-destructive", props.errorMessageStyles)}
          >
            {props.errorMessage}
          </Text>
        </View>
      )}
      {props.errorComponent && props.errorComponent}
    </View>
  );
}
