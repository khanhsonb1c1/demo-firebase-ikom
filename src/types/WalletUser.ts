import type User from "./User";

export default interface WalletUser {
  id: number;
  walletable_id: string;
  walletable_type: string;
  currency_id: string;
  created_at: number;
  updated_at: number;
  amount_available_for_payment: number;
  balance: number;
  organization_id: string;
  credit_limit: number;
  total_outstanding_credit_order_amount: number;
  total_remaining_credit_order_amount: number;
  credit_order_avaiable_amount: number;
  object: User;
}
