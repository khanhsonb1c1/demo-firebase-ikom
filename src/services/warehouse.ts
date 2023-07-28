import { tomoni } from "../http-tomoni";
import Resource from "./Resource";

const shipment_methods = new Resource({
  service: tomoni,
  path: "/api/shipment-methods",
});

const areas = new Resource({
  service: tomoni,
  path: "/api/areas",
});

export { shipment_methods, areas };
