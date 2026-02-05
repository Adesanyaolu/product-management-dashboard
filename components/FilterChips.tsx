import React from "react";
import { Pressable, ScrollView } from "react-native";
import { Badge } from "./ui/badge";

interface FilterChipsProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function FilterChips({
  categories,
  selectedCategory,
  onSelectCategory,
}: FilterChipsProps) {
  const allCategories = ["All", ...categories];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="flex-row gap-2 py-2"
      contentContainerClassName="px-4"
    >
      {allCategories.map((category) => {
        const isSelected = 
          (category === "All" && selectedCategory === "all") ||
          category === selectedCategory;

        return (
          <Pressable key={category} onPress={() => onSelectCategory(category === "All" ? "all" : category)}>
            <Badge
              variant={isSelected ? "default" : "outline"}
              className="mr-2"
            >
              {category}
            </Badge>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
