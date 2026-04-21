import { useTheme } from "@/lib/theme";
import { createStyles } from "./styles";
import { useEffect, useMemo, useRef, useState } from "react";
import { Text as RNText, ScrollView, TextInput, TextStyle, TouchableOpacity, View } from "react-native";
import { Dropdown as ElementDropdown, MultiSelect } from "react-native-element-dropdown";

export interface DropdownOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface DropdownProps {
  placeholder?: string;
  searchPlaceholder?: string;
  options: DropdownOption[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  disabled?: boolean;
  searchable?: boolean;
  autoComplete?: boolean;
  multiSelect?: boolean;
  showCheckbox?: boolean;
  maxHeight?: number;

  // Icons
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;

  // Selected pill/tag customization for multi-select
  selectedItemTextStyle?: TextStyle;
  selectedItemIcon?: React.ReactNode;

  // Checkbox customization
  checkboxCheckedColor?: string;
  checkboxUncheckedColor?: string;
  checkboxSize?: number;

  // Style overrides
  containerStyle?: object;
  dropdownStyle?: object;
  placeholderStyle?: object;
  selectedTextStyle?: object;
  inputSearchStyle?: object;
  itemContainerStyle?: object;
  itemTextStyle?: object;
  selectedItemStyle?: object;
}



export function Dropdown({
  placeholder = "Select",
  searchPlaceholder = "Search...",
  options,
  value,
  onChange,
  onFocus,
  onBlur,
  disabled = false,
  searchable = false,
  autoComplete = false,
  multiSelect = false,
  showCheckbox = false,
  maxHeight = 150,

  leftIcon,
  rightIcon,
  selectedItemTextStyle,
  selectedItemIcon,

  checkboxCheckedColor = "#000",
  checkboxUncheckedColor = "#D1D1D6",
  checkboxSize = 15,
  
  containerStyle,
  dropdownStyle,

  placeholderStyle,
  selectedTextStyle,
  inputSearchStyle,

  itemContainerStyle,
  itemTextStyle,
  selectedItemStyle,
}: DropdownProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (autoComplete && value && typeof value === "string") {
      const selectedOption = options.find(opt => opt.value === value);
      if (selectedOption) {
        setInputValue(selectedOption.label);
      }
    }
  }, [value, options, autoComplete]);

  const filteredOptions = autoComplete && inputValue
    ? options.filter(option =>
        option.label.toLowerCase().includes(inputValue.toLowerCase())
      )
    : options;

  const focusedBorderStyle = isFocused
    ? { borderColor: colors.text }
    : {};

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  const renderItem = (item: DropdownOption) => {
    const isSelected = multiSelect && Array.isArray(value)
      ? value.includes(item.value)
      : value === item.value;

    return (
      <View style={[styles.itemContainerStyle, itemContainerStyle]}>
        {showCheckbox && multiSelect && (
          <View style={styles.checkboxContainer}>
            <View
              style={[
                styles.checkbox,
                {
                  width: checkboxSize,
                  height: checkboxSize,
                  borderRadius: checkboxSize * 0.2,
                  borderColor: isSelected ? checkboxCheckedColor : checkboxUncheckedColor,
                  backgroundColor: isSelected ? checkboxCheckedColor : "transparent",
                },
              ]}
            >
              {isSelected && (
                <RNText style={[styles.checkmark, { fontSize: checkboxSize * 0.7 }]}>✓</RNText>
              )}
            </View>
          </View>
        )}
        <RNText style={[styles.itemTextStyle, itemTextStyle]}>{item.label}</RNText>
      </View>
    );
  };

  const renderSelectedItem = (item: DropdownOption, unSelect?: (item: any) => void) => {
    return (
      <View style={[styles.selectedStyle, selectedItemStyle]}>
        <RNText style={[styles.selectedTextStylePill, selectedItemTextStyle]}>
          {item.label}
        </RNText>
        {selectedItemIcon && (
          <TouchableOpacity
            onPress={() => unSelect?.(item)}
            style={styles.iconContainer}
          >
            {selectedItemIcon}
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const mergedPlaceholderStyle = {
    ...styles.placeholderStyle,
    ...placeholderStyle,
  };

  const renderLeftIcon = leftIcon ? () => <View style={styles.iconWrapper}>{leftIcon}</View> : undefined;
  const renderRightIcon = rightIcon ? () => <View style={styles.iconWrapper}>{rightIcon}</View> : undefined;

  // Autocomplete mode
  if (autoComplete && !multiSelect) {
    return (
      <View style={[styles.container, containerStyle]}>
        <View style={styles.autocompleteWrapper}>
          <TextInput
            ref={inputRef}
            style={[styles.dropdown, styles.autocompleteInput, focusedBorderStyle, dropdownStyle]}
            placeholder={placeholder}
            placeholderTextColor={mergedPlaceholderStyle.color as string}
            value={inputValue}
            onChangeText={(text) => {
              setInputValue(text);
              setShowSuggestions(true);
            }}
            onFocus={() => {
              setIsFocused(true);
              setShowSuggestions(true);
              onFocus?.();
            }}
            onBlur={() => {
              setTimeout(() => {
                setIsFocused(false);
                setShowSuggestions(false);
                onBlur?.();
              }, 200);
            }}
            editable={!disabled}
          />

          {showSuggestions && filteredOptions.length > 0 && (
            <View style={[styles.suggestionsContainer, { maxHeight }]}>
              <ScrollView keyboardShouldPersistTaps="handled" nestedScrollEnabled>
                {filteredOptions.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    style={[styles.suggestionItem, itemContainerStyle]}
                    onPress={() => {
                      setInputValue(option.label);
                      onChange?.(option.value);
                      setShowSuggestions(false);
                      inputRef.current?.blur();
                    }}
                    disabled={option.disabled}
                  >
                    <RNText style={[styles.itemTextStyle, itemTextStyle]}>
                      {option.label}
                    </RNText>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>
      </View>
    );
  }

  // Multi-select mode
  if (multiSelect) {
    return (
      <View style={[styles.container, containerStyle]}>
        <MultiSelect
          data={options}
          labelField="label"
          valueField="value"
          placeholder={placeholder}
          searchPlaceholder={searchPlaceholder}
          value={Array.isArray(value) ? value : []}
          onChange={(items) => onChange?.(items)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disable={disabled}
          search={searchable}
          maxHeight={maxHeight}
          style={[styles.dropdown, focusedBorderStyle, dropdownStyle]}
          placeholderStyle={mergedPlaceholderStyle}
          selectedTextStyle={[styles.selectedTextStyle, selectedTextStyle]}
          inputSearchStyle={[styles.inputSearchStyle, inputSearchStyle]}
          renderItem={renderItem}
          renderInputSearch={()=><TextInput style={styles.inputSearchStyle} />}
          renderSelectedItem={renderSelectedItem}
          renderLeftIcon={renderLeftIcon}
          renderRightIcon={renderRightIcon}
          activeColor="#fff"
        />
      </View>
    );
  }

  // Single-select mode
  return (
    <View style={[styles.container, containerStyle]}>
      <ElementDropdown
        data={options}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        searchPlaceholder={searchPlaceholder}
        value={typeof value === "string" ? value : ""}
        onChange={(item) => onChange?.(item.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disable={disabled}
        search={searchable}
        maxHeight={maxHeight}
        style={[styles.dropdown, focusedBorderStyle, dropdownStyle]}
        placeholderStyle={mergedPlaceholderStyle}
        selectedTextStyle={[styles.selectedTextStyle, selectedTextStyle]}
        inputSearchStyle={[styles.inputSearchStyle, inputSearchStyle]}
        renderItem={renderItem}
        // renderLeftIcon={renderLeftIcon}
        renderRightIcon={renderRightIcon}
        activeColor="#f0f0f0"
      />
    </View>
  );
}