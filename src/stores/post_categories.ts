import { post_categories } from "@/services/helper";
import type Pagination from "@/types/Pagination";
import type PostCategory from "@/types/PostCategory";
import { defineStore } from "pinia";

export const usePostcategory = defineStore({
  id: "post_category",
  state: () => ({
    list: [] as Array<PostCategory>,
    fetching: false,
    paginate: {} as Pagination,
  }),
  actions: {
    fetch(params?: object) {
      return new Promise((resolve, reject) => {
        this.fetching = true;
        post_categories
          .all(params)
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
