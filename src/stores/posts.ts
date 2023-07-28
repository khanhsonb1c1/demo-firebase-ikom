import { posts } from "@/services/helper";
import type Pagination from "@/types/Pagination";
import type Post from "@/types/Post";
import { defineStore } from "pinia";

export const usePostStore = defineStore({
  id: "post",
  state: () => ({
    list: [] as Array<Post>,
    detail: {} as Post,
    fetching: false,
    paginate: {} as Pagination,
  }),
  actions: {
    fetch(params?: object) {
      return new Promise((resolve, reject) => {
        this.fetching = true;
        posts
          .all({ ...params, include: "categories", "filter[publish]": 1 })
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

    get(id: string) {
      return new Promise((resolve, reject) => {
        this.fetching = true;
        posts
          .get(id, { append: "creator", include: "categories", "filter[publish]": 1 })
          .then(({ data }) => {
            this.fetching = false;
            this.detail = data;
            resolve(data);
          })
          .catch((error) => {
            this.fetching = false;
            reject(error);
          });
      });
    },
  },
});
