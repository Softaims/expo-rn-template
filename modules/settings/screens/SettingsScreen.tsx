import { View, ScrollView } from "react-native";
import {
  SettingsItem,
  AvatarContainer,
} from "@/modules/settings/components";
import { ScreenHeader } from "@/components/headers";
import { Text } from "@/components/text";
import { Toggle } from "@/components/toggle";
import { Button } from "@/components/buttons/Button";
import {
  PersonIcon,
  LockIcon,
  EditIcon,
  CardIcon,
  NotificationIcon,
  MoonIcon,
  DocumentIcon,
  InfoCircleIcon,
  HelpCircleIcon,
  PhoneIcon,
  ChevronRightIcon,
  TrashIcon,
} from "@/assets/icons";
import { showDeleteAccountAlert, showLogoutAlert } from "@/components/alerts";
import { useState } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { SettingsScreenProps } from "../types";

export function SettingsScreen({
  settingsHeaderVariant = "default",
}: SettingsScreenProps) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Custom Header */}
      <ScreenHeader
        title="Settings"
        onBackPress={() => router.back()}
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

          {/* General Settings */}
          <Text className="text-lg font-semibold text-muted-foreground mb-4">
            General Settings
          </Text>

          <View>
            <SettingsItem
              leftIcon={<PersonIcon width={24} height={24} stroke="#000" />}
              text="Edit Profile"
              rightIcon={
                <ChevronRightIcon width={24} height={24} stroke="#000" />
              }
              onPress={() => router.push("/(profile)/edit-profile")}
            />

            <SettingsItem
              leftIcon={<LockIcon width={24} height={24} fill="#000" />}
              text="Change Password"
              rightIcon={
                <ChevronRightIcon width={24} height={24} stroke="#000" />
              }
              onPress={() => router.push("/change-password")}
            />

            <SettingsItem
              leftIcon={<CardIcon width={24} height={24} stroke="#000" />}
              text="Subscription"
              rightIcon={
                <ChevronRightIcon width={24} height={24} stroke="#000" />
              }
              onPress={() => console.log("Subscription")}
            />

            <SettingsItem
              leftIcon={
                <NotificationIcon width={24} height={24} stroke="#000" />
              }
              text="Notifications"
              rightIcon={
                <Toggle
                  value={notificationsEnabled}
                  onValueChange={setNotificationsEnabled}
                />
              }
            />

            <SettingsItem
              leftIcon={<MoonIcon width={24} height={24} stroke="#000" />}
              text="Dark Mode"
              rightIcon={
                <Toggle
                  value={darkModeEnabled}
                  onValueChange={setDarkModeEnabled}
                />
              }
            />
          </View>

          <Text className="text-lg font-semibold text-muted-foreground mb-4">
            Support
          </Text>

          <View>
            <SettingsItem
              leftIcon={<DocumentIcon width={24} height={24} color="#000" />}
              text="Terms & Conditions"
              rightIcon={
                <ChevronRightIcon width={24} height={24} stroke="#000" />
              }
              onPress={() => router.push("/(legal)/terms-and-conditions")}
            />

            <SettingsItem
              leftIcon={<InfoCircleIcon width={24} height={24} fill="#000" />}
              text="Privacy Policy"
              rightIcon={
                <ChevronRightIcon width={24} height={24} stroke="#000" />
              }
              onPress={() => router.push("/(legal)/privacy-policy")}
            />

            <SettingsItem
              leftIcon={<HelpCircleIcon width={24} height={24} stroke="#000" />}
              text="FAQ's"
              rightIcon={
                <ChevronRightIcon width={24} height={24} stroke="#000" />
              }
              onPress={() => router.push("/(faq)/faq")}
            />

            <SettingsItem
              leftIcon={<PhoneIcon width={24} height={24} fill="#000" />}
              text="Contact Us"
              rightIcon={
                <ChevronRightIcon width={24} height={24} stroke="#000" />
              }
              onPress={() => router.push("/(contact)/contact-us")}
            />
          </View>

          {/* Account Section */}
          <Text className="text-lg font-semibold text-muted-foreground mb-4">
            Account
          </Text>

          <SettingsItem
            leftIcon={<TrashIcon width={24} height={24} stroke="#EF4444" />}
            text="Delete Account"
            rightIcon={
              <ChevronRightIcon width={24} height={24} stroke="#000" />
            }
            onPress={() => showDeleteAccountAlert(
              () => {
                // TODO: Implement account deletion
                console.log("Account deleted");
              },
              () => {
                console.log("Deletion cancelled");
              }
            )}
          />

          <Button
            title="Logout Account"
            variant="primary"
            size="lg"
            onPress={() => showLogoutAlert(
              () => {
                // TODO: Implement logout
                console.log("Logged out");
              },
              () => {
                console.log("Logout cancelled");
              }
            )}
            containerStyles="bg-foreground mt-4"
            textStyles="text-background"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
