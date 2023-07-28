import { origins } from "@/services/product";
import type Origin from "@/types/Origin";
import { defineStore } from "pinia";

export const useOriginStore = defineStore({
  id: "origin",
  state: () => ({
    list: [] as Array<Origin>,
    fetching: false,
  }),

  actions: {
    fetch() {
      return new Promise((resolve, reject) => {
        this.fetching = true;
        origins
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
