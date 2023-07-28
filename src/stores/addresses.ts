import { addresses } from "@/services/auth";
import type Address from "@/types/Address";
import { defineStore } from "pinia";

export const useAddressStore = defineStore({
  id: "address",
  state: () => ({
    list: [] as Array<Address>,
    fetching: false,
  }),
  actions: {
    fetch() {
      return new Promise((resolve, reject) => {
        this.fetching = true;
        addresses
          .all({ "filter[own]": 1 })
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
