import { useThemedTabsScreenOptions } from "@/lib/theme";
import { Tabs } from "expo-router";

export default function HomeLayout() {
  const screenOptions = useThemedTabsScreenOptions({ headerShown: false });
  return (
    <Tabs screenOptions={screenOptions}>
      <Tabs.Screen name="(settings)" options={{ headerShown: false }} />
      <Tabs.Screen name="(dummyService)" options={{ headerShown: false }} />
    </Tabs>
  );
}
