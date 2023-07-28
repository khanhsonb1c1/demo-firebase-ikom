import type Notification from "./Notification";

export default interface OwningBox {
  id: string;
  box_id: string;
  quantity: number;
  notifications: Array<Notification>;
}
