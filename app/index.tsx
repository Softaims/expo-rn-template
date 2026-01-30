import { Link } from "expo-router";
import { Text, View } from "react-native";
import { Button } from "@/components/buttons";
import { Tabs } from "@/components/tabs";
import "../global.css";
export default function Index() {
  const basicTabs = [
  { label: "Details", value: "details" },
  { label: "Products", value: "products" },
  { label: "Orders", value: "orders" },
  { label: "Team", value: "team" },
];
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link href="/storybook">Open Storybook</Link>
      <Text className="text-red-500">wow</Text>
      <Button title="Click me" className="text-red-600" onPress={() => console.log("Button pressed")} />
      <Tabs tabs={basicTabs} />
    </View>
  );
}
