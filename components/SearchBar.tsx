import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react-native";
import React from "react";
import { TextInput, View } from "react-native";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({
  value,
  onChangeText,
  placeholder = "Search products...",
  className,
}: SearchBarProps) {
  return (
    <View
      className={cn(
        "flex-row items-center h-10 rounded-md border border-input bg-background px-3",
        className
      )}
    >
      <Search size={18} color="#999" />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#999"
        className="flex-1 ml-2 text-sm text-foreground"
      />
      {value.length > 0 && (
        <X
          size={18}
          color="#999"
          onPress={() => onChangeText("")}
        />
      )}
    </View>
  );
}
