import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Tabs } from "expo-router";
export default function HomeLayout() {

  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return <Redirect href="/(splash)" />;
  }

  return (
    <Tabs>
      <Tabs.Screen name="(chat)" options={{ headerShown: false }} />
      <Tabs.Screen name="(settings)" options={{ headerShown: false }} />
    </Tabs>
  );
}
