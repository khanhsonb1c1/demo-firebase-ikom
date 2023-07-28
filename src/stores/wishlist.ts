import { products } from "@/services/product";
import type Product from "@/types/Product";
import type WishItem from "@/types/WishItem";
import { defineStore } from "pinia";

export const useWishlistStore = defineStore({
  id: "wishlist",

  state: () => ({
    wislist_local: [] as Array<WishItem>,
    product_items: [] as Array<Product>,
  }),

  getters: {
    product_ids: (state) => {
      return state.wislist_local.map((wish_list) => wish_list.product_id);
    },

    wishlist(state) {
      return state.wislist_local.map((item) => {
        return state.product_items.find((product: Product) => item.product_id === product.id) as Product;
      });
    },

    items_count(): number {
      return this.wishlist.length;
    },
  },
  actions: {
    fetchWishlist() {
      if (import.meta.env.VITE_APP_LOCALSTORAGE_WISHLIST in localStorage) {
        this.wislist_local = JSON.parse(String(localStorage.getItem(import.meta.env.VITE_APP_LOCALSTORAGE_WISHLIST)));
        if (this.wislist_local.length) {
          this.fetchProductItems();
        }
      }
    },

    fetchProductItems(page = 1) {
      return new Promise((resolve, reject) => {
        products
          .all({
            [`filter[id]`]: String(this.product_ids),
            page,
          })
          .then(({ data }) => {
            this.product_items.push(...data.data);
            if (data.current_page < data.last_page) {
              this.fetchProductItems(data.current_page + 1);
            }
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    fetchProductItem(product_id: string) {
      return new Promise((resolve, reject) => {
        products
          .get(product_id)
          .then(({ data }) => {
            if (!this.product_items.find((product_item) => product_item.id === data.id)) {
              this.product_items.push(data);
            }
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    addProductToWishlist(product_id: string) {
      if (!this.product_ids.includes(product_id)) {
        this.wislist_local.push({
          product_id: product_id,
        });

        localStorage.setItem(import.meta.env.VITE_APP_LOCALSTORAGE_WISHLIST, JSON.stringify(this.wislist_local));
        this.fetchProductItem(product_id);
      }
    },

    removeWishlistItem(product_id: string) {
      const filtered = this.wislist_local.filter((wish_product) => {
        return wish_product.product_id != product_id;
      });

      this.wislist_local = filtered;

      localStorage.setItem(import.meta.env.VITE_APP_LOCALSTORAGE_WISHLIST, JSON.stringify(this.wislist_local));
      this.product_items = this.wishlist.map((item) => {
        return item;
      });
    },
  },
});
