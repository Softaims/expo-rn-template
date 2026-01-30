import { Link } from "expo-router";
import { View, ScrollView } from "react-native";
import { Button, Tabs, Checkbox, RadioButton, Toggle, Dropdown, Text } from "@/components";
import { ChevronDownIcon, CloseIcon, ArrowRightIcon, SendIcon } from "@/assets/icons";
import { useState } from "react";
import "../global.css";

export default function Index() {
  const basicTabs = [
    { label: "Details", value: "details" },
    { label: "Products", value: "products" },
    { label: "Orders", value: "orders" },
  ];

  const dropdownOptions = [
    { label: "Example 01", value: "1" },
    { label: "Example 02", value: "2" },
    { label: "Example 03", value: "3" },
    { label: "Example 04", value: "4" },
    { label: "Example 05", value: "5" },
  ];

  // Dropdown states
  const [dropdown1, setDropdown1] = useState<string>("");
  const [dropdown2, setDropdown2] = useState<string>("");
  const [dropdown3, setDropdown3] = useState<string[]>([]);
  const [dropdown4, setDropdown4] = useState<string>("");
  const [dropdown5, setDropdown5] = useState<string[]>(["2", "4"]);

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

        {/* Example 6: Button with Icon (Right) */}
        <Button
          title="Next"
          icon={<ArrowRightIcon width={20} height={20} color="#fff" />}
          iconPosition="right"
          onPress={() => console.log("Next")}
        />

        {/* Example 7: Button with Icon (Left) */}
        <Button
          title="Send Message"
          icon={<SendIcon width={20} height={20} color="#fff" />}
          iconPosition="left"
          onPress={() => console.log("Send")}
        />

        {/* Example 8: Icon Button with Custom Styles */}
        <Button
          title="Continue"
          icon={<ArrowRightIcon width={18} height={18} color="#3b82f6" />}
          iconPosition="right"
          variant="secondary"
          classes={{
            container: "rounded-full",
            innerWrapper: "gap-3",
          }}
          onPress={() => console.log("Continue")}
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

      {/* Section: Dropdown Examples */}
      <View style={{ gap: 16 }}>
        <Text className="text-foreground text-xl font-bold">
          Dropdown Style Overrides
        </Text>

        {/* Example 1: Standard */}
        <Dropdown
          placeholder="Standard Dropdown"
          options={dropdownOptions}
          value={dropdown1}
          onChange={(val) => setDropdown1(val as string)}
          chevronIcon={<ChevronDownIcon width={16} height={16} color="#666" />}
        />

        {/* Example 2: Custom classes */}
        <Dropdown
          placeholder="Custom Styled"
          options={dropdownOptions}
          value={dropdown2}
          onChange={(val) => setDropdown2(val as string)}
          chevronIcon={<ChevronDownIcon width={16} height={16} color="#666" />}
          classes={{
            trigger: "rounded-xl border-4 bg-blue-50",
            placeholder: "text-lg font-bold",
            dropdown: "rounded-xl",
            option: "py-4",
          }}
        />

        {/* Example 3: Multi-Select */}
        <Dropdown
          placeholder="Multi-Select"
          options={dropdownOptions}
          value={dropdown3}
          onChange={(val) => setDropdown3(val as string[])}
          multiSelect
          chevronIcon={<ChevronDownIcon width={16} height={16} color="#666" />}
          selectedItemProps={{
            closeIcon: <CloseIcon width={12} height={12} color="#666" />,
          }}
        />

        {/* Example 4: Searchable with custom placeholder */}
        <Dropdown
          placeholder="Select with Search"
          searchPlaceholder="Type to filter..."
          options={dropdownOptions}
          value={dropdown4}
          onChange={(val) => setDropdown4(val as string)}
          searchable
          placeholderTextColor="#666"
          chevronIcon={<ChevronDownIcon width={16} height={16} color="#666" />}
        />

        {/* Example 5: Multi-Select with Inline Styles */}
        <Dropdown
          placeholder="Styled Multi-Select"
          options={dropdownOptions}
          value={dropdown5}
          onChange={(val) => setDropdown5(val as string[])}
          multiSelect
          chevronIcon={<ChevronDownIcon width={16} height={16} color="#3b82f6" />}
          selectedItemProps={{
            closeIcon: <CloseIcon width={12} height={12} color="#1e40af" />,
            classes: {
              container: "bg-blue-100 rounded-full px-4",
              label: "text-blue-800 font-semibold",
            },
          }}
          styles={{
            trigger: { borderWidth: 3, borderRadius: 12 },
            selectedItemsWrapper: { marginTop: 12 },
            dropdown: { maxHeight: 250 },
          }}
          classes={{
            selectedText: "text-lg font-semibold",
          }}
        />

        {/* Example 6: Auto-Suggest */}
        <Dropdown
          placeholder="Type to search..."
          options={dropdownOptions}
          value={dropdown4}
          onChange={(val) => setDropdown4(val as string)}
          autoSuggest
          placeholderTextColor="#999"
          chevronIcon={<ChevronDownIcon width={16} height={16} color="#666" />}
        />

        {/* Example 7: Disabled */}
        <Dropdown
          placeholder="Disabled Dropdown"
          options={dropdownOptions}
          disabled
          chevronIcon={<ChevronDownIcon width={16} height={16} color="#999" />}
        />

        {/* Example 8: Custom Max Height & Empty Message */}
        <Dropdown
          placeholder="Search with Custom Height"
          searchPlaceholder="Find an item..."
          options={dropdownOptions}
          value={dropdown4}
          onChange={(val) => setDropdown4(val as string)}
          searchable
          maxHeight={200}
          emptyMessage="😕 No matches found"
          chevronIcon={<ChevronDownIcon width={16} height={16} color="#666" />}
        />

        {/* Example 9: Custom Max Height */}
        <Dropdown
          placeholder="Custom Max Height"
          options={dropdownOptions}
          value={dropdown1}
          onChange={(val) => setDropdown1(val as string)}
          maxHeight={150}
          chevronIcon={<ChevronDownIcon width={16} height={16} color="#666" />}
        />

        {/* Example 10: Don't Close on Select */}
        <Dropdown
          placeholder="Stay Open on Select"
          options={dropdownOptions}
          value={dropdown2}
          onChange={(val) => setDropdown2(val as string)}
          closeOnSelect={false}
          chevronIcon={<ChevronDownIcon width={16} height={16} color="#666" />}
        />

        {/* Example 11: Multi-Select with Custom Selected Items */}
        <Dropdown
          placeholder="Custom Selected Items"
          options={dropdownOptions}
          value={dropdown5}
          onChange={(val) => setDropdown5(val as string[])}
          multiSelect
          chevronIcon={<ChevronDownIcon width={16} height={16} color="#666" />}
          selectedItemProps={{
            closeIcon: <CloseIcon width={12} height={12} color="#666" />,
            classes: {
              container: "bg-blue-100 rounded-full px-4",
              label: "text-blue-800 font-semibold",
            },
          }}
        />

        {/* Example 12: With Callbacks */}
        <Dropdown
          placeholder="With Open/Close Callbacks"
          options={dropdownOptions}
          value={dropdown1}
          onChange={(val) => setDropdown1(val as string)}
          onOpen={() => console.log("Dropdown opened")}
          onClose={() => console.log("Dropdown closed")}
          chevronIcon={<ChevronDownIcon width={16} height={16} color="#666" />}
        />
      </View>

        <Link href="/storybook">Open Storybook</Link>
    </ScrollView>
  );
}
