import { tomoni } from "../http-tomoni";
import Resource from "./Resource";

const orders = new Resource({ service: tomoni, path: "/api/orders" });
const statuses = new Resource({ service: tomoni, path: "/api/order/statuses" });
const items = new Resource({ service: tomoni, path: "/api/order/items" });
const retail = new Resource({ service: tomoni, path: "/api/order/retails" });

export { orders, statuses, items, retail };
