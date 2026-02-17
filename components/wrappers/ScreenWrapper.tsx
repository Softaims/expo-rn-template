import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { cn } from "@/lib/utils";

const screenWrapperVariants = {
    container: "bg-background px-[16px]"

} as const;

export interface ScreenWrapperProps {
    children: React.ReactNode;
    containerStyles?: string;
    scrollEnabled?: boolean;
    headerTransparent?: boolean;
}

export function ScreenWrapper({ children, containerStyles, scrollEnabled = false, headerTransparent = false }: ScreenWrapperProps) {
    const { top, bottom } = useSafeAreaInsets();
    return (
        <>
            {
                scrollEnabled ?
                    <ScrollView
                        contentContainerClassName={cn(screenWrapperVariants.container, containerStyles)}
                        contentContainerStyle={{ paddingTop: headerTransparent ? top * 1.8 : top, paddingBottom: headerTransparent ? 16 : bottom, flexGrow: 1 }}
                        showsVerticalScrollIndicator={false}
                    >
                        {children}
                    </ScrollView>
                    :
                    <View
                        className={cn(screenWrapperVariants.container, "flex-1", containerStyles)}
                        style={{ paddingTop: headerTransparent ? top * 1.8 : top, paddingBottom: headerTransparent ? 16 : bottom }}>
                        {children}
                    </View>
            }
        </>
    );
}