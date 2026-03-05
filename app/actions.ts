"use server";

import { supabase } from "@/lib/supabase";

export type SaleFormState = {
  success: boolean;
  error?: string;
};

export async function addSale(_: SaleFormState, formData: FormData): Promise<SaleFormState> {
  const date = formData.get("date") as string;
  const product = formData.get("product") as string;
  const category = formData.get("category") as string;
  const amountRaw = formData.get("amount_sar") as string;
  const status = formData.get("status") as string;
  const customerName = (formData.get("customer_name") as string).trim();
  const paymentMethod = formData.get("payment_method") as string;
  const notes = (formData.get("notes") as string).trim();

  // Validation
  if (!date) return { success: false, error: "Date is required." };
  if (!product.trim()) return { success: false, error: "Product name is required." };
  if (!category) return { success: false, error: "Category is required." };
  if (!amountRaw || isNaN(Number(amountRaw)) || Number(amountRaw) <= 0)
    return { success: false, error: "Amount must be a positive number." };
  if (!status) return { success: false, error: "Status is required." };

  const { error } = await supabase.from("sales").insert({
    date,
    product: product.trim(),
    category,
    amount_sar: Number(amountRaw),
    status,
    customer_name: customerName || null,
    payment_method: paymentMethod || null,
    notes: notes || null,
  });

  if (error) return { success: false, error: "Failed to save. Please try again." };

  return { success: true };
}
