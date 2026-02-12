import { useClerk } from "@clerk/clerk-expo";
import { Redirect, Tabs } from "expo-router";
export default function HomeLayout() {

  const { isSignedIn } = useClerk();
  console.log(isSignedIn)
  if (!isSignedIn) {
    return <Redirect href="/(auth)/splash" />;
  }

  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ headerShown: false }} />
      <Tabs.Screen name="messages" options={{ headerShown: false }} />
    </Tabs>
  );
}
