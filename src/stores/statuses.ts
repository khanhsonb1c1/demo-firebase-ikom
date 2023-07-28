import { statuses } from "@/services/order";
import type Status from "@/types/Status";
import { defineStore } from "pinia";

export const useStatusStore = defineStore({
  id: "status",
  state: () => ({
    list: [] as Array<Status>,
    fetching: false,
  }),
  actions: {
    fetch() {
      return new Promise((resolve, reject) => {
        this.fetching = true;
        statuses
          .all()
          .then(({ data }) => {
            this.fetching = false;
            this.list = data;
            resolve(data);
          })
          .catch((error) => {
            this.fetching = false;
            // error
            reject(error);
          });
      });
    },
  },
});
