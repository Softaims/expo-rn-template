import { Tabs } from "expo-router";

export default function HomeLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="(settings)" options={{ headerShown: false }} />
    </Tabs>
  );
}
