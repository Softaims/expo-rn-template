import { useState, useMemo } from "react";
import { useDeleteAccount, useSignOut } from "@/modules/auth/hooks/useClerkAuth";
import { showDeleteAccountAlert, showLogoutAlert } from "@/components/alerts/alertHelpers";
import type { ActionHandlers, ToggleStates } from "@/modules/settings/components";

export function useSettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [notificationPermissionVisible, setNotificationPermissionVisible] = useState(false);

  const { deleteAccount } = useDeleteAccount();
  const { signOut } = useSignOut();

  const actionHandlers: ActionHandlers = useMemo(() => ({
    showNotificationSheet: () => {
      setNotificationPermissionVisible(true);
    },
    deleteAccount: () => {
      showDeleteAccountAlert(async () => {
        await deleteAccount();
      });
    },
    logout: () => {
      showLogoutAlert(async () => {
        await signOut();
      });
    },
  }), [deleteAccount, signOut]);

  const toggleStates: ToggleStates = useMemo(() => ({
    notifications: {
      value: notificationsEnabled,
      onValueChange: (value: boolean) => {
        setNotificationsEnabled(value);
        if (value) {
          setNotificationPermissionVisible(true);
        }
      },
    },
  }), [notificationsEnabled]);

  const handleNotificationContinue = () => {
    setNotificationPermissionVisible(false);
  };

  const handleNotificationMaybeLater = () => {
    setNotificationsEnabled(false);
    setNotificationPermissionVisible(false);
  };

  return {
    notificationPermissionVisible,
    setNotificationPermissionVisible,
    actionHandlers,
    toggleStates,
    handleNotificationContinue,
    handleNotificationMaybeLater,
  };
}
