import {
  Pressable,
  View,
  ScrollView,
  TextInput,
} from "react-native";
import { cn } from "@/lib/utils";
import { Text, Checkbox } from "@/components";
import { useState, useMemo } from "react";
import { SelectedItem } from "./SelectedItem";

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
  placeholderTextColor?: string;

  // Simple Tailwind class styling for 12 sub-elements
  containerStyles?: string;
  triggerStyles?: string;
  placeholderStyles?: string;
  selectedTextStyles?: string;
  chevronStyles?: string;
  dropdownStyles?: string;
  searchInputStyles?: string;
  optionsListStyles?: string;
  optionStyles?: string;
  optionTextStyles?: string;
  selectedItemsWrapperStyles?: string;

  // Flatten SelectedItem customization
  selectedItemContainerStyles?: string;
  selectedItemLabelStyles?: string;
  selectedItemCloseIcon?: React.ReactNode;
  selectedItemCloseButtonStyles?: string;
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
  placeholderTextColor,
  containerStyles,
  triggerStyles,
  placeholderStyles,
  selectedTextStyles,
  chevronStyles,
  dropdownStyles,
  searchInputStyles,
  optionsListStyles,
  optionStyles,
  optionTextStyles,
  selectedItemsWrapperStyles,
  selectedItemContainerStyles,
  selectedItemLabelStyles,
  selectedItemCloseIcon,
  selectedItemCloseButtonStyles,
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
    <View className={cn(containerStyles)}>
      {multiSelect && selectedValues.length > 0 && (
        <View className={cn(dropdownVariants.selectedItemsWrapper, selectedItemsWrapperStyles)}>
          {selectedValues.map((optionValue) => {
            const option = options.find((opt) => opt.value === optionValue);
            if (!option?.label) return null;
            return (
              <SelectedItem
                key={optionValue}
                label={option.label}
                onRemove={() => handleRemoveSelectedItem(optionValue)}
                closeIcon={selectedItemCloseIcon}
                containerStyles={selectedItemContainerStyles}
                labelStyles={selectedItemLabelStyles}
                closeButtonStyles={selectedItemCloseButtonStyles}
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
        className={cn(dropdownVariants.trigger.base, getTriggerStyle(), triggerStyles)}
      >
        <View className="flex-1">
          {selectedValues.length > 0 && !multiSelect ? (
            <Text className={cn(dropdownVariants.selectedText, selectedTextStyles)}>
              {selectedLabels[0]}
            </Text>
          ) : autoSuggest && isOpen ? (
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder={placeholder}
              placeholderTextColor={placeholderTextColor}
              className={cn("text-base text-foreground", searchInputStyles)}
              autoFocus
            />
          ) : (
            <Text className={cn(dropdownVariants.placeholder, placeholderStyles)}>
              {placeholder}
            </Text>
          )}
        </View>
        {chevronIcon && (
          <View
            className={cn("ml-2", chevronStyles)}
            style={isOpen ? { transform: [{ rotate: "180deg" }] } : undefined}
          >
            {chevronIcon}
          </View>
        )}
      </Pressable>

      {isOpen && (
        <View
          className={cn(dropdownVariants.dropdown.base, dropdownStyles)}
          style={{ maxHeight }}
        >
          {searchable && !autoSuggest && (
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder={searchPlaceholder}
              placeholderTextColor={placeholderTextColor}
              className={cn(dropdownVariants.searchInput.base, searchInputStyles)}
            />
          )}
          <ScrollView className={cn(dropdownVariants.optionsList, optionsListStyles)}>
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
                  className={cn(
                    dropdownVariants.option.base,
                    (isSelected || isHoveredItem) && dropdownVariants.option.hover,
                    optionStyles
                  )}
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
                      className={cn(
                        dropdownVariants.optionText.base,
                        option.disabled && dropdownVariants.optionText.disabled,
                        optionTextStyles
                      )}
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
