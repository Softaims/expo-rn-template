import React, { useState } from "react";
import { View } from "react-native";
import { Dropdown, DropdownOption } from "./Dropdown";
import { ChevronDownIcon, CloseIcon } from "@/assets/icons";

export default {
  title: "Dropdown",
  component: Dropdown,
};

const sampleOptions: DropdownOption[] = [
  { label: "Example 01", value: "1" },
  { label: "Example 02", value: "2" },
  { label: "Example 03", value: "3" },
  { label: "Example 04", value: "4" },
  { label: "Example 05", value: "5" },
];

export const Default = () => {
  const [value, setValue] = useState<string>("");

  return (
    <View className="p-4">
      <Dropdown
        placeholder="Select"
        options={sampleOptions}
        value={value}
        onChange={(val) => setValue(val as string)}
        chevronIcon={<ChevronDownIcon width={16} height={16} color="#666" />}
      />
    </View>
  );
};

export const Disabled = () => {
  return (
    <View className="p-4">
      <Dropdown
        placeholder="Select"
        options={sampleOptions}
        disabled
        chevronIcon={<ChevronDownIcon width={16} height={16} color="#999" />}
      />
    </View>
  );
};

export const AfterMultiSelect = () => {
  const [values, setValues] = useState<string[]>(["2", "4"]);

  return (
    <View className="p-4">
      <Dropdown
        placeholder="Select"
        options={[
          { label: "Example 2", value: "2" },
          { label: "Example 4", value: "4" },
        ]}
        value={values}
        onChange={(val) => setValues(val as string[])}
        multiSelect
        chevronIcon={<ChevronDownIcon width={16} height={16} color="#666" />}
        selectedItemCloseIcon={<CloseIcon width={12} height={12} color="#666" />}
      />
    </View>
  );
};

export const SelectWithSearch = () => {
  const [value, setValue] = useState<string>("");

  return (
    <View className="p-4">
      <Dropdown
        placeholder="Select"
        options={sampleOptions}
        value={value}
        onChange={(val) => setValue(val as string)}
        searchable
        chevronIcon={<ChevronDownIcon width={16} height={16} color="#666" />}
      />
    </View>
  );
};

