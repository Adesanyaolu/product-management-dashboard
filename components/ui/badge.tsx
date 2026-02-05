import { cn } from "@/lib/utils";
import * as React from "react";
import { Text, View } from "react-native";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "secondary" | "destructive" | "outline";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  const variantStyles = {
    default: "bg-primary px-2.5 py-0.5 rounded-full",
    secondary: "bg-secondary px-2.5 py-0.5 rounded-full",
    destructive: "bg-destructive px-2.5 py-0.5 rounded-full",
    outline: "border border-foreground bg-transparent px-2.5 py-0.5 rounded-full",
  };

  const textVariantStyles = {
    default: "text-primary-foreground text-xs font-semibold",
    secondary: "text-secondary-foreground text-xs font-semibold",
    destructive: "text-destructive-foreground text-xs font-semibold",
    outline: "text-foreground text-xs font-semibold",
  };

  return (
    <View
      className={cn(
        "items-center justify-center",
        variantStyles[variant],
        className
      )}
    >
      <Text className={textVariantStyles[variant]}>
        {children}
      </Text>
    </View>
  );
}
