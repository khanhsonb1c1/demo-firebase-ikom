import { categories } from "@/services/product";
import type Category from "@/types/Category";
import { defineStore } from "pinia";

export const useCategoryStore = defineStore({
  id: "category",
  state: () => ({
    list: [] as Array<Category>,
    fetching: false,
  }),

  actions: {
    fetch() {
      return new Promise((resolve, reject) => {
        this.fetching = true;
        categories
          .all({
            [`filter[root]`]: 1,
            include: "children",
          })
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
