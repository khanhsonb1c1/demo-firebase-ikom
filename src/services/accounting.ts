import { tomoni } from "../http-tomoni";
import Resource from "./Resource";

const wallet_users = new Resource({
  service: tomoni,
  path: "/api/wallet/users",
});

const transactions = new Resource({
  service: tomoni,
  path: "/api/transactions",
});

const currencies = new Resource({
  service: tomoni,
  path: "/api/currencies",
});

export { wallet_users, transactions, currencies };
