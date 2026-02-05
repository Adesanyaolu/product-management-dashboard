import { useCart } from "@/contexts/CartContext";
import { CartItem as CartItemType } from "@/types";
import { Minus, Plus, Trash2 } from "lucide-react-native";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();
  const { product, quantity } = item;

  const handleIncrement = () => updateQuantity(product.id, quantity + 1);
  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    } else {
      removeItem(product.id);
    }
  };

  return (
    <View className="flex-row bg-card border border-border rounded-lg p-3 mb-3">
      <Image
        source={{ uri: product.image }}
        className="w-20 h-20 rounded-md"
        resizeMode="cover"
      />
      
      <View className="flex-1 ml-3">
        <Text className="text-sm font-semibold text-foreground mb-1" numberOfLines={2}>
          {product.name}
        </Text>
        <Text className="text-xs text-muted-foreground mb-2">
          {product.category}
        </Text>
        <Text className="text-base font-bold text-foreground">
          ${product.price.toFixed(2)}
        </Text>
      </View>

      <View className="items-end justify-between">
        <Pressable
          onPress={() => removeItem(product.id)}
          className="p-1"
        >
          <Trash2 size={18} color="#ef4444" />
        </Pressable>

        <View className="flex-row items-center gap-2">
          <Pressable
            onPress={handleDecrement}
            className="bg-secondary rounded p-1"
          >
            <Minus size={16} color="#000" />
          </Pressable>
          <Text className="text-sm font-semibold text-foreground min-w-[24px] text-center">
            {quantity}
          </Text>
          <Pressable
            onPress={handleIncrement}
            className="bg-secondary rounded p-1"
          >
            <Plus size={16} color="#000" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
