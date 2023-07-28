import type Error from "./Error";

export default interface Review {
  id: string;
  comment: string;
  created_at: number;
  product_id: string;
  reviewer_id: string;
  updated_at: number;
  star: number;
  _loading: boolean;
  _error: Error;
}
