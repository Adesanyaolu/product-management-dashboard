import React from "react";
import { SafeAreaView, Text, View } from "react-native";

export default function ProfileScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 p-4">
        <Text className="text-2xl font-bold text-foreground">Profile</Text>
        <Text className="text-muted-foreground mt-2">Profile screen coming soon...</Text>
      </View>
    </SafeAreaView>
  );
}
