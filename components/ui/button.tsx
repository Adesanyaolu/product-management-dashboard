import { cn } from "@/lib/utils";
import * as React from "react";
import { Pressable, Text } from "react-native";

interface ButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: "default" | "secondary" | "destructive" | "ghost" | "outline";
  size?: "default" | "sm" | "lg";
  className?: string;
  disabled?: boolean;
}

export function Button({
  children,
  onPress,
  variant = "default",
  size = "default",
  className,
  disabled = false,
}: ButtonProps) {
  const variantStyles = {
    default: "bg-primary active:opacity-80",
    secondary: "bg-secondary active:opacity-80",
    destructive: "bg-destructive active:opacity-80",
    ghost: "bg-transparent active:opacity-50",
    outline: "bg-transparent border border-input active:opacity-50",
  };

  const sizeStyles = {
    default: "h-10 px-4 py-2",
    sm: "h-9 px-3",
    lg: "h-11 px-8",
  };

  const textVariantStyles = {
    default: "text-primary-foreground font-semibold",
    secondary: "text-secondary-foreground font-semibold",
    destructive: "text-destructive-foreground font-semibold",
    ghost: "text-foreground font-semibold",
    outline: "text-foreground font-semibold",
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={cn(
        "flex-row items-center justify-center rounded-md",
        variantStyles[variant],
        sizeStyles[size],
        disabled && "opacity-50",
        className
      )}
    >
      <Text
        className={cn(
          "text-sm font-medium",
          textVariantStyles[variant]
        )}
      >
        {children}
      </Text>
    </Pressable>
  );
}
