export default interface ShipmentInfo {
  id_order: string;
  sender_name: string;
  sender_tel: string;
  consignee: string;
  address: string;
  tel: string;
  ward_id: number;
  note: string | null;
  created_at: number;
  updated_at: number;
  full_address: string;
}
