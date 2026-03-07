import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { router } from "expo-router";
import { ShoppingBag, Truck } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 px-5 py-8 justify-between">
        <View className="pt-8">
          <Text className="text-xs tracking-widest text-muted-foreground uppercase mb-3">
            Product Dashboard
          </Text>
          <Text className="text-4xl font-bold text-foreground leading-tight mb-3">
            Manage Orders Fast,
            {"\n"}
            Sell Smarter.
          </Text>
          <Text className="text-base text-muted-foreground">
            Browse products, build a cart, and place orders in one flow.
          </Text>
        </View>

        <View className="gap-3">
          <Card>
            <CardContent className="pt-4">
              <View className="flex-row items-start gap-3">
                <View className="bg-primary/10 rounded-full p-2 mt-0.5">
                  <ShoppingBag size={18} color="#000" />
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-semibold text-foreground mb-1">
                    Full Catalog Access
                  </Text>
                  <Text className="text-sm text-muted-foreground">
                    Search and filter products instantly from the Shop tab.
                  </Text>
                </View>
              </View>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <View className="flex-row items-start gap-3">
                <View className="bg-primary/10 rounded-full p-2 mt-0.5">
                  <Truck size={18} color="#000" />
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-semibold text-foreground mb-1">
                    WhatsApp Checkout
                  </Text>
                  <Text className="text-sm text-muted-foreground">
                    Orders are sent directly to your WhatsApp line for quick
                    confirmation.
                  </Text>
                </View>
              </View>
            </CardContent>
          </Card>
        </View>

        <View className="gap-3">
          <Button
            size="lg"
            className="w-full"
            onPress={() => router.push("/(tabs)")}
          >
            Enter Store
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full"
            onPress={() => router.push("/(tabs)/orders")}
          >
            View Orders
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
