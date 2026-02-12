import { Link, Redirect } from "expo-router";

export default function Index() {
  // return <Redirect href="/(tabs)/(chat)/RecentMessagesScreen" />;
  return <Link href="/storybook">Storybook</Link>;
}
