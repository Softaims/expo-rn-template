import {
  Pressable,
  View,
  ViewStyle,
  TextStyle,
  ScrollView,
  TextInput,
} from "react-native";
import { cn } from "@/lib/utils";
import { Text, Checkbox } from "@/components";
import { useState, useMemo } from "react";
import { getElementClasses } from "@/lib/component-styles";
import { SelectedItem, SelectedItemProps } from "./SelectedItem";

const getViewStyle = (styles: any, key: string): ViewStyle | undefined => {
  return styles?.[key] as ViewStyle | undefined;
};

const getTextStyle = (styles: any, key: string): TextStyle | undefined => {
  return styles?.[key] as TextStyle | undefined;
};

const dropdownVariants = {
  trigger: {
    base: "flex-row items-center justify-between px-4 py-3 rounded-lg border-2 border-border bg-background min-h-[48px]",
    hover: "border-primary bg-muted/30",
    disabled: "opacity-50 bg-muted border-muted-foreground",
    open: "border-primary bg-primary/5",
  },
  placeholder: "text-base text-muted-foreground",
  selectedText: "text-base text-foreground",
  dropdown: {
    base: "absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-lg z-50",
  },
  searchInput: {
    base: "px-4 py-3 border-b border-border text-base text-foreground bg-background",
  },
  optionsList: "py-2",
  option: {
    base: "px-4 py-3 flex-row items-center",
    hover: "bg-muted",
    selected: "bg-muted",
  },
  optionText: {
    base: "text-base text-foreground",
    disabled: "text-muted-foreground opacity-50",
  },
  selectedItemsWrapper: "flex-row flex-wrap gap-2 mt-2",
  multiSelectTriggerContent: "flex-row flex-wrap gap-2 flex-1",
} as const;

export interface DropdownOption {
  label: string;
  value: string;
  disabled?: boolean;
}

type DropdownElements =
  | "container"
  | "trigger"
  | "placeholder"
  | "selectedText"
  | "chevron"
  | "dropdown"
  | "searchInput"
  | "optionsList"
  | "option"
  | "optionText"
  | "selectedItemsWrapper"
  | "multiSelectTriggerContent";

export interface DropdownProps {
  placeholder?: string;
  searchPlaceholder?: string;
  options: DropdownOption[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  onOpen?: () => void;
  onClose?: () => void;
  disabled?: boolean;
  searchable?: boolean;
  autoSuggest?: boolean;
  multiSelect?: boolean;
  closeOnSelect?: boolean;
  maxHeight?: number;
  emptyMessage?: string;
  chevronIcon?: React.ReactNode;
  className?: string;
  style?: ViewStyle;
  placeholderTextColor?: string;
  selectedItemProps?: Partial<SelectedItemProps>;
  classes?: Partial<Record<DropdownElements, string>>;
  styles?: {
    container?: ViewStyle;
    trigger?: ViewStyle;
    placeholder?: TextStyle;
    selectedText?: TextStyle;
    chevron?: ViewStyle;
    dropdown?: ViewStyle;
    searchInput?: TextStyle;
    optionsList?: ViewStyle;
    option?: ViewStyle;
    optionText?: TextStyle;
    selectedItemsWrapper?: ViewStyle;
    multiSelectTriggerContent?: ViewStyle;
  };
}

export function Dropdown({
  placeholder = "Select",
  searchPlaceholder = "Search...",
  options,
  value,
  onChange,
  onOpen,
  onClose,
  disabled = false,
  searchable = false,
  autoSuggest = false,
  multiSelect = false,
  closeOnSelect = true,
  maxHeight = 300,
  emptyMessage = "No options found",
  chevronIcon,
  className,
  style,
  placeholderTextColor,
  selectedItemProps,
  classes,
  styles,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const selectedValues = useMemo(() => {
    if (multiSelect && Array.isArray(value)) {
      return value;
    }
    if (!multiSelect && typeof value === "string") {
      return [value];
    }
    return [];
  }, [value, multiSelect]);

  const filteredOptions = useMemo(() => {
    if (!searchQuery) return options;
    return options.filter((option) =>
      option.label.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [options, searchQuery]);

  const selectedLabels = useMemo(() => {
    return selectedValues
      .map((val) => options.find((opt) => opt.value === val)?.label)
      .filter(Boolean) as string[];
  }, [selectedValues, options]);

  const handleToggle = () => {
    if (disabled) return;
    const newOpenState = !isOpen;
    setIsOpen(newOpenState);

    if (newOpenState) {
      onOpen?.();
    } else {
      onClose?.();
      setSearchQuery("");
    }
  };

  const handleSelect = (optionValue: string) => {
    if (multiSelect) {
      const currentValues = Array.isArray(value) ? value : [];
      const newValues = currentValues.includes(optionValue)
        ? currentValues.filter((v) => v !== optionValue)
        : [...currentValues, optionValue];
      onChange?.(newValues);
    } else {
      onChange?.(optionValue);
      if (closeOnSelect) {
        setIsOpen(false);
        onClose?.();
        setSearchQuery("");
      }
    }
  };

  const handleRemoveSelectedItem = (valueToRemove: string) => {
    if (multiSelect && Array.isArray(value)) {
      const newValues = value.filter((v) => v !== valueToRemove);
      onChange?.(newValues);
    }
  };

  const getTriggerStyle = () => {
    if (disabled) return dropdownVariants.trigger.disabled;
    if (isOpen) return dropdownVariants.trigger.open;
    if (isHovered) return dropdownVariants.trigger.hover;
    return "";
  };

  return (
    <View
      className={getElementClasses(classes, "container", className || "")}
      style={[style, getViewStyle(styles, "container")]}
    >
      {multiSelect && selectedValues.length > 0 && (
        <View
          className={getElementClasses(
            classes,
            "selectedItemsWrapper",
            dropdownVariants.selectedItemsWrapper,
          )}
          style={getViewStyle(styles, "selectedItemsWrapper")}
        >
          {selectedValues.map((optionValue) => {
            const option = options.find((opt) => opt.value === optionValue);
            if (!option?.label) return null;
            return (
              <SelectedItem
                key={optionValue}
                label={option.label}
                onRemove={() => handleRemoveSelectedItem(optionValue)}
                {...selectedItemProps}
              />
            );
          })}
        </View>
      )}

      <Pressable
        onPress={handleToggle}
        onPressIn={() => setIsHovered(true)}
        onPressOut={() => setIsHovered(false)}
        disabled={disabled}
        className={getElementClasses(
          classes,
          "trigger",
          cn(dropdownVariants.trigger.base, getTriggerStyle()),
        )}
        style={getViewStyle(styles, "trigger")}
      >
        <View className="flex-1">
          {selectedValues.length > 0 && !multiSelect ? (
            <Text
              className={getElementClasses(
                classes,
                "selectedText",
                dropdownVariants.selectedText,
              )}
              style={getTextStyle(styles, "selectedText")}
            >
              {selectedLabels[0]}
            </Text>
          ) : autoSuggest && isOpen ? (
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder={placeholder}
              placeholderTextColor={placeholderTextColor}
              className={getElementClasses(
                classes,
                "searchInput",
                "text-base text-foreground",
              )}
              style={getTextStyle(styles, "searchInput")}
              autoFocus
            />
          ) : (
            <Text
              className={getElementClasses(
                classes,
                "placeholder",
                dropdownVariants.placeholder,
              )}
              style={getTextStyle(styles, "placeholder")}
            >
              {placeholder}
            </Text>
          )}
        </View>
        {chevronIcon && (
          <View
            className={getElementClasses(classes, "chevron", "ml-2")}
            style={[
              isOpen && { transform: [{ rotate: "180deg" }] },
              getViewStyle(styles, "chevron"),
            ]}
          >
            {chevronIcon}
          </View>
        )}
      </Pressable>

      {isOpen && (
        <View
          className={getElementClasses(
            classes,
            "dropdown",
            dropdownVariants.dropdown.base,
          )}
          style={[
            { maxHeight },
            getViewStyle(styles, "dropdown"),
          ]}
        >
          {searchable && !autoSuggest && (
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder={searchPlaceholder}
              placeholderTextColor={placeholderTextColor}
              className={getElementClasses(
                classes,
                "searchInput",
                dropdownVariants.searchInput.base,
              )}
              style={getTextStyle(styles, "searchInput")}
            />
          )}
          <ScrollView
            className={getElementClasses(
              classes,
              "optionsList",
              dropdownVariants.optionsList,
            )}
            style={getViewStyle(styles, "optionsList")}
          >
            {filteredOptions.length === 0 ? (
              <View className="px-4 py-3">
                <Text className="text-muted-foreground text-center">
                  {emptyMessage}
                </Text>
              </View>
            ) : (
              filteredOptions.map((option) => {
              const isSelected = selectedValues.includes(option.value);
              const isHoveredItem = hoveredOption === option.value;

              return (
                <Pressable
                  key={option.value}
                  onPress={() => !option.disabled && handleSelect(option.value)}
                  onPressIn={() => setHoveredOption(option.value)}
                  onPressOut={() => setHoveredOption(null)}
                  disabled={option.disabled}
                  className={getElementClasses(
                    classes,
                    "option",
                    cn(
                      dropdownVariants.option.base,
                      (isSelected || isHoveredItem) &&
                        dropdownVariants.option.hover,
                    ),
                  )}
                  style={getViewStyle(styles, "option")}
                >
                  {multiSelect ? (
                    <Checkbox
                      label={option.label}
                      checked={isSelected}
                      disabled={option.disabled}
                      onCheckedChange={() =>
                        !option.disabled && handleSelect(option.value)
                      }
                    />
                  ) : (
                    <Text
                      className={getElementClasses(
                        classes,
                        "optionText",
                        cn(
                          dropdownVariants.optionText.base,
                          option.disabled &&
                            dropdownVariants.optionText.disabled,
                        ),
                      )}
                      style={getTextStyle(styles, "optionText")}
                    >
                      {option.label}
                    </Text>
                  )}
                </Pressable>
              );
            }))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}
