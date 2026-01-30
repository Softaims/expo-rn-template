import { Pressable, View, ViewStyle, TextStyle } from "react-native";
import { cn } from "@/lib/utils";
import { Text } from "@/components";
import { getElementClasses } from "@/lib/component-styles";

const getViewStyle = (styles: any, key: string): ViewStyle | undefined => {
  return styles?.[key] as ViewStyle | undefined;
};

const getTextStyle = (styles: any, key: string): TextStyle | undefined => {
  return styles?.[key] as TextStyle | undefined;
};

const selectedItemVariants = {
  container: {
    base: "flex-row items-center gap-2 px-3 py-1.5 rounded-md",
    normal: "bg-muted",
    disabled: "bg-muted opacity-50",
  },
  label: {
    base: "text-sm",
    normal: "text-foreground",
    disabled: "text-muted-foreground",
  },
  closeButton: "w-4 h-4 items-center justify-center",
  closeIcon: "text-foreground text-xs",
} as const;

type SelectedItemElements = "container" | "label" | "closeButton" | "closeIcon";

export interface SelectedItemProps {
  label: string;
  onRemove?: () => void;
  disabled?: boolean;
  showClose?: boolean;
  closeIcon?: React.ReactNode;
  className?: string;
  style?: ViewStyle;
  classes?: Partial<Record<SelectedItemElements, string>>;
  styles?: {
    container?: ViewStyle;
    label?: TextStyle;
    closeButton?: ViewStyle;
    closeIcon?: TextStyle;
  };
}

export function SelectedItem({
  label,
  onRemove,
  disabled = false,
  showClose = true,
  closeIcon,
  className,
  style,
  classes,
  styles,
}: SelectedItemProps) {
  const getContainerStyle = () => {
    return disabled
      ? selectedItemVariants.container.disabled
      : selectedItemVariants.container.normal;
  };

  const getLabelStyle = () => {
    return disabled
      ? selectedItemVariants.label.disabled
      : selectedItemVariants.label.normal;
  };

  return (
    <View
      className={getElementClasses(
        classes,
        "container",
        cn(
          selectedItemVariants.container.base,
          getContainerStyle(),
          className
        )
      )}
      style={[style, getViewStyle(styles, "container")]}
    >
      <Text
        className={getElementClasses(
          classes,
          "label",
          cn(selectedItemVariants.label.base, getLabelStyle())
        )}
        style={getTextStyle(styles, "label")}
      >
        {label}
      </Text>
      {showClose && onRemove && closeIcon && (
        <Pressable
          onPress={onRemove}
          disabled={disabled}
          className={getElementClasses(
            classes,
            "closeButton",
            selectedItemVariants.closeButton
          )}
          style={getViewStyle(styles, "closeButton")}
        >
          <View>
            {closeIcon}
          </View>
        </Pressable>
      )}
    </View>
  );
}
