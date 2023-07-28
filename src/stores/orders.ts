import { orders } from "@/services/order";
import { defineStore } from "pinia";
import type Order from "@/types/Order";
import type Pagination from "@/types/Pagination";

export const useOrderStore = defineStore({
  id: "order",
  state: () => ({
    list: [] as Array<Order>,
    fetching: false,
    paginate: {} as Pagination,
    detail: {} as Order,
  }),
  actions: {
    fetch(params?: object) {
      return new Promise((resolve, reject) => {
        this.fetching = true;
        orders
          .all({ ...params, "filter[own]": 1 })
          .then(({ data }) => {
            this.fetching = false;
            this.list = data.data;
            this.paginate = data;
            resolve(data.data);
          })
          .catch((error) => {
            this.fetching = false;
            // error
            reject(error);
          });
      });
    },
    get(id: string) {
      return new Promise((resolve, reject) => {
        this.fetching = true;
        orders
          .get(id, {
            include: "status,shipmentInfo,shipmentMethod",
            append: "owning_boxes",
          })
          .then((res) => {
            this.detail = res.data;
            this.fetching = false;
            resolve(res.data);
          })
          .catch((err) => {
            this.fetching = false;
            reject(err);
          });
      });
    },
  },
});
