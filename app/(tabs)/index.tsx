import { FilterChips } from "@/components/FilterChips";
import { ProductCard } from "@/components/ProductCard";
import { SearchBar } from "@/components/SearchBar";
import { useDebounce } from "@/hooks/useDebounce";
import { useCategories, useProducts } from "@/hooks/useProducts";
import React, { useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const debouncedSearch = useDebounce(searchQuery, 300);

  const { data: categories } = useCategories();
  const { data: products, isLoading, error, refetch } = useProducts(
    debouncedSearch,
    selectedCategory
  );

  const categoryNames = categories?.map((c) => c.name) || [];

  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-1 items-center justify-center p-4">
          <Text className="text-destructive text-lg font-semibold mb-2">
            Error loading products
          </Text>
          <Text className="text-muted-foreground text-center mb-4">
            {error instanceof Error ? error.message : "Something went wrong"}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1">
        {/* Header */}
        <View className="px-4 pt-4 pb-2">
          <Text className="text-4xl font-bold text-foreground mb-4">
            Shop
          </Text>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search products..."
          />
        </View>

        {/* Category Filters */}
        <View>
          <FilterChips
            categories={categoryNames}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </View>

        {/* Product Grid */}
        {isLoading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#000" />
          </View>
        ) : products && products.length > 0 ? (
          <FlatList
            data={products}
            renderItem={({ item }) => <ProductCard product={item} />}
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={{ paddingBottom: 20 }}
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={refetch} />
            }
          />
        ) : (
          <View className="flex-1 items-center justify-center p-4">
            <Text className="text-muted-foreground text-lg">
              No products found
            </Text>
            <Text className="text-muted-foreground text-sm mt-2">
              Try adjusting your search or filters
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
