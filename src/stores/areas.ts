import { areas } from "@/services/warehouse";
import type Area from "@/types/Area";
import { defineStore } from "pinia";

export const useAreaStore = defineStore({
  id: "area",
  state: () => ({
    list: [] as Array<Area>,
    fetching: false,
  }),

  actions: {
    fetch() {
      return new Promise((resolve, reject) => {
        this.fetching = true;
        areas
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
