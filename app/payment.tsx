import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { router, useLocalSearchParams } from "expo-router";
import { ArrowLeft, CreditCard, Lock } from "lucide-react-native";
import React, { useState } from "react";
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type PaymentMethod = "credit_card" | "debit_card" | "paypal";

export default function PaymentScreen() {
  const { amount, orderId, paymentMethod } = useLocalSearchParams<{
    amount: string;
    orderId: string;
    paymentMethod: PaymentMethod;
  }>();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isPayPal = paymentMethod === "paypal";

  // Format card number with spaces
  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\D/g, "");
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(" ").substring(0, 19) : cleaned;
  };

  // Format expiry date as MM/YY
  const formatExpiryDate = (text: string) => {
    const cleaned = text.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + "/" + cleaned.substring(2, 4);
    }
    return cleaned;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!isPayPal) {
      if (!cardholderName.trim()) {
        newErrors.cardholderName = "Cardholder name is required";
      }

      const cleanCardNumber = cardNumber.replace(/\s/g, "");
      if (!cleanCardNumber || cleanCardNumber.length < 13) {
        newErrors.cardNumber = "Valid card number is required";
      }

      const cleanExpiry = expiryDate.replace("/", "");
      if (!cleanExpiry || cleanExpiry.length !== 4) {
        newErrors.expiryDate = "Valid expiry date is required (MM/YY)";
      } else {
        const month = parseInt(cleanExpiry.substring(0, 2), 10);
        if (month < 1 || month > 12) {
          newErrors.expiryDate = "Invalid month";
        }
      }

      if (!cvv || cvv.length < 3) {
        newErrors.cvv = "Valid CVV is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate brief validation delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    setIsSubmitting(false);

    // Navigate to payment processing
    router.push({
      pathname: "/payment-processing",
      params: { amount, orderId },
    });
  };

  const handlePayPalSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate PayPal redirect delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    setIsSubmitting(false);

    // Navigate to payment processing
    router.push({
      pathname: "/payment-processing",
      params: { amount, orderId },
    });
  };

  const getCardType = (number: string) => {
    const cleaned = number.replace(/\s/g, "");
    if (cleaned.startsWith("4")) return "Visa";
    if (/^5[1-5]/.test(cleaned)) return "Mastercard";
    if (/^3[47]/.test(cleaned)) return "Amex";
    if (/^6(?:011|5)/.test(cleaned)) return "Discover";
    return null;
  };

  const cardType = getCardType(cardNumber);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView className="flex-1">
          {/* Header */}
          <View className="flex-row items-center p-4 border-b border-border">
            <Pressable onPress={() => router.back()} className="mr-4">
              <ArrowLeft size={24} color="#000" />
            </Pressable>
            <Text className="text-xl font-bold text-foreground">
              Payment Details
            </Text>
          </View>

          <View className="p-4">
            {/* Amount Summary */}
            <Card className="mb-6">
              <CardContent className="pt-4">
                <View className="flex-row justify-between items-center">
                  <Text className="text-muted-foreground">Amount to pay</Text>
                  <Text className="text-2xl font-bold text-foreground">
                    ${amount}
                  </Text>
                </View>
                <Text className="text-xs text-muted-foreground mt-1">
                  Order ID: {orderId}
                </Text>
              </CardContent>
            </Card>

            {/* Payment Method Indicator */}
            <View className="flex-row items-center mb-6">
              <View className="bg-primary/10 rounded-full p-2 mr-3">
                <CreditCard size={20} color="#000" />
              </View>
              <View>
                <Text className="text-sm font-semibold text-foreground">
                  {paymentMethod === "credit_card" && "Credit Card"}
                  {paymentMethod === "debit_card" && "Debit Card"}
                  {paymentMethod === "paypal" && "PayPal"}
                </Text>
                <Text className="text-xs text-muted-foreground">
                  {isPayPal
                    ? "You'll be redirected to PayPal"
                    : "Enter your card details below"}
                </Text>
              </View>
            </View>

            {isPayPal ? (
              /* PayPal Flow */
              <View>
                <Card className="mb-6">
                  <CardContent className="pt-4 items-center">
                    <Text className="text-6xl mb-4">🅿️</Text>
                    <Text className="text-lg font-semibold text-foreground mb-2">
                      Pay with PayPal
                    </Text>
                    <Text className="text-sm text-muted-foreground text-center">
                      You will be securely redirected to PayPal to complete your
                      payment of ${amount}
                    </Text>
                  </CardContent>
                </Card>

                <Button
                  onPress={handlePayPalSubmit}
                  size="lg"
                  className="w-full mb-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text className="text-primary-foreground text-base font-semibold">
                      Continue to PayPal
                    </Text>
                  )}
                </Button>
              </View>
            ) : (
              /* Card Payment Form */
              <View>
                {/* Cardholder Name */}
                <View className="mb-4">
                  <Label>Cardholder Name</Label>
                  <Input
                    value={cardholderName}
                    onChangeText={setCardholderName}
                    placeholder="John Doe"
                    autoCapitalize="words"
                  />
                  {errors.cardholderName && (
                    <Text className="text-destructive text-xs mt-1">
                      {errors.cardholderName}
                    </Text>
                  )}
                </View>

                {/* Card Number */}
                <View className="mb-4">
                  <View className="flex-row justify-between items-center">
                    <Label>Card Number</Label>
                    {cardType && (
                      <Text className="text-xs text-muted-foreground">
                        {cardType}
                      </Text>
                    )}
                  </View>
                  <Input
                    value={cardNumber}
                    onChangeText={(text) => setCardNumber(formatCardNumber(text))}
                    placeholder="1234 5678 9012 3456"
                    keyboardType="numeric"
                  />
                  {errors.cardNumber && (
                    <Text className="text-destructive text-xs mt-1">
                      {errors.cardNumber}
                    </Text>
                  )}
                </View>

                {/* Expiry and CVV */}
                <View className="flex-row gap-4 mb-6">
                  <View className="flex-1">
                    <Label>Expiry Date</Label>
                    <Input
                      value={expiryDate}
                      onChangeText={(text) => setExpiryDate(formatExpiryDate(text))}
                      placeholder="MM/YY"
                      keyboardType="numeric"
                    />
                    {errors.expiryDate && (
                      <Text className="text-destructive text-xs mt-1">
                        {errors.expiryDate}
                      </Text>
                    )}
                  </View>

                  <View className="flex-1">
                    <Label>CVV</Label>
                    <Input
                      value={cvv}
                      onChangeText={(text) => setCvv(text.replace(/\D/g, "").substring(0, 4))}
                      placeholder="123"
                      keyboardType="numeric"
                      secureTextEntry
                    />
                    {errors.cvv && (
                      <Text className="text-destructive text-xs mt-1">
                        {errors.cvv}
                      </Text>
                    )}
                  </View>
                </View>

                {/* Security Notice */}
                <View className="flex-row items-center bg-secondary/50 rounded-lg p-3 mb-6">
                  <Lock size={16} color="#666" />
                  <Text className="text-xs text-muted-foreground ml-2 flex-1">
                    Your payment information is encrypted and secure. We never
                    store your full card details.
                  </Text>
                </View>

                {/* Submit Button */}
                <Button
                  onPress={handleSubmit}
                  size="lg"
                  className="w-full mb-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text className="text-primary-foreground text-base font-semibold">
                      Pay ${amount}
                    </Text>
                  )}
                </Button>
              </View>
            )}

            {/* Cancel Link */}
            <Pressable onPress={() => router.back()} className="py-2">
              <Text className="text-center text-muted-foreground">
                Cancel and return to checkout
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
