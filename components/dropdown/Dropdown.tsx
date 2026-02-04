import { View, StyleSheet, TextStyle, Text as RNText, TouchableOpacity, TextInput, ScrollView, Pressable } from "react-native";
import { Dropdown as ElementDropdown, MultiSelect } from "react-native-element-dropdown";
import { fontFamilies } from "@/hooks/useFonts";
import { useState, useRef, useEffect } from "react";

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
  placeholderTextColor?: string;

  // Selected pill/tag customization for multi-select
  selectedPillTextStyle?: TextStyle;
  selectedBg?: string;
  selectedIcon?: React.ReactNode;

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
  placeholderTextColor,
  selectedPillTextStyle,
  selectedBg,
  selectedIcon,
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
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  // Update input value when value prop changes
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

  const focusedBorderStyle = isFocused ? { borderColor: "#000000" } : {};
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
    const pillBgStyle = selectedBg ? { backgroundColor: selectedBg } : {};

    return (
      <View style={[styles.selectedStyle, pillBgStyle, selectedItemStyle]}>
        <RNText style={[styles.selectedTextStylePill, selectedPillTextStyle]}>
          {item.label}
        </RNText>
        {selectedIcon && (
          <TouchableOpacity
            onPress={() => unSelect?.(item)}
            style={styles.iconContainer}
          >
            {selectedIcon}
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const mergedPlaceholderStyle = {
    ...styles.placeholderStyle,
    ...(placeholderTextColor ? { color: placeholderTextColor } : {}),
    ...(placeholderStyle || {}),
  };

  // Custom autocomplete mode with text input
  if (autoComplete && !multiSelect) {
    return (
      <View style={[styles.container, containerStyle]}>
        <View style={styles.autocompleteWrapper}>
          <TextInput
            ref={inputRef}
            style={[styles.dropdown, styles.autocompleteInput, focusedBorderStyle, dropdownStyle]}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor || "#999999"}
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
              // Delay to allow selection
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
              <ScrollView
                keyboardShouldPersistTaps="handled"
                nestedScrollEnabled
              >
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
          onFocus={() => {
            setIsFocused(true);
            onFocus?.();
          }}
          onBlur={() => {
            setIsFocused(false);
            onBlur?.();
          }}
          disable={disabled}
          search={searchable}
          maxHeight={maxHeight}
          style={[styles.dropdown, focusedBorderStyle, dropdownStyle]}
          placeholderStyle={mergedPlaceholderStyle}
          selectedTextStyle={[styles.selectedTextStyle, selectedTextStyle]}
          inputSearchStyle={[styles.inputSearchStyle, inputSearchStyle]}
          renderItem={renderItem}
          renderSelectedItem={renderSelectedItem}
          activeColor="#fff"
        />
      </View>
    );
  }

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
        onFocus={() => {
          setIsFocused(true);
          onFocus?.();
        }}
        onBlur={() => {
          setIsFocused(false);
          onBlur?.();
        }}
        disable={disabled}
        search={searchable}
        maxHeight={maxHeight}
        style={[styles.dropdown, focusedBorderStyle, dropdownStyle]}
        placeholderStyle={mergedPlaceholderStyle}
        selectedTextStyle={[styles.selectedTextStyle, selectedTextStyle]}
        inputSearchStyle={[styles.inputSearchStyle, inputSearchStyle]}
        renderItem={renderItem}
        activeColor="#f0f0f0"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  dropdown: {
    minHeight: 48,
    borderWidth: 2,
    borderColor: "#e5e5e5",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#ffffff",
  },
  placeholderStyle: {
    fontSize: 14,
    color: "#999999",
    fontFamily: fontFamilies.medium,
  },
  selectedTextStyle: {
    fontSize: 14,
    color: "#000000",
    fontFamily: fontFamilies.medium,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
    borderRadius: 8,
    fontFamily: fontFamilies.medium,
  },
  itemContainerStyle: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  itemTextStyle: {
    fontSize: 14,
    color: "#000000",
    fontFamily: fontFamilies.medium,
  },
  selectedStyle: {
    borderRadius: 6,
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  selectedTextStylePill: {
    fontSize: 14,
    color: "#000000",
    fontFamily: fontFamilies.medium,
    marginRight: 8,
  },
  iconContainer: {
    padding: 4,
  },
  checkboxContainer: {
    marginRight: 12,
    width: 24,
  },
  checkbox: {
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  checkmark: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  // Autocomplete styles
  autocompleteWrapper: {
    position: "relative",
    zIndex: 1000,
  },
  autocompleteInput: {
    fontSize: 14,
    color: "#000000",
    fontFamily: fontFamilies.medium,
  },
  suggestionsContainer: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderColor: "#e5e5e5",
    borderRadius: 8,
    marginTop: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 1001,
  },
  suggestionItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
});