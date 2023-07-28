import type Reference from "./Reference";
import type TransactionType from "./TransactionType";

export default interface Transaction {
  id: string;
  type_id: string;
  currency_id: string;
  description: string | null;
  updated_at: number;
  total_transaction_amount: number;
  transactions_amount: number;
  transactions_remaining: number;
  organization_id: number;
  credit_id: string;
  debit_id: string;
  card_id: string | null;
  voucher_date: number;
  code_ref: string;
  amount: number;
  amount_available_for_payment: number;
  transaction_type: TransactionType;
  references: Array<Reference>;
}
