import { Link } from "expo-router";
import { View, ScrollView } from "react-native";
import {
  Button,
  Tabs,
  Checkbox,
  RadioButton,
  Toggle,
  Dropdown,
  Text,
  TextInput,
  ProgressBar,
} from "@/components";
import {
  ChevronDownIcon,
  CloseIcon,
  ArrowRightIcon,
  SendIcon,
} from "@/assets/icons";
import { fontFamilies } from "@/hooks/useFonts";
import { useState } from "react";
import "../global.css";

export default function Index() {
  const [search, setSearch] = useState("");
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
  const [dropdown1, setDropdown1] = useState<string | null>(null);
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

        {/* Example 8: Icon Button with Custom Styles */}
        <Button
          title="Continue"
          icon={<ArrowRightIcon width={18} height={18} color="#3b82f6" />}
          iconPosition="right"
          variant="secondary"
          containerStyles="rounded-full"
          innerWrapperStyles="gap-3"
          onPress={() => console.log("Continue")}
        />

        {/* Example 9: Font Weight - Thin */}
        <Button
          title="Thin Font"
          fontFamily={fontFamilies.thin}
          onPress={() => console.log("Thin")}
        />

        {/* Example 10: Font Weight - Light */}
        <Button
          title="Light Font"
          fontFamily={fontFamilies.light}
          onPress={() => console.log("Light")}
        />

        {/* Example 11: Font Weight - Regular */}
        <Button
          title="Regular Font"
          fontFamily={fontFamilies.regular}
          onPress={() => console.log("Regular")}
        />

        {/* Example 12: Font Weight - Medium */}
        <Button
          title="Medium Font"
          fontFamily={fontFamilies.medium}
          onPress={() => console.log("Medium")}
        />

        {/* Example 13: Font Weight - Semibold */}
        <Button
          title="Semibold Font"
          fontFamily={fontFamilies.semibold}
          onPress={() => console.log("Semibold")}
        />

        {/* Example 14: Font Weight - Bold */}
        <Button
          title="Bold Font"
          fontFamily={fontFamilies.bold}
          onPress={() => console.log("Bold")}
        />

        {/* Example 15: Font Weight - Extrabold */}
        <Button
          title="Extrabold Font"
          fontFamily={fontFamilies.extrabold}
          onPress={() => console.log("Extrabold")}
        />
      </View>

      {/* Section: Checkbox Examples */}
      <View style={{ gap: 16 }}>
        <Text className="text-foreground text-xl font-bold">
          Checkbox Style Overrides
        </Text>

        {/* Example 1: Standard */}
        <Checkbox label="Standard Checkbox" checked={true} />

        {/* Example 2: Custom styling */}
        <Checkbox
          label="Custom Styled"
          checked={true}
          boxStyles="w-8 h-8 rounded-xl border-4"
          labelStyles="text-xl font-bold"
          checkmarkStyles="w-4 h-1"
        />

        {/* Example 3: Custom label */}
        <Checkbox
          label="Custom Label"
          checked={true}
          labelStyles="text-lg tracking-wide font-semibold"
        />
      </View>

      {/* Section: RadioButton Examples */}
      <View style={{ gap: 16 }}>
        <Text className="text-foreground text-xl font-bold">
          RadioButton Style Overrides
        </Text>

        {/* Example 1: Standard */}
        <RadioButton label="Standard Radio" selected={true} />

        {/* Example 2: Custom circle */}
        <RadioButton selected circleStyles="rounded-none border-0" />

        {/* Example 3: Custom styling */}
        <RadioButton
          label="Custom Styled"
          selected={true}
          circleStyles="w-8 h-8 border-4"
          dotStyles="w-4 h-4 bg-green-500"
          labelStyles="text-lg font-bold"
        />

        {/* Example 4: Custom label */}
        <RadioButton
          label="Custom Label"
          selected={true}
          labelStyles="tracking-wider text-base"
        />
      </View>

      {/* Section: Toggle Examples */}
      <View style={{ gap: 16 }}>
        <Text className="text-foreground text-xl font-bold">
          Toggle Style Overrides
        </Text>

        {/* Example 1: Standard */}
        <Toggle label="Standard Toggle" value={true} />

        {/* Example 2: Custom styling */}
        <Toggle
          label="Custom Styled"
          value={true}
          trackStyles="w-16 h-8 rounded-xl"
          thumbStyles="w-7 h-7"
          labelStyles="text-lg font-bold"
        />

        {/* Example 3: Custom track */}
        <Toggle
          label="Custom Track"
          value={true}
          trackStyles="opacity-80"
          labelStyles="tracking-wider"
        />
      </View>

      {/* Section: Tabs Examples */}
      <View style={{ gap: 16 }}>
        <Text className="text-foreground text-xl font-bold">
          Tabs Style Overrides
        </Text>

        {/* Example 1: Standard */}
        <Tabs tabs={basicTabs}  />

        {/* Example 2: Custom styling */}
        <Tabs
          tabs={basicTabs}
          variant="filled"
          containerStyles="gap-4"
          tabStyles="px-6 py-4 rounded-xl"
          tabTextStyles="text-lg font-black"
        />

        {/* Example 3: Pill variant with custom text */}
        <Tabs tabs={basicTabs} variant="pill" tabTextStyles="tracking-widest" />

        {/* Example 4: Font Weight - Light */}
        <Tabs
          tabs={basicTabs}
          variant="underline"
          fontFamily={fontFamilies.light}
        />

        {/* Example 5: Font Weight - Medium */}
        <Tabs
          tabs={basicTabs}
          variant="filled"
          fontFamily={fontFamilies.medium}
        />

        {/* Example 6: Font Weight - Bold */}
        <Tabs tabs={basicTabs} variant="pill" fontFamily={fontFamilies.bold} />

        {/* Example 7: Font Weight - Extrabold */}
        <Tabs
          tabs={basicTabs}
          variant="icon"
          fontFamily={fontFamilies.extrabold}
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

        {/* Example 2: Custom styling */}
        <Dropdown
          placeholder="Custom Styled"
          options={dropdownOptions}
          value={dropdown2}
          onChange={(val) => setDropdown2(val as string)}
          chevronIcon={<ChevronDownIcon width={16} height={16} color="red" />}
          triggerStyles="rounded-xl border-4 bg-blue-50"
          placeholderStyles="text-lg font-bold"
          dropdownStyles="rounded-xl"
          optionStyles="py-4"
        />

        {/* Example 3: Multi-Select */}
        <Dropdown
          placeholder="Multi-Select"
          options={dropdownOptions}
          value={dropdown3}
          onChange={(val) => setDropdown3(val as string[])}
          multiSelect
          chevronIcon={<ChevronDownIcon width={16} height={16} color="#666" />}
          selectedItemCloseIcon={
            <CloseIcon width={12} height={12} color="#666" />
          }
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

        {/* Example 5: Multi-Select with Custom Styling */}
        <Dropdown
          placeholder="Styled Multi-Select"
          options={dropdownOptions}
          value={dropdown5}
          onChange={(val) => setDropdown5(val as string[])}
          multiSelect
          chevronIcon={
            <ChevronDownIcon width={16} height={16} color="#3b82f6" />
          }
          selectedItemCloseIcon={
            <CloseIcon width={12} height={12} color="#1e40af" />
          }
          selectedItemContainerStyles="bg-blue-100 rounded-full px-4"
          selectedItemLabelStyles="text-blue-800 font-semibold"
          triggerStyles="border-[3px] rounded-xl"
          selectedItemsWrapperStyles="mt-3"
          selectedTextStyles="text-lg font-semibold"
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
          selectedItemCloseIcon={
            <CloseIcon width={12} height={12} color="#666" />
          }
          selectedItemContainerStyles="bg-blue-100 rounded-full px-4"
          selectedItemLabelStyles="text-blue-800 font-semibold"
        />
      </View>

      {/* Section: TextInput Examples */}
      <View style={{ gap: 16 }}>
        <Text className="text-foreground text-xl font-bold">
          TextInput Examples
        </Text>

        <TextInput
          label="Chat"
          type="chat"
          value={search}
          onChangeText={setSearch}
          placeholder="Enter your message"
        />
      </View>

      {/* Section: ProgressBar Examples */}
      <View style={{ gap: 16 }}>
        <Text className="text-foreground text-xl font-bold">
          ProgressBar Examples
        </Text>

        {/* Example 1: Stepper Dots with Custom Styling */}
        <View style={{ gap: 8 }}>
          <Text className="text-sm font-semibold">Stepper Dots</Text>
          <ProgressBar
            variant="stepperDots"
            currentStep={3}
            totalSteps={5}
            labels={["Pattern", "Goal", "Users", "Success", "Resources"]}
            activeStyle="bg-green-500 border-green-500"
            inactiveStyle="bg-gray-200 border-gray-300"
            currentStyle="bg-white"
            labelStyle="text-xs text-gray-600 mt-2"
          />
        </View>

        {/* Example 2: Bar Fill with Text Inside */}
        <View style={{ gap: 8 }}>
          <Text className="text-sm font-semibold">Bar Fill with Text</Text>
          <ProgressBar
            variant="barFill"
            progress={65}
            label="Overall Progress"
            textInside="65%"
            activeStyle="bg-blue-500"
            inactiveStyle="bg-gray-100"
            textInsideStyle="text-white font-bold"
            labelStyle="text-sm text-red-600 font-medium"
          />
        </View>

        {/* Example 3: Circle Steps with Custom Numbers */}
        <View style={{ gap: 8 }}>
          <Text className="text-sm font-semibold">Circle Steps</Text>
          <ProgressBar
            variant="circleSteps"
            currentStep={2}
            totalSteps={4}
            labels={["Start", "Process", "Review", "Complete"]}
            activeStyle="bg-purple-500 border-purple-500"
            inactiveStyle="bg-gray-100 border-gray-300"
            textInsideStyle="text-white font-semibold"
            labelStyle="text-xs text-purple-600 mt-2"
          />
        </View>

        {/* Example 4: Bar Group with Text */}
        <View style={{ gap: 8 }}>
          <Text className="text-sm font-semibold">Bar Group</Text>
          <ProgressBar
            variant="barGroup"
            progress={50}
            currentStep={4}
            label="Progress: 4 out of 8"
            activeStyle="bg-red-500"
            inactiveStyle="bg-gray-200"
            currentStyle="bg-white border-red-500"
            labelStyle="text-sm font-medium text-red-600"
          />
        </View>

        {/* Example 5: Stepper with Text Inside Each Dot */}
        <View style={{ gap: 8 }}>
          <Text className="text-sm font-semibold">
            Stepper with Text Inside
          </Text>
          <ProgressBar
            variant="stepperDots"
            currentStep={2}
            totalSteps={3}
            textInside={["1", "2", "3"]}
            activeStyle="bg-orange-500 border-orange-500"
            inactiveStyle="bg-gray-200 border-gray-300"
            textInsideStyle="text-white text-xs font-bold"
            size="lg"
          />
        </View>

        {/* Example 6: Circle Steps with Custom Text */}
        <View style={{ gap: 8 }}>
          <Text className="text-sm font-semibold">
            Circle Steps with Icons/Text
          </Text>
          <ProgressBar
            variant="circleSteps"
            currentStep={3}
            totalSteps={5}
            textInside={["✓", "✓", "✓", "4", "5"]}
            activeStyle="bg-teal-500 border-teal-500"
            inactiveStyle="bg-gray-100 border-gray-300"
            textInsideStyle="text-white font-bold text-base"
          />
        </View>

        {/* Example 7: Small Size */}
        <View style={{ gap: 8 }}>
          <Text className="text-sm font-semibold">Small Size</Text>
          <ProgressBar
            variant="stepperDots"
            currentStep={2}
            totalSteps={5}
            size="sm"
            activeStyle="bg-indigo-500 border-indigo-500"
            inactiveStyle="bg-gray-200 border-gray-300"
          />
        </View>

        {/* Example 8: Large Size */}
        <View style={{ gap: 8 }}>
          <Text className="text-sm font-semibold">Large Size</Text>
          <ProgressBar
            variant="stepperDots"
            currentStep={3}
            totalSteps={5}
            size="lg"
            activeStyle="bg-pink-500 border-pink-500"
            inactiveStyle="bg-gray-200 border-gray-300"
          />
        </View>
      </View>

      <Link href="/storybook">Open Storybook</Link>
    </ScrollView>
  );
}
