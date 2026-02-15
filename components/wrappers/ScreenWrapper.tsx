import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { cn } from "@/lib/utils";

export function ScreenWrapper({ children, containerStyles }: { children: React.ReactNode, containerStyles?: string }) {
    const { top, bottom } = useSafeAreaInsets();
    return (
        <View className={cn("flex-1 bg-background px-[16px]", containerStyles)} style={{ paddingTop: top, paddingBottom: bottom }}>
            {children}
        </View>
    );
}