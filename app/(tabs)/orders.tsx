import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Order } from "@/types";
import { storage } from "@/utils/storage";
import { Package } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OrdersScreen() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const loadOrders = async () => {
      const savedOrders = await storage.loadOrders();
      setOrders(savedOrders);
    };
    loadOrders();
  }, []);

  if (orders.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="p-4">
          <Text className="text-2xl font-bold text-foreground mb-4">
            Orders
          </Text>
        </View>
        <View className="flex-1 items-center justify-center p-4">
          <Package size={64} color="#999" />
          <Text className="text-xl font-semibold text-foreground mt-4">
            No orders yet
          </Text>
          <Text className="text-sm text-muted-foreground mt-2 text-center">
            Your order history will appear here
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="p-4">
        <Text className="text-2xl font-bold text-foreground mb-4">
          Orders
        </Text>
      </View>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingTop: 0 }}
        renderItem={({ item: order }) => {
          const orderDate = new Date(order.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          });

          const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);

          return (
            <Card className="mb-3">
              <CardContent className="pt-4">
                <View className="flex-row justify-between items-start mb-3">
                  <View>
                    <Text className="text-xs text-muted-foreground mb-1">
                      {orderDate}
                    </Text>
                    <Text className="text-sm font-semibold text-foreground">
                      {order.id}
                    </Text>
                  </View>
                  <Badge
                    variant={
                      order.status === "delivered"
                        ? "default"
                        : order.status === "pending"
                        ? "outline"
                        : "secondary"
                    }
                  >
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                </View>

                <View className="flex-row justify-between items-center mb-2">
                  <Text className="text-sm text-muted-foreground">
                    {itemCount} {itemCount === 1 ? "item" : "items"}
                  </Text>
                  <Text className="text-base font-bold text-foreground">
                    ${order.total.toFixed(2)}
                  </Text>
                </View>

                <View className="h-px bg-border my-2" />

                <Text className="text-xs text-muted-foreground">
                  {order.shippingAddress.fullName}
                </Text>
                <Text className="text-xs text-muted-foreground">
                  {order.shippingAddress.city}, {order.shippingAddress.state}
                </Text>
              </CardContent>
            </Card>
          );
        }}
      />
    </SafeAreaView>
  );
}
