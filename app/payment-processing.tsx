import { Card, CardContent } from "@/components/ui/card";
import { router, useLocalSearchParams } from "expo-router";
import { CheckCircle, CreditCard } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PaymentProcessingScreen() {
  const { amount, orderId } = useLocalSearchParams<{ amount: string; orderId: string }>();
  const [status, setStatus] = useState<"processing" | "success" | "error">("processing");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate payment processing steps
    const steps = [
      { delay: 500, message: "Validating payment details...", progress: 25 },
      { delay: 1000, message: "Connecting to payment gateway...", progress: 50 },
      { delay: 1500, message: "Processing payment...", progress: 75 },
      { delay: 2000, message: "Confirming transaction...", progress: 100 },
    ];

    let currentStep = 0;

    const processNextStep = () => {
      if (currentStep < steps.length) {
        setTimeout(() => {
          setProgress(steps[currentStep].progress);
          currentStep++;
          processNextStep();
        }, steps[currentStep].delay);
      } else {
        // Payment successful
        setTimeout(() => {
          setStatus("success");
          // Navigate to order confirmation after showing success
          setTimeout(() => {
            router.replace({
              pathname: "/order-confirmation",
              params: { orderId },
            });
          }, 1000);
        }, 500);
      }
    };

    processNextStep();
  }, [orderId]);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 items-center justify-center p-4">
        {status === "processing" && (
          <>
            <View className="bg-primary/10 rounded-full p-8 mb-6">
              <CreditCard size={64} color="#000" />
            </View>
            
            <Text className="text-2xl font-bold text-foreground mb-2">
              Processing Payment
            </Text>
            
            <Text className="text-lg text-muted-foreground mb-8">
              ${amount}
            </Text>

            <ActivityIndicator size="large" color="#000" className="mb-6" />

            {/* Progress Bar */}
            <View className="w-full max-w-xs mb-4">
              <View className="h-2 bg-secondary rounded-full overflow-hidden">
                <View 
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </View>
            </View>

            <Text className="text-sm text-muted-foreground text-center">
              Please wait while we process your payment
            </Text>

            <Card className="mt-8 w-full max-w-xs">
              <CardContent className="pt-4">
                <Text className="text-xs text-muted-foreground text-center">
                  🔒 Your payment is secure and encrypted
                </Text>
              </CardContent>
            </Card>
          </>
        )}

        {status === "success" && (
          <>
            <View className="bg-green-100 rounded-full p-8 mb-6">
              <CheckCircle size={64} color="#22c55e" />
            </View>
            
            <Text className="text-2xl font-bold text-foreground mb-2">
              Payment Successful!
            </Text>
            
            <Text className="text-sm text-muted-foreground">
              Redirecting to confirmation...
            </Text>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
