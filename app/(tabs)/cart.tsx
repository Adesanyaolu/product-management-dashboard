import { CartItem } from "@/components/CartItem";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/contexts/CartContext";
import { router } from "expo-router";
import { ShoppingBag } from "lucide-react-native";
import React from "react";
import {
  ScrollView,
  Text,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CartScreen() {
  const { items, subtotal, tax, total, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-1 items-center justify-center p-4">
          <ShoppingBag size={64} color="#999" />
          <Text className="text-xl font-semibold text-foreground mt-4">
            Your cart is empty
          </Text>
          <Text className="text-sm text-muted-foreground mt-2 text-center">
            Add some products to get started
          </Text>
          <Button
            onPress={() => router.push("/(tabs)")}
            className="mt-6"
          >
            <Text className="text-primary-foreground font-medium">
              Start Shopping
            </Text>
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1">
        {/* Header */}
        <View className="px-4 pt-4 pb-2 flex-row justify-between items-center">
          <Text className="text-2xl font-bold text-foreground">
            Cart ({items.length})
          </Text>
          <Button
            onPress={clearCart}
            variant="ghost"
            size="sm"
          >
            <Text className="text-destructive text-sm">Clear All</Text>
          </Button>
        </View>

        {/* Cart Items */}
        <ScrollView className="flex-1 px-4">
          {items.map((item) => (
            <CartItem key={item.product.id} item={item} />
          ))}
        </ScrollView>

        {/* Summary */}
        <View className="p-4 border-t border-border bg-card">
          <Card className="mb-4">
            <CardContent className="pt-4">
              <View className="flex-row justify-between mb-2">
                <Text className="text-sm text-muted-foreground">Subtotal</Text>
                <Text className="text-sm font-semibold text-foreground">
                  ${subtotal.toFixed(2)}
                </Text>
              </View>
              <View className="flex-row justify-between mb-2">
                <Text className="text-sm text-muted-foreground">Tax (8%)</Text>
                <Text className="text-sm font-semibold text-foreground">
                  ${tax.toFixed(2)}
                </Text>
              </View>
              <View className="h-px bg-border my-2" />
              <View className="flex-row justify-between">
                <Text className="text-base font-bold text-foreground">Total</Text>
                <Text className="text-base font-bold text-foreground">
                  ${total.toFixed(2)}
                </Text>
              </View>
            </CardContent>
          </Card>

          <Button
            onPress={() => router.push("/checkout")}
            size="lg"
            className="w-full"
          >
            <Text className="text-primary-foreground text-base font-semibold">
              Proceed to Checkout
            </Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
