import { cn } from "@/lib/utils";
import * as React from "react";
import { View } from "react-native";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <View
      className={cn(
        "rounded-lg border border-border bg-card shadow-sm",
        className
      )}
    >
      {children}
    </View>
  );
}

export function CardHeader({ children, className }: CardProps) {
  return <View className={cn("p-4", className)}>{children}</View>;
}

export function CardContent({ children, className }: CardProps) {
  return <View className={cn("p-4 pt-0", className)}>{children}</View>;
}

export function CardFooter({ children, className }: CardProps) {
  return <View className={cn("p-4 pt-0 flex-row items-center", className)}>{children}</View>;
}
