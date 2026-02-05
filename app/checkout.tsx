import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/contexts/CartContext";
import { Order } from "@/types";
import { storage } from "@/utils/storage";
import { CheckoutFormData, checkoutSchema } from "@/utils/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
    ActivityIndicator,
    Pressable,
    SafeAreaView,
    ScrollView,
    Text,
    View,
} from "react-native";

export default function CheckoutScreen() {
  const { items, total, subtotal, tax, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<"credit_card" | "debit_card" | "paypal">("credit_card");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      email: "",
      phone: "",
      fullName: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zipCode: "",
      country: "USA",
      paymentMethod: "credit_card",
    },
  });

  const onSubmit = async (data: CheckoutFormData) => {
    setIsSubmitting(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Create order
    const order: Order = {
      id: `ORD-${Date.now()}`,
      items,
      total,
      subtotal,
      tax,
      shippingAddress: {
        fullName: data.fullName,
        addressLine1: data.addressLine1,
        addressLine2: data.addressLine2,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        country: data.country,
      },
      contactInfo: {
        email: data.email,
        phone: data.phone,
      },
      status: "pending",
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    };

    // Save order
    await storage.saveOrder(order);

    // Clear cart
    clearCart();

    setIsSubmitting(false);

    // Navigate to confirmation
    router.replace({
      pathname: "/order-confirmation",
      params: { orderId: order.id },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1">
        <View className="p-4">
          <Text className="text-2xl font-bold text-foreground mb-4">
            Checkout
          </Text>

          {/* Order Summary */}
          <Card className="mb-6">
            <CardContent className="pt-4">
              <Text className="text-sm font-semibold text-foreground mb-3">
                Order Summary
              </Text>
              {items.map((item) => (
                <View key={item.product.id} className="flex-row justify-between mb-2">
                  <Text className="text-sm text-muted-foreground flex-1" numberOfLines={1}>
                    {item.product.name} x{item.quantity}
                  </Text>
                  <Text className="text-sm font-semibold text-foreground">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </Text>
                </View>
              ))}
              <View className="h-px bg-border my-2" />
              <View className="flex-row justify-between">
                <Text className="text-base font-bold text-foreground">Total</Text>
                <Text className="text-base font-bold text-foreground">
                  ${total.toFixed(2)}
                </Text>
              </View>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Text className="text-lg font-semibold text-foreground mb-3">
            Contact Information
          </Text>

          <View className="mb-4">
            <Label>Email</Label>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  value={value}
                  onChangeText={onChange}
                  placeholder="john@example.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              )}
            />
            {errors.email && (
              <Text className="text-destructive text-xs mt-1">
                {errors.email.message}
              </Text>
            )}
          </View>

          <View className="mb-6">
            <Label>Phone</Label>
            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, value } }) => (
                <Input
                  value={value}
                  onChangeText={onChange}
                  placeholder="+1 (555) 123-4567"
                  keyboardType="phone-pad"
                />
              )}
            />
            {errors.phone && (
              <Text className="text-destructive text-xs mt-1">
                {errors.phone.message}
              </Text>
            )}
          </View>

          {/* Shipping Address */}
          <Text className="text-lg font-semibold text-foreground mb-3">
            Shipping Address
          </Text>

          <View className="mb-4">
            <Label>Full Name</Label>
            <Controller
              control={control}
              name="fullName"
              render={({ field: { onChange, value } }) => (
                <Input
                  value={value}
                  onChangeText={onChange}
                  placeholder="John Doe"
                />
              )}
            />
            {errors.fullName && (
              <Text className="text-destructive text-xs mt-1">
                {errors.fullName.message}
              </Text>
            )}
          </View>

          <View className="mb-4">
            <Label>Address Line 1</Label>
            <Controller
              control={control}
              name="addressLine1"
              render={({ field: { onChange, value } }) => (
                <Input
                  value={value}
                  onChangeText={onChange}
                  placeholder="123 Main St"
                />
              )}
            />
            {errors.addressLine1 && (
              <Text className="text-destructive text-xs mt-1">
                {errors.addressLine1.message}
              </Text>
            )}
          </View>

          <View className="mb-4">
            <Label>Address Line 2 (Optional)</Label>
            <Controller
              control={control}
              name="addressLine2"
              render={({ field: { onChange, value } }) => (
                <Input
                  value={value}
                  onChangeText={onChange}
                  placeholder="Apt 4B"
                />
              )}
            />
          </View>

          <View className="flex-row gap-2 mb-4">
            <View className="flex-1">
              <Label>City</Label>
              <Controller
                control={control}
                name="city"
                render={({ field: { onChange, value } }) => (
                  <Input
                    value={value}
                    onChangeText={onChange}
                    placeholder="New York"
                  />
                )}
              />
              {errors.city && (
                <Text className="text-destructive text-xs mt-1">
                  {errors.city.message}
                </Text>
              )}
            </View>

            <View className="flex-1">
              <Label>State</Label>
              <Controller
                control={control}
                name="state"
                render={({ field: { onChange, value } }) => (
                  <Input
                    value={value}
                    onChangeText={onChange}
                    placeholder="NY"
                  />
                )}
              />
              {errors.state && (
                <Text className="text-destructive text-xs mt-1">
                  {errors.state.message}
                </Text>
              )}
            </View>
          </View>

          <View className="mb-6">
            <Label>ZIP Code</Label>
            <Controller
              control={control}
              name="zipCode"
              render={({ field: { onChange, value } }) => (
                <Input
                  value={value}
                  onChangeText={onChange}
                  placeholder="10001"
                  keyboardType="numeric"
                />
              )}
            />
            {errors.zipCode && (
              <Text className="text-destructive text-xs mt-1">
                {errors.zipCode.message}
              </Text>
            )}
          </View>

          {/* Payment Method */}
          <Text className="text-lg font-semibold text-foreground mb-3">
            Payment Method
          </Text>

          <View className="flex-row gap-2 mb-6">
            {(["credit_card", "debit_card", "paypal"] as const).map((method) => (
              <Pressable
                key={method}
                onPress={() => setSelectedPayment(method)}
                className="flex-1"
              >
                <Badge
                  variant={selectedPayment === method ? "default" : "outline"}
                  className="w-full py-3"
                >
                  {method === "credit_card" && "Credit Card"}
                  {method === "debit_card" && "Debit Card"}
                  {method === "paypal" && "PayPal"}
                </Badge>
              </Pressable>
            ))}
          </View>

          {/* Submit Button */}
          <Button
            onPress={handleSubmit(onSubmit)}
            size="lg"
            className="w-full mb-6"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-primary-foreground text-base font-semibold">
                Place Order - ${total.toFixed(2)}
              </Text>
            )}
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
