import { ScreenWrapper } from "@/components";
import { PermissionSheet } from "@/components/bottomSheets";
import { SettingsButtonSection, AvatarContainer } from "@/modules/settings/components";
import { Stack } from "expo-router";
import { settingsItemsConfig } from "../config/settingsConfig";
import { useSettingsScreen } from "../hooks/useSettingsScreen";

export function SettingsScreen() {
  const {
    notificationPermissionVisible,
    setNotificationPermissionVisible,
    actionHandlers,
    toggleStates,
    handleNotificationContinue,
    handleNotificationMaybeLater,
  } = useSettingsScreen();

  return (
    <ScreenWrapper scrollEnabled headerTransparent>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: "Settings",
        }}
      />

      <AvatarContainer
        name="Selena Samia"
        email="selenasamia123@gmail.com"
        avatarSource={{ uri: "https://i.pravatar.cc/150?img=1" }}
        variant={'default'}
      />

      {settingsItemsConfig.map((section, index) => (
        <SettingsButtonSection
          variant={'seperate'}
          key={index}
          title={section.title}
          items={section.items}
          actionHandlers={actionHandlers}
          toggleStates={toggleStates}
        />
      ))}

      <PermissionSheet
        isVisible={notificationPermissionVisible}
        setIsVisible={setNotificationPermissionVisible}
        type="notification"
        variant="modal-with-image"
        onContinue={handleNotificationContinue}
        onMaybeLater={handleNotificationMaybeLater}
      />
    </ScreenWrapper>
  );
}
