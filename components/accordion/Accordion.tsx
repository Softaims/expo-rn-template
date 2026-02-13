import { useState } from "react";
import { View, Pressable, LayoutAnimation, Platform, UIManager } from "react-native";
import { Text } from "@/components/text";
import { cn } from "@/lib/utils";
import { MinusIcon, PlusIcon } from "@/assets/icons";

// Enable LayoutAnimation on Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export interface AccordionItemData {
  id: string;
  title: string;
  content: string;
}

export interface AccordionProps {
  items: AccordionItemData[];
  openIcon?: React.ReactNode;
  closedIcon?: React.ReactNode;
  containerStyles?: string;
  itemContainerStyles?: string;
  headerStyles?: string;
  titleStyles?: string;
  contentStyles?: string;
  iconStyles?: string;
  allowMultiple?: boolean;
  defaultOpenIds?: string[];
}

export function Accordion({
  items,
  openIcon,
  closedIcon,
  containerStyles,
  itemContainerStyles,
  headerStyles,
  titleStyles,
  contentStyles,
  iconStyles,
  allowMultiple = false,
  defaultOpenIds = [],
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set(defaultOpenIds));

  const toggleItem = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        if (!allowMultiple) {
          newSet.clear();
        }
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <View className={cn("", containerStyles)}>
      {items.map((item, index) => {
        const isOpen = openItems.has(item.id);
        const isLast = index === items.length - 1;

        return (
          <View
            key={item.id}
            className={cn(
              "border-b border-border",
              isLast && "border-b-0",
              itemContainerStyles
            )}
          >
            <Pressable
              onPress={() => toggleItem(item.id)}
              className={cn(
                "flex-row items-center justify-between py-4",
                headerStyles
              )}
            >
              <Text
                className={cn(
                  "flex-1 text-base font-bold text-foreground pr-4",
                  titleStyles
                )}
              >
                {item.title}
              </Text>
              <View className={cn("bg-muted rounded-full p-1", iconStyles)}>
                {isOpen
                  ? openIcon || <MinusIcon width={20} height={20} color="#000" />
                  : closedIcon || <PlusIcon width={20} height={20} stroke="#000" />}
              </View>
            </Pressable>

            {isOpen && (
              <View className="pb-4">
                <Text
                  className={cn(
                    "text-sm text-muted-foreground leading-5",
                    contentStyles
                  )}
                >
                  {item.content}
                </Text>
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
}
