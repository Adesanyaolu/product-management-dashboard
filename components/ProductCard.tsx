import { useCart } from "@/contexts/CartContext";
import { Product } from "@/types";
import { router } from "expo-router";
import { Plus } from "lucide-react-native";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";

interface ProductCardProps {
  product: Product;
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 192,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
});

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product, 1);
  };

  const handlePress = () => {
    router.push(`/product/${product.id}`);
  };

  return (
    <Pressable onPress={handlePress} className="flex-1">
      <Card className="m-2">
        <View className="relative">
          <Image
            source={{ uri: product.image }}
            style={styles.image}
            resizeMode="cover"
          />
          {product.isNew && (
            <View className="absolute top-2 left-2">
              <Badge variant="default">New</Badge>
            </View>
          )}
          {product.onSale && (
            <View className="absolute top-2 right-2">
              <Badge variant="destructive">Sale</Badge>
            </View>
          )}
        </View>
        <CardContent className="pt-3">
          <Text className="text-sm font-medium text-foreground mb-1" numberOfLines={2}>
            {product.name}
          </Text>
          <Text className="text-lg font-bold text-foreground">
            ${product.price.toFixed(2)}
          </Text>
          {product.rating && (
            <Text className="text-xs text-muted-foreground mt-1">
              ⭐ {product.rating.toFixed(1)}
            </Text>
          )}
        </CardContent>
        <CardFooter>
          <Button
            onPress={handleAddToCart}
            size="sm"
            className="flex-1"
          >
            <View className="flex-row items-center gap-1">
              <Plus size={16} color="white" />
              <Text className="text-primary-foreground text-sm font-medium">Add to Cart</Text>
            </View>
          </Button>
        </CardFooter>
      </Card>
    </Pressable>
  );
}
