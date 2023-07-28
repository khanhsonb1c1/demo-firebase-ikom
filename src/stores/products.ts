import { products, fetchTopProductsForSale } from "@/services/product";
import type Product from "@/types/Product";
import { defineStore } from "pinia";
import type Pagination from "@/types/Pagination";
import type ProductTop from "@/types/ProductTop";

export const useProductStore = defineStore({
  id: "product",
  state: () => ({
    list: [] as Array<Product>,
    detail: {} as Product,
    fetching: false,
    pagination: {} as Pagination,
    list_top: {} as ProductTop,
  }),
  getters: {},
  actions: {
    fetch(params?: object) {
      return new Promise((resolve, reject) => {
        this.fetching = true;
        products
          .all({ ...params, "filter[suppliers.id]": import.meta.env.VITE_APP_SUPPLIER_ID })
          .then(({ data }) => {
            this.list = data.data;
            this.pagination = data;
            this.fetching = false;
            resolve(data.data);
          })
          .catch((err) => {
            this.fetching = false;
            reject(err);
          });
      });
    },

    get(id: string) {
      return new Promise((resolve, reject) => {
        this.fetching = true;
        products
          .get(id, {
            include: "origin,categories,reviews,reviewsCount,images,tags",
          })
          .then((res) => {
            this.detail = res.data;
            this.fetching = false;
            resolve(res.data);
          })
          .catch((err) => {
            this.fetching = false;
            reject(err);
          });
      });
    },

    fetchTopProductsForSale() {
      return new Promise((resolve, reject) => {
        this.fetching = true;
        fetchTopProductsForSale()
          .then(({ data }) => {
            this.list_top = data;
            this.fetching = false;
            resolve(data.data);
          })
          .catch((err) => {
            this.fetching = false;
            reject(err);
          });
      });
    },
  },
});
