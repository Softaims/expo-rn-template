import { View, ScrollView } from "react-native";
import {
  SettingsItem,
  AvatarContainer,
} from "@/modules/settings/components";
import { ScreenHeader } from "@/components/headers";
import { Text } from "@/components/text";
import { Toggle } from "@/components/toggle";
import { Button } from "@/components/buttons/Button";
import { ChevronRightIcon } from "@/assets/icons";
import { showDeleteAccountAlert, showLogoutAlert } from "@/components/alerts";
import { PermissionSheet } from "@/components/bottomSheets";
import { useState } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { SettingsScreenProps } from "../types";
import { useAuth } from "@clerk/clerk-expo";
import { settingsItemsConfig, getSettingsIcon } from "../config/settingsConfig";

export function SettingsScreen({
  settingsHeaderVariant = "default",
  settingsItemVariants = "default",
}: SettingsScreenProps) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [notificationPermissionVisible, setNotificationPermissionVisible] = useState(false);
  const router = useRouter();
  const { signOut } = useAuth();

  const handleItemPress = (itemId: string, route?: string) => {
    if (route) {
      router.push(route as any);
    } else if (itemId === "subscription") {
      console.log("Subscription");
    }
  };

  const renderSettingsItem = (itemId: string, config: any) => {
    const { icon, text, route, hasToggle, iconColor } = config;
    const color = iconColor || "#000";

    let rightIcon = <ChevronRightIcon width={24} height={24} stroke="#000" />;

    if (hasToggle) {
      if (itemId === "notifications") {
        rightIcon = (
          <Toggle
            value={notificationsEnabled}
            onValueChange={(value) => {
              setNotificationsEnabled(value);
              if (value) {
                setNotificationPermissionVisible(true);
              }
            }}
          />
        );
      } else if (itemId === "darkMode") {
        rightIcon = (
          <Toggle
            value={darkModeEnabled}
            onValueChange={setDarkModeEnabled}
          />
        );
      }
    }

    const handlePress = () => {
      if (itemId === "deleteAccount") {
        showDeleteAccountAlert(
          () => {
            console.log("Account deleted");
          },
          () => {
            console.log("Deletion cancelled");
          }
        );
      } else {
        handleItemPress(itemId, route);
      }
    };

    return (
      <SettingsItem
        key={itemId}
        leftIcon={getSettingsIcon(icon, color)}
        text={text}
        rightIcon={rightIcon}
        onPress={handlePress}
        variant={settingsItemVariants}
      />
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Custom Header */}
      <ScreenHeader
        title="Settings"
      />

      <ScrollView className="flex-1">
        <View className="px-4 py-6">
          {/* Profile Section */}
          <AvatarContainer
            name="Selena Samia"
            email="selenasamia123@gmail.com"
            avatarSource={{ uri: "https://i.pravatar.cc/150?img=1" }}
            variant={settingsHeaderVariant}
          />

          {/* Settings Sections */}
          {settingsItemsConfig.map((section, sectionIndex) => (
            <View key={section.title}>
              <Text className="text-lg font-semibold text-muted-foreground mb-4">
                {section.title}
              </Text>

              <View className={settingsItemVariants === "container" ? "bg-input border border-border rounded-[10px]" : ""}>
                {section.items.map((item) =>
                  renderSettingsItem(item.id, item)
                )}
              </View>

              {sectionIndex === settingsItemsConfig.length - 1 && (
                <Button
                  title="Logout Account"
                  variant="primary"
                  size="lg"
                  onPress={() =>
                    showLogoutAlert(
                      () => {
                        console.log("Logged out");
                        signOut();
                      },
                      () => {
                        console.log("Logout cancelled");
                      }
                    )
                  }
                  containerStyles="bg-foreground mt-4"
                  textStyles="text-background"
                />
              )}
            </View>
          ))}
        </View>
      </ScrollView>

      <PermissionSheet
        isVisible={notificationPermissionVisible}
        setIsVisible={setNotificationPermissionVisible}
        type="notification"
        variant="modal-with-image"
        onContinue={() => {
          setNotificationPermissionVisible(false);
        }}
        onMaybeLater={() => {
          setNotificationsEnabled(false);
          setNotificationPermissionVisible(false);
        }}
      />
    </SafeAreaView>
  );
}
