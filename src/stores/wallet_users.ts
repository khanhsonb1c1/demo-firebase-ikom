import { wallet_users } from "@/services/accounting";
import type WalletUser from "@/types/WalletUser";
import { defineStore } from "pinia";

export const useWalletUserStore = defineStore({
  id: "wallet_user",
  state: () => ({
    list: [] as Array<WalletUser>,
    detail: {} as WalletUser,
    fetching: false,
  }),
  actions: {
    fetch() {
      return new Promise((resolve, reject) => {
        this.fetching = true;
        wallet_users
          .all({ "filter[own]": 1 })
          .then(({ data }) => {
            this.fetching = false;
            this.list = data.data;
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
        wallet_users
          .get(id, {
            "filter[own]": 1,
          })
          .then(({ data }) => {
            this.fetching = false;
            this.detail = data;
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
