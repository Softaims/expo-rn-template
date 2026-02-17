import { Tabs } from "expo-router";

export default function HomeLayout() {
  return (
    <Tabs screenOptions={{ sceneStyle: { backgroundColor: '#fff' } }}>
      <Tabs.Screen name="(settings)" options={{ headerShown: false }} />
    </Tabs>
  );
}
