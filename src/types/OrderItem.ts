import type Product from "./Product";

export default interface OrderItem {
  id: number;
  order_id: string;
  product_id: string;
  price: number;
  quantity: number;
  note: string | null;
  supplier_id: number;
  tax_percent: number;
  discount_tax_per_tax_percent: number;
  price_with_tax: number;
  balance: number;
  amount: number;
  tax: number;
  discount_tax: number;
  distributed_quantity: number;
  remaining_distributed_quantity: number;
  expected_delivery: null;
  product: Product | null;
  currency_id: string;
}
