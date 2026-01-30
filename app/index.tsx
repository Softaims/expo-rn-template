import { Link } from "expo-router";
import { Text, View, ScrollView } from "react-native";
import { Button } from "@/components/buttons";
import { Tabs } from "@/components/tabs";
import { Checkbox } from "@/components/checkbox";
import { RadioButton } from "@/components/radio";
import { Toggle } from "@/components/toggle";
import "../global.css";

export default function Index() {
  const basicTabs = [
    { label: "Details", value: "details" },
    { label: "Products", value: "products" },
    { label: "Orders", value: "orders" },
  ];

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{
        padding: 20,
        gap: 32,
      }}
    >
      {/* Section: Button Examples */}
      <View style={{ gap: 16 }}>
        <Text className="text-foreground text-xl font-bold">
          Button Style Overrides
        </Text>

        {/* Example 1: Backwards compatible */}
        <Button
          title="Standard Button"
          className="mt-2"
          onPress={() => console.log("Standard")}
        />

        {/* Example 2: Classes override - customize text */}
        <Button
          title="Custom Text Style"
          classes={{
            text: "text-2xl font-black uppercase text-blue-500",
          }}
          onPress={() => console.log("Custom text")}
        />

        {/* Example 3: Multiple element overrides */}
        <Button
          title="Multi Override"
          classes={{
            container: "rounded-full shadow-lg",
            text: "tracking-widest",
            innerWrapper: "gap-4",
          }}
          onPress={() => console.log("Multi override")}
        />

        {/* Example 4: Inline styles */}
        <Button
          title="Inline Styles"
          styles={{
            container: { shadowOpacity: 0.5, shadowRadius: 10 },
            text: { letterSpacing: 3 },
          }}
          onPress={() => console.log("Inline styles")}
        />

        {/* Example 5: Hybrid approach */}
        <Button
          title="Hybrid Override"
          className="mt-4"
          classes={{ text: "font-bold" }}
          styles={{
            container: { transform: [{ scale: 0.95 }] },
            text: { textTransform: "uppercase" },
          }}
          onPress={() => console.log("Hybrid")}
        />
      </View>

      {/* Section: Checkbox Examples */}
      <View style={{ gap: 16 }}>
        <Text className="text-foreground text-xl font-bold">
          Checkbox Style Overrides
        </Text>

        {/* Example 1: Standard */}
        <Checkbox label="Standard Checkbox" checked={true} />

        {/* Example 2: Custom classes */}
        <Checkbox
          label="Custom Styled"
          checked={true}
          classes={{
            box: "w-8 h-8 rounded-xl border-4",
            label: "text-xl font-bold",
            checkmark: "w-4 h-1",
          }}
        />

        {/* Example 3: Inline styles */}
        <Checkbox
          label="Inline Styled"
          checked={true}
          styles={{
            box: { transform: [{ rotate: "45deg" }] },
            label: { letterSpacing: 2 },
          }}
        />
      </View>

      {/* Section: RadioButton Examples */}
      <View style={{ gap: 16 }}>
        <Text className="text-foreground text-xl font-bold">
          RadioButton Style Overrides
        </Text>

        {/* Example 1: Standard */}
        <RadioButton label="Standard Radio" selected={true} />

        {/* base over */}
        <RadioButton
          selected
          styles={{
            circle: {
              borderRadius: 0,
              borderWidth: 0,
            },
          }}
        />

        {/* Example 2: Custom classes */}
        <RadioButton
          label="Custom Styled"
          selected={true}
          // className="mt-4"
          classes={{
            circle: "w-8 h-8 border-4",
            dot: "w-4 h-4 bg-green-500",
            label: "text-lg font-bold",
          }}
        />

        {/* Example 3: Inline styles */}
        <RadioButton
          label="Inline Styled"
          selected={true}
          styles={{
            circle: { borderWidth: 3 },
            dot: { backgroundColor: "#3b82f6" },
            label: { letterSpacing: 1 },
          }}
        />
      </View>

      {/* Section: Toggle Examples */}
      <View style={{ gap: 16 }}>
        <Text className="text-foreground text-xl font-bold">
          Toggle Style Overrides
        </Text>

        {/* Example 1: Standard */}
        <Toggle label="Standard Toggle" value={true} />

        {/* Example 2: Custom classes */}
        <Toggle
          label="Custom Styled"
          value={true}
          classes={{
            track: "w-16 h-8 rounded-xl",
            thumb: "w-7 h-7",
            label: "text-lg font-bold",
          }}
        />

        {/* Example 3: Inline styles */}
        <Toggle
          label="Inline Styled"
          value={true}
          styles={{
            track: { opacity: 0.8 },
            thumb: { shadowOpacity: 0.5, shadowRadius: 5 },
            label: { letterSpacing: 1 },
          }}
        />
      </View>

      {/* Section: Tabs Examples */}
      <View style={{ gap: 16 }}>
        <Text className="text-foreground text-xl font-bold">
          Tabs Style Overrides
        </Text>

        {/* Example 1: Standard */}
        <Tabs tabs={basicTabs} />

        {/* Example 2: Custom classes */}
        <Tabs
          tabs={basicTabs}
          variant="filled"
          classes={{
            container: "gap-4",
            tab: "px-6 py-4 rounded-xl",
            tabText: "text-lg font-black",
          }}
        />

        {/* Example 3: Inline styles */}
        <Tabs
          tabs={basicTabs}
          variant="pill"
          styles={{
            tab: { transform: [{ scale: 0.95 }] },
            tabText: { letterSpacing: 2 },
          }}
        />
      </View>

        <Link href="/storybook">Open Storybook</Link>
    </ScrollView>
  );
}
