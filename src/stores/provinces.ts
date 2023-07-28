import { provinces } from "@/services/helper";
import { defineStore } from "pinia";

export const useProvinceStore = defineStore({
  id: "province",
  state: () => ({
    list: [],
    fetching: false,
  }),
  actions: {
    fetch() {
      return new Promise((resolve, reject) => {
        this.fetching = true;
        provinces
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
    fetchFirstTime() {
      if (!this.list.length && !this.fetching) {
        return this.fetch();
      }
      return new Promise((resolve) => {
        resolve(this.list);
      });
    },
  },
});
