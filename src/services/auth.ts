import { tomoni } from "../http-tomoni";
import Resource from "./Resource";

const addresses = new Resource({ service: tomoni, path: "/api/addresses" });
const users = new Resource({ service: tomoni, path: "/api/users" });

export { addresses, users };
