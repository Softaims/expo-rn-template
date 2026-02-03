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
  ArrowLeftIcon,
  SendIcon,
  CheckIcon,
  MinusIcon,
} from "@/assets/icons";
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
  const [dropdown1, setDropdown1] = useState<string | undefined>(undefined);
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
      <View style={{ marginTop: 100 }}>
        <Link href="/storybook">Open Storybook</Link>
      </View>
      {/* Section: Button Examples */}
      <View style={{ gap: 16 }}>
        <Text className="text-foreground text-xl font-bold">
          Button Style Overrides
        </Text>

        {/* Example 1: Standard Button */}
        <Button
          title="Primary Button"
          variant="primary"
          onPress={() => console.log("Primary")}
        />

        {/* Example 2: Button with Left Icon */}
        <Button
          title="Send Message"
          leftIcon={<SendIcon width={18} height={18} color="#ffffff" />}
          variant="primary"
          onPress={() => console.log("Send")}
        />

        {/* Example 3: Button with Right Icon */}
        <Button
          title="Continue"
          rightIcon={<ArrowRightIcon width={18} height={18} color="#3b82f6" />}
          variant="secondary"
          containerStyles="rounded-full justify-start px-4"
          // innerWrapperStyles="items-start"
          onPress={() => console.log("Continue")}
        />

        {/* Example 4: Button with Both Icons */}
        <Button
          title="Transfer"
          leftIcon={
            <View className="bg-red-400 rounded-full p-1">
              <ArrowLeftIcon width={18} height={18} color="#ffffff" />
            </View>
          }
          rightIcon={<ArrowRightIcon width={18} height={18} color="#ffffff" />}
          variant="primary"
          innerWrapperStyles="gap-4"
          onPress={() => console.log("Transfer")}
        />

        {/* Example 5: Large Button with Icon */}
        <Button
          title="Upload File"
          rightIcon={<SendIcon width={20} height={20} color="#ffffff" />}
          variant="primary"
          size="lg"
          onPress={() => console.log("Upload")}
        />

        {/* Example 6: Small Button with Icon */}
        <Button
          title="Next"
          rightIcon={<ArrowRightIcon width={16} height={16} color="#ffffff" />}
          variant="actioned"
          size="sm"
          onPress={() => console.log("Next")}
        />

        {/* Example 7: Secondary with Left Icon */}
        <Button
          title="Go Back"
          leftIcon={<ArrowLeftIcon width={18} height={18} color="#3b82f6" />}
          variant="secondary"
          onPress={() => console.log("Back")}
        />

        {/* Example 8: Text Centered, Icon at Far Right */}
        <Button
          title="Continue centered"
          rightIcon={<ArrowRightIcon width={18} height={18} color="#ffffff" />}
          variant="primary"
          containerStyles="w-full"
          textStyles="flex-1 text-center"
          onPress={() => console.log("Continue Far")}
        />

        {/* Example 8b: Icons at Both Edges, Text Centered */}
        <Button
          title="Transfer"
          leftIcon={<ArrowLeftIcon width={18} height={18} color="#ffffff" />}
          rightIcon={<ArrowRightIcon width={18} height={18} color="#ffffff" />}
          variant="primary"
          textStyles="flex-1 text-center"
          onPress={() => console.log("Transfer Edges")}
        />

        {/* Example 9: Disabled with Icon */}
        <Button
          title="Disabled Button"
          rightIcon={<SendIcon width={18} height={18} color="#9ca3af" />}
          disabled
          onPress={() => console.log("Disabled")}
        />

        {/* Example 10: Text Variant with Icon */}
        <Button
          title="Learn More"
          rightIcon={<ArrowRightIcon width={16} height={16} color="#3b82f6" />}
          variant="text"
          onPress={() => console.log("Learn More")}
        />

        {/* Example 11: Button with No Icons */}
        <Button
          title="Simple Button"
          variant="primary"
          onPress={() => console.log("Simple")}
        />
      </View>

      {/* Section: Checkbox Examples */}
      <View style={{ gap: 16 }}>
        <Text className="text-foreground text-xl font-bold">
          Checkbox Style Overrides
        </Text>

        {/* Example 1: Standard with CheckIcon */}
        <Checkbox
          label="Standard Checkbox"
          checked={true}
          checkIcon={<CheckIcon width={12} height={12} color="#ffffff" />}
        />

        {/* Example 2: Custom colors with CheckIcon */}
        <Checkbox
          label="Custom Colors"
          checked={true}
          checkedBoxStyle="bg-green-500 border-green-500 w-6 h-6"
          uncheckedBoxStyle="border-gray-300 w-6 h-6"
          labelStyle="text-lg font-semibold text-green-600"
          checkIcon={<CheckIcon width={14} height={14} color="#ffffff" />}
        />

        {/* Example 3: Indeterminate with MinusIcon */}
        <Checkbox
          label="Indeterminate State"
          indeterminate={true}
          indeterminateBoxStyle="bg-orange-500 border-orange-500"
          indeterminateIcon={
            <MinusIcon width={12} height={12} color="#ffffff" />
          }
        />

        {/* Example 4: Custom icon - ArrowRight */}
        <Checkbox
          label="Custom Check Icon"
          checked={true}
          checkIcon={<ArrowRightIcon width={14} height={14} color="#ffffff" />}
          checkedBoxStyle="bg-blue-600 border-blue-600 rounded-full"
          labelStyle="text-blue-600 font-bold"
        />

        {/* Example 5: Custom indeterminate icon - Close */}
        <Checkbox
          label="Custom Indeterminate"
          indeterminate={true}
          indeterminateIcon={
            <CloseIcon width={12} height={12} color="#ffffff" />
          }
          indeterminateBoxStyle="bg-red-500 border-red-500 rounded-lg"
          labelStyle="text-red-600"
        />

        {/* Example 6: Disabled states */}
        <Checkbox label="Disabled Unchecked" disabled={true} checked={false} />

        {/* Example 7: Disabled Checked */}
        <Checkbox
          label="Disabled Checked"
          disabled={true}
          checked={true}
          checkIcon={<CheckIcon width={12} height={12} color="#ffffff" />}
        />

        {/* Example 8: Rounded with SendIcon */}
        <Checkbox
          label="Send Task"
          checked={true}
          checkIcon={<SendIcon width={12} height={12} color="#ffffff" />}
          checkedBoxStyle="bg-purple-500 border-purple-500 rounded-full w-7 h-7"
          uncheckedBoxStyle="border-purple-300 rounded-full w-7 h-7"
          labelStyle="text-purple-600 font-medium"
        />
      </View>

      {/* Section: RadioButton Examples */}
      <View style={{ gap: 16 }}>
        <Text className="text-foreground text-xl font-bold">
          RadioButton Style Overrides
        </Text>

        {/* Example 1: Standard Selected */}
        <RadioButton label="Standard Selected" selected={true} />

        {/* Example 2: Standard Unselected */}
        <RadioButton label="Standard Unselected" selected={false} />

        {/* Example 3: Custom selected/unselected styling */}
        <RadioButton
          label="Custom Colors"
          selected={true}
          selectedCircleStyle="border-blue-600 w-6 h-6"
          unselectedCircleStyle="border-gray-300 w-6 h-6"
          selectedDotStyle="bg-blue-600 w-3 h-3"
          labelStyle="text-lg font-semibold text-blue-600"
        />

        {/* Example 4: Custom icon instead of dot */}
        <RadioButton
          label="Custom Icon"
          selected={true}
          selectedCircleStyle="border-green-500 w-7 h-7"
          labelStyle="text-green-600 font-bold"
          selectedIcon={<CheckIcon width={14} height={14} color="#22c55e" />}
        />

        {/* Example 5: Square radio with custom dot */}
        <RadioButton
          label="Square Radio"
          selected={true}
          selectedCircleStyle="border-purple-500 rounded-none w-6 h-6"
          unselectedCircleStyle="border-purple-300 rounded-none w-6 h-6"
          selectedDotStyle="bg-purple-500 w-3 h-3 rounded-none"
          labelStyle="text-purple-600"
        />

        {/* Example 6: Large radio with SendIcon */}
        <RadioButton
          label="Send Option"
          selected={true}
          selectedCircleStyle="border-orange-500 w-8 h-8"
          labelStyle="text-orange-600 font-medium text-lg"
          selectedIcon={<SendIcon width={16} height={16} color="#f97316" />}
        />

        {/* Example 7: Inactive/Disabled */}
        <RadioButton label="Inactive Radio" selected={true} inactive={true} />

        {/* Example 8: Custom inactive styling */}
        <RadioButton
          label="Custom Inactive"
          selected={true}
          inactive={true}
          inactiveCircleStyle="border-gray-300 opacity-50 w-6 h-6"
          inactiveDotStyle="bg-gray-400 w-3 h-3"
          inactiveLabelStyle="text-gray-400 opacity-50"
        />

        {/* Example 9: No label */}
        <RadioButton
          selected={true}
          selectedCircleStyle="border-pink-500 w-6 h-6"
          selectedDotStyle="bg-pink-500 w-3 h-3"
        />
      </View>

      {/* Section: Toggle Examples */}
      <View style={{ gap: 16 }}>
        <Text className="text-foreground text-xl font-bold">
          Toggle Style Overrides
        </Text>

        {/* Example 1: Standard Active */}
        <Toggle label="Standard Active" value={true} />

        {/* Example 2: Standard Inactive */}
        <Toggle label="Standard Inactive" value={false} />

        {/* Example 3: Custom active/inactive styling */}
        <Toggle
          label="Custom Colors"
          value={true}
          activeTrackStyle="bg-green-500 w-14 h-7"
          inactiveTrackStyle="bg-gray-300 w-14 h-7"
          activeThumbStyle="w-6 h-6 bg-white shadow-lg"
          inactiveThumbStyle="w-6 h-6 bg-white"
          labelStyle="text-lg font-semibold text-green-600"
        />

        {/* Example 4: Large toggle */}
        <Toggle
          label="Large Toggle"
          value={true}
          activeTrackStyle="bg-blue-500 w-16 h-8 rounded-xl"
          inactiveTrackStyle="bg-gray-200 w-16 h-8 rounded-xl"
          activeThumbStyle="w-7 h-7 bg-white rounded-lg"
          inactiveThumbStyle="w-7 h-7 bg-white rounded-lg"
          labelStyle="text-xl font-bold"
        />

        {/* Example 5: Custom track colors */}
        <Toggle
          label="Purple Theme"
          value={false}
          activeTrackStyle="bg-purple-500"
          inactiveTrackStyle="bg-purple-200"
          activeThumbStyle="bg-white shadow-md"
          labelStyle="text-purple-600 tracking-wider"
        />

        {/* Example 6: Disabled */}
        <Toggle label="Disabled Toggle" value={true} disabled />

        {/* Example 7: Custom disabled styling */}
        <Toggle
          label="Custom Disabled"
          value={true}
          disabled
          disabledTrackStyle="bg-gray-200 opacity-40"
          disabledThumbStyle="bg-gray-400 opacity-60"
          disabledLabelStyle="text-gray-400 opacity-50"
        />

        {/* Example 8: Small toggle */}
        <Toggle
          label="Small Toggle"
          value={true}
          activeTrackStyle="bg-orange-500 w-10 h-5"
          inactiveTrackStyle="bg-gray-300 w-10 h-5"
          activeThumbStyle="w-4 h-4 bg-white"
          inactiveThumbStyle="w-4 h-4 bg-white"
          labelStyle="text-sm"
        />
      </View>

      {/* Section: Tabs Examples */}
      <View style={{ gap: 16 }}>
        <Text className="text-foreground text-xl font-bold">
          Tabs Style Overrides
        </Text>

        {/* Example 1: Standard */}
        <Tabs tabs={basicTabs} />

        {/* Example 2: Custom active/inactive styling */}
        <Tabs
          tabs={basicTabs}
          variant="filled"
          containerStyles="gap-4"
          activeTabStyle="bg-blue-600 px-6 py-4 rounded-xl"
          inactiveTabStyle="bg-gray-100 px-6 py-4 rounded-xl"
          activeTextStyle="text-white text-lg font-bold"
          inactiveTextStyle="text-gray-500 text-lg"
        />

        {/* Example 3: Pill variant with custom colors */}
        <Tabs
          tabs={basicTabs}
          variant="pill"
          activeTabStyle="bg-green-500"
          inactiveTabStyle="bg-green-100"
          activeTextStyle="text-white font-semibold tracking-widest"
          inactiveTextStyle="text-green-700 tracking-widest"
        />

        {/* Example 4: Underline with custom styling */}
        <Tabs
          tabs={basicTabs}
          variant="underline"
          activeTabStyle="border-purple-500"
          inactiveTabStyle="border-transparent"
          activeTextStyle="text-purple-600 font-bold"
          inactiveTextStyle="text-gray-400"
        />

        {/* Example 5: Filled with font family */}
        <Tabs
          tabs={basicTabs}
          variant="filled"
          activeTabStyle="bg-orange-500"
          inactiveTabStyle="bg-orange-100"
          activeTextStyle="text-white"
          inactiveTextStyle="text-orange-600"
        />

        {/* Example 6: Basic without any customization */}
        <Tabs tabs={basicTabs} variant="pill" />

        {/* Example 7: Minimal styling override */}
        <Tabs
          tabs={basicTabs}
          variant="underline"
          activeTextStyle="text-blue-600 font-extrabold"
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

    </ScrollView>
  );
}
