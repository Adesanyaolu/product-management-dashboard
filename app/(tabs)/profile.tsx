import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BellRing, ShieldCheck, Sparkles, UserRound } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 px-5 py-6 justify-between">
        <View>
          <View className="items-center mt-8 mb-6">
            <View className="w-20 h-20 rounded-full bg-primary/10 items-center justify-center mb-4">
              <UserRound size={34} color="#000" />
            </View>
            <Text className="text-3xl font-bold text-foreground">Coming Soon</Text>
            <Text className="text-muted-foreground text-center mt-2">
              Your profile dashboard is under active development.
            </Text>
            <Text className="text-muted-foreground text-center">
              We are building a smarter account hub for your orders.
            </Text>
          </View>

          <Card className="mb-3">
            <CardContent className="pt-4">
              <View className="flex-row items-start gap-3">
                <View className="w-8 h-8 rounded-full bg-primary/10 items-center justify-center mt-0.5">
                  <Sparkles size={16} color="#000" />
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-semibold text-foreground mb-1">
                    Account Insights
                  </Text>
                  <Text className="text-sm text-muted-foreground">
                    Quick stats on orders, spending, and checkout history.
                  </Text>
                </View>
              </View>
            </CardContent>
          </Card>

          <Card className="mb-3">
            <CardContent className="pt-4">
              <View className="flex-row items-start gap-3">
                <View className="w-8 h-8 rounded-full bg-primary/10 items-center justify-center mt-0.5">
                  <ShieldCheck size={16} color="#000" />
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-semibold text-foreground mb-1">
                    Security & Privacy
                  </Text>
                  <Text className="text-sm text-muted-foreground">
                    Manage account security settings in one place.
                  </Text>
                </View>
              </View>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <View className="flex-row items-start gap-3">
                <View className="w-8 h-8 rounded-full bg-primary/10 items-center justify-center mt-0.5">
                  <BellRing size={16} color="#000" />
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-semibold text-foreground mb-1">
                    Notification Controls
                  </Text>
                  <Text className="text-sm text-muted-foreground">
                    Choose when and how you receive updates.
                  </Text>
                </View>
              </View>
            </CardContent>
          </Card>
        </View>

        <View className="mt-6">
          <Button size="lg" className="w-full mb-3" disabled>
            Notify Me When Ready
          </Button>
          <Text className="text-xs text-muted-foreground text-center">
            You can continue shopping while we finish this section.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
