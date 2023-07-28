import type Error from "./Error";

export default interface Address {
  id: number;
  user_id: string;
  consignee: string;
  address_detail: string;
  tel: string;
  ward_id: string | number;
  note: string;
  default: boolean;
  created_at: number;
  updated_at: number;
  full_address: string;
  _loading: boolean;
  _error: Error;
}
