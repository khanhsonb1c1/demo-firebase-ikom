export default interface Notification {
  id: string;
  content: {
    distributed:
      | {
          area_id: string;
        }
      | undefined;
    pick_in_container:
      | {
          from_area_id: string;
          to_area_id: string;
        }
      | undefined;
    pick_out_container:
      | {
          area_id: string;
        }
      | undefined;
    cancel_distributed: object | undefined;
    shipping: object | undefined;
    received: object | undefined;
    refunded: object | undefined;
    cancelled: object | undefined;
  };
  created_at: number;
  updated_at: number;
  creator_id: string;
  logable_id: string;
  logable_type: string;
  type_id: string;
}
