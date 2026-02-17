import React, { useState } from "react";
import { View } from "react-native";
import { Dropdown, DropdownOption } from "./Dropdown";
import { CloseIcon, MagnifierIcon } from "@/assets/icons";

export default {
  title: "Dropdowns/Dropdown",
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
    <View style={{ padding: 16 }}>
      <Dropdown
        placeholder="Select"
        options={sampleOptions}
        value={value}
        onChange={(val) => setValue(val as string)}
      />
    </View>
  );
};

export const Disabled = () => {
  return (
    <View style={{ padding: 16, gap: 16 }}>
      <Dropdown
        placeholder="Select"
        options={sampleOptions}
        disabled
      />
    </View>
  );
};

export const Select = () => {
  const [value, setValue] = useState<string>("3");

  return (
    <View style={{ padding: 16 }}>
      <Dropdown
        placeholder="Select"
        options={sampleOptions}
        value={value}
        onChange={(val) => setValue(val as string)}
      />
    </View>
  );
};

export const AutoSuggest = () => {
  const [value, setValue] = useState<string>("");

  return (
    <View style={{ padding: 16, zIndex: 1 }}>
      <Dropdown
        placeholder="Start typing to see suggestions..."
        options={sampleOptions}
        value={value}
        onChange={(val) => setValue(val as string)}
        autoComplete
      />
    </View>
  );
};

export const MultiSelectWithCheckbox = () => {
  const [values, setValues] = useState<string[]>([]);

  return (
    <View style={{ padding: 16 }}>
      <Dropdown
        placeholder="Select with checkboxes"
        options={[
          { label: "Example 1", value: "1" },
          { label: "Example 2", value: "2" },
          { label: "Example 3", value: "3" },
          { label: "Example 4", value: "4" },
          { label: "Example 5", value: "5" },
        ]}
        value={values}
        onChange={(val) => setValues(val as string[])}
        multiSelect
        showCheckbox
        selectedItemIcon={<CloseIcon width={20} height={20} color="#000" />}
      />
    </View>
  );
};

export const AfterMultiSelect = () => {
  const [values, setValues] = useState<string[]>(["2", "4"]);

  return (
    <View style={{ padding: 16 }}>
      <Dropdown
        placeholder="Select"
        options={[
          { label: "Example 2", value: "2" },
          { label: "Example 4", value: "4" },
        ]}
        value={values}
        onChange={(val) => setValues(val as string[])}
        multiSelect
        selectedItemIcon={<CloseIcon width={12} height={12} color="#929292" />}
      />
    </View>
  );
};

export const SelectWithSearch = () => {
  const [value, setValue] = useState<string>("");

  return (
    <View style={{ padding: 16, gap: 16 }}>
      <View>
        <Dropdown
          placeholder="With search inside dropdown"
          searchPlaceholder="Search..."
          options={sampleOptions}
          value={value}
          onChange={(val) => setValue(val as string)}
          searchable
          leftIcon={<MagnifierIcon width={16} height={16} color="#929292" />}
        />
      </View>
    </View>
  );
};
