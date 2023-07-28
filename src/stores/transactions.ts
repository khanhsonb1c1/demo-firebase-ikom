import { transactions } from "@/services/accounting";
import type Pagination from "@/types/Pagination";
import type Transaction from "@/types/Transaction";
import { defineStore } from "pinia";

export const useTransactionStore = defineStore({
  id: "transaction",
  state: () => ({
    list: [] as Array<Transaction>,
    fetching: false,
    paginate: {} as Pagination,
  }),

  actions: {
    fetch(params?: object) {
      return new Promise((resolve, reject) => {
        this.fetching = true;
        transactions
          .all({
            ...params,
            include: "transactionType",
            append: "references",
            "filter[own]": 1,
          })
          .then(({ data }) => {
            this.fetching = false;
            this.list = data.data;
            this.paginate = data;
            resolve(data.data);
          })
          .catch((error) => {
            this.fetching = false;
            reject(error);
          });
      });
    },
  },
});
