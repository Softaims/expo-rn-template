import { Link } from "expo-router";
import { Text, View } from "react-native";
import "../global.css";

export default function Index() {
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
    </View>
  );
}
