import { z } from "zod";

export const checkoutSchema = z.object({
  // Contact Information
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[0-9+\-\s()]+$/, "Please enter a valid phone number"),

  // Shipping Address
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  addressLine1: z.string().min(5, "Address must be at least 5 characters"),
  addressLine2: z.string().optional(),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  zipCode: z
    .string()
    .min(5, "ZIP code must be at least 5 characters")
    .regex(/^[0-9]{5}(-[0-9]{4})?$/, "Please enter a valid ZIP code"),
  country: z.string().min(2, "Country must be at least 2 characters"),

  // Payment Method (mock)
  paymentMethod: z.enum(["credit_card", "debit_card", "paypal"]),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
