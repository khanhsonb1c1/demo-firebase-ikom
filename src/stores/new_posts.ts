import { posts } from "@/services/helper";
import type Post from "@/types/Post";
import { defineStore } from "pinia";

export const useNewPostStore = defineStore({
  id: "new_post",
  state: () => ({
    list: [] as Array<Post>,
    fetching: false,
  }),
  actions: {
    fetch(params?: object) {
      return new Promise((resolve, reject) => {
        this.fetching = true;
        posts
          .all({ ...params, include: "categories", "filter[publish]": 1, sort: "-updated_at" })
          .then(({ data }) => {
            this.fetching = false;
            this.list = data.data.slice(0, 3);
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
