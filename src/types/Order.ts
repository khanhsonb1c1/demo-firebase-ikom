import type OrderItem from "./OrderItem";
import type OwningBox from "./OwningBox";
import type ShipmentInfo from "./ShipmentInfo";
import type Tracking from "./Tracking";

export default interface Order {
  id: string;
  contract_id: string | null;
  note: string | null;
  type_id: string;
  status_id: string;
  shipment_method_id: string | null;
  customer_id: string;
  repackage: boolean;
  merge_package: boolean;
  insurance_declaration: number;
  special_declaration: number;
  additional_cost: number;
  created_at: number;
  updated_at: number;
  purchase_cost: number;
  purchase_cost_paid: number;
  purchase_cost_unsolved: number;
  box_service_fee: number;
  insurance_fee: number;
  special_goods_fee: number;
  service_fee: number;
  service_fee_paid: number;
  service_fee_unsolved: number;
  compensation: number;
  compensated: number;
  compensation_unsolved: number;
  purchased: boolean;
  purchase_cost_debited: number;
  purchase_cost_outstanding: number;
  service_fee_debited: number;
  service_fee_outstanding: number;
  purchase_cost_currency_id: string;
  service_fee_currency_id: string;
  transport_organization_id: string;
  sales_organization_id: string;
  cod_cost: number;
  cost_of_goods: number;
  is_pay_freight_charge_in_lading_bill: boolean;
  freight_rate: number;
  is_allow_custom_freight_rate: boolean;
  service_fee_discount: number;
  payment_due_date: number | null;
  is_automatic_lading_bill: boolean;
  available_for_lading_bill_pay_freight_charge_order: boolean;
  steps_forward: Array<string>;
  steps_back: Array<string>;
  type: {
    id: string;
    name: string;
  };
  status: {
    id: string;
    name: string;
  };
  customer: {
    id: string;
    name: string;
    email: string;
  } | null;
  first_item: OrderItem | null;
  items_count: number;
  related_trackings: Array<Tracking>;
  shipment_method: {
    id: string;
    name: string;
  } | null;
  shipment_info: ShipmentInfo | null;
  payment_rate: number;
  total_payment: number;
  owning_boxes: Array<OwningBox>;
  estimated_freight_charge: number;
}
