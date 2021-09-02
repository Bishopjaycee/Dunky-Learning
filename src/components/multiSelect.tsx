import React from "react";
import MultiSelect from "react-native-multiple-select";

interface Props {
  items: { id: string; name: string }[];
  multiple?: boolean;
  onSelectedItemsChange: (selectedItems: string[]) => void;
  selectedItems: { id: string; name: string }[];
  onChangeInput: (text: string) => void;
  placeholder?: string;
  selectText?: string;

  onAddItem?: (newItem: unknown) => void;
}

export default function CustomMultiSelect({
  items,
  multiple = false,
  onChangeInput,
  placeholder = "Select Item",
  selectText = "Pick Items",
  onSelectedItemsChange,
  selectedItems,
  onAddItem,
}: Props) {
  return (
    <MultiSelect
      canAddItems
      styleListContainer={{ height: 150, paddingBottom: 4 }}
      single={!multiple}
      hideTags
      items={items}
      onAddItem={onAddItem}
      uniqueKey="id"
      onSelectedItemsChange={onSelectedItemsChange}
      selectedItems={selectedItems}
      selectText={selectText}
      searchInputPlaceholderText={placeholder}
      onChangeInput={onChangeInput}
      altFontFamily="Inter"
      tagRemoveIconColor="#CCC"
      tagBorderColor="rgba(134, 134, 134, 0.5)"
      tagTextColor="#CCC"
      selectedItemTextColor="#5956E9"
      selectedItemIconColor="#5956E9"
      itemTextColor="#000"
      styleDropdownMenuSubsection={{ paddingLeft: 10 }}
      displayKey="name"
      searchInputStyle={{ color: "#5956E9", marginLeft: 4 }}
      submitButtonColor="#5956E9AF"
      submitButtonText="Submit"
    />
  );
}
