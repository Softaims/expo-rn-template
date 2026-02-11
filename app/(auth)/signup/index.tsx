import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import { AuthHeader } from "@/app/(auth)/_components";
import { SignupContent } from "./_components";

export default function SignupScreen() {
  const variant = "bottom-sheet";
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(true);
  const enableBackdropDismiss = false;

  // Reset bottom sheet visibility when screen comes back into focus
  useFocusEffect(
    useCallback(() => {
      setIsBottomSheetVisible(true);
    }, [])
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 16 }}
      >
        {variant !== "bottom-sheet" && <AuthHeader />}
        <View className="flex-1 pt-7">
          <SignupContent
            variant={variant}
            isVisible={isBottomSheetVisible}
            setIsVisible={setIsBottomSheetVisible}
            enableBackdropDismiss={enableBackdropDismiss}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
