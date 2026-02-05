import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Order } from "@/types";
import { storage } from "@/utils/storage";
import { router, useLocalSearchParams } from "expo-router";
import { CheckCircle } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OrderConfirmationScreen() {
  const { orderId } = useLocalSearchParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const loadOrder = async () => {
      const orders = await storage.loadOrders();
      const foundOrder = orders.find((o) => o.id === orderId);
      if (foundOrder) {
        setOrder(foundOrder);
      }
    };
    loadOrder();
  }, [orderId]);

  if (!order) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-1 items-center justify-center">
          <Text className="text-muted-foreground">Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const estimatedDate = new Date(order.estimatedDelivery || "").toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 items-center justify-center p-4">
        {/* Success Icon */}
        <View className="bg-green-100 rounded-full p-6 mb-6">
          <CheckCircle size={64} color="#22c55e" />
        </View>

        <Text className="text-2xl font-bold text-foreground mb-2">
          Order Confirmed!
        </Text>
        <Text className="text-sm text-muted-foreground text-center mb-6">
          Thank you for your purchase
        </Text>

        {/* Order Details */}
        <Card className="w-full mb-6">
          <CardContent className="pt-4">
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-sm text-muted-foreground">Order Number</Text>
              <Badge variant="outline">{order.id}</Badge>
            </View>

            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-sm text-muted-foreground">Total Amount</Text>
              <Text className="text-lg font-bold text-foreground">
                ${order.total.toFixed(2)}
              </Text>
            </View>

            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-sm text-muted-foreground">Items</Text>
              <Text className="text-sm font-semibold text-foreground">
                {order.items.reduce((sum, item) => sum + item.quantity, 0)} items
              </Text>
            </View>

            <View className="h-px bg-border my-3" />

            <View className="flex-row justify-between items-center">
              <Text className="text-sm text-muted-foreground">
                Estimated Delivery
              </Text>
              <Text className="text-sm font-semibold text-foreground">
                {estimatedDate}
              </Text>
            </View>
          </CardContent>
        </Card>

        {/* Shipping Address */}
        <Card className="w-full mb-6">
          <CardContent className="pt-4">
            <Text className="text-sm font-semibold text-foreground mb-2">
              Shipping Address
            </Text>
            <Text className="text-sm text-muted-foreground">
              {order.shippingAddress.fullName}
            </Text>
            <Text className="text-sm text-muted-foreground">
              {order.shippingAddress.addressLine1}
            </Text>
            {order.shippingAddress.addressLine2 && (
              <Text className="text-sm text-muted-foreground">
                {order.shippingAddress.addressLine2}
              </Text>
            )}
            <Text className="text-sm text-muted-foreground">
              {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
              {order.shippingAddress.zipCode}
            </Text>
          </CardContent>
        </Card>

        {/* Actions */}
        <View className="w-full gap-3">
          <Button
            onPress={() => router.push("/(tabs)/orders")}
            size="lg"
            className="w-full"
          >
            <Text className="text-primary-foreground font-semibold">
              View Orders
            </Text>
          </Button>
          <Button
            onPress={() => router.push("/(tabs)")}
            variant="outline"
            size="lg"
            className="w-full"
          >
            <Text className="text-foreground font-semibold">
              Continue Shopping
            </Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
