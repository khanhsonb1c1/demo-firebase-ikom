import { currencies } from "@/services/accounting";
import type Currency from "@/types/Currency";
import { defineStore } from "pinia";

export const useCurrencyStore = defineStore({
  id: "currency",
  state: () => ({
    list: [] as Array<Currency>,
    fetching: false,
  }),

  actions: {
    fetch() {
      return new Promise((resolve, reject) => {
        this.fetching = true;
        currencies
          .all()
          .then((res) => {
            this.list = res.data;
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
