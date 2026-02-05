import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/contexts/CartContext";
import { useProduct } from "@/hooks/useProducts";
import { router, useLocalSearchParams } from "expo-router";
import { Minus, Plus, ShoppingCart, X } from "lucide-react-native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const styles = StyleSheet.create({
  productImage: {
    width: '100%',
    height: 384,
  },
});

export default function ProductDetailScreen() {
  const { id: sku } = useLocalSearchParams<{ id: string }>();
  const { data: product, isLoading, error } = useProduct(sku);
  const { addItem, getItemQuantity } = useCart();
  const [quantity, setQuantity] = useState(1);

  const currentCartQuantity = product ? getItemQuantity(product.sku) : 0;

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
      router.back();
    }
  };

  const incrementQuantity = () => setQuantity((q) => Math.min(q + 1, product?.stock || 99));
  const decrementQuantity = () => setQuantity((q) => Math.max(q - 1, 1));

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#000" />
        </View>
      </SafeAreaView>
    );
  }

  if (error || !product) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-1 items-center justify-center p-4">
          <Text className="text-destructive text-lg font-semibold">
            Product not found
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1">
        {/* Close Button */}
        <Pressable
          onPress={() => router.back()}
          className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-md"
        >
          <X size={24} color="#000" />
        </Pressable>

        {/* Product Image */}
        <View className="relative">
          <Image
            source={{ uri: product.image }}
            style={styles.productImage}
            resizeMode="cover"
          />
          <View className="absolute top-4 left-4 flex-row gap-2">
            {product.isNew && <Badge variant="default">New</Badge>}
            {product.onSale && <Badge variant="destructive">Sale</Badge>}
          </View>
        </View>

        {/* Product Info */}
        <View className="p-4">
          <Text className="text-2xl font-bold text-foreground mb-2">
            {product.name}
          </Text>

          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-3xl font-bold text-foreground">
              ${product.price.toFixed(2)}
            </Text>
            {product.rating && (
              <View className="flex-row items-center">
                <Text className="text-lg">⭐</Text>
                <Text className="text-lg font-semibold ml-1">
                  {product.rating.toFixed(1)}
                </Text>
              </View>
            )}
          </View>

          <Badge variant="outline" className="self-start mb-4">
            {product.category}
          </Badge>

          <Card className="mb-4">
            <CardContent className="pt-4">
              <Text className="text-sm font-semibold text-foreground mb-2">
                Description
              </Text>
              <Text className="text-sm text-muted-foreground leading-6">
                {product.description}
              </Text>
            </CardContent>
          </Card>

          <Card className="mb-4">
            <CardContent className="pt-4">
              <View className="flex-row justify-between items-center">
                <Text className="text-sm font-semibold text-foreground">
                  Stock
                </Text>
                <Text className="text-sm text-muted-foreground">
                  {product.stock} available
                </Text>
              </View>
            </CardContent>
          </Card>

          {currentCartQuantity > 0 && (
            <View className="bg-secondary p-3 rounded-md mb-4">
              <Text className="text-sm text-secondary-foreground">
                {currentCartQuantity} already in cart
              </Text>
            </View>
          )}

          {/* Quantity Selector */}
          <View className="mb-6">
            <Text className="text-sm font-semibold text-foreground mb-2">
              Quantity
            </Text>
            <View className="flex-row items-center gap-4">
              <Pressable
                onPress={decrementQuantity}
                className="bg-secondary rounded-md p-3"
              >
                <Minus size={20} color="#000" />
              </Pressable>
              <Text className="text-xl font-semibold text-foreground min-w-[40px] text-center">
                {quantity}
              </Text>
              <Pressable
                onPress={incrementQuantity}
                className="bg-secondary rounded-md p-3"
              >
                <Plus size={20} color="#000" />
              </Pressable>
            </View>
          </View>

          {/* Add to Cart Button */}
          <Button onPress={handleAddToCart} size="lg" className="w-full">
            <View className="flex-row items-center gap-2">
              <ShoppingCart size={20} color="white" />
              <Text className="text-primary-foreground text-base font-semibold">
                Add to Cart - ${(product.price * quantity).toFixed(2)}
              </Text>
            </View>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
