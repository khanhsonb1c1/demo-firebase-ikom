import { defineStore } from "pinia";
import type Product from "@/types/Product";
import type CartLocalItem from "@/types/CartLocalItem";
import { products } from "@/services/product";
import type CartItem from "@/types/CartItem";

export const useCartStore = defineStore({
  id: "cart",
  state: () => ({
    cart_local_items: [] as Array<CartLocalItem>,
    product_items: [] as Array<Product>,
  }),
  getters: {
    cart_items(state) {
      return state.cart_local_items.map((item: CartLocalItem) => {
        const productItem = state.product_items.find((product: Product) => item.product_id === product.id) as Product;

        let price_tax_not_included = 0;
        if (productItem) {
          price_tax_not_included = productItem?.price - (productItem?.price * productItem?.tax_percent) / 100;
        }

        return {
          price: price_tax_not_included,
          cart_local_item: { ...item },
          product_info: productItem,
        } as CartItem;
      });
    },

    product_ids: (state) => {
      return state.cart_local_items.map((cart) => cart.product_id);
    },

    total_price(): number {
      const price_handler = (price: number, cart: CartItem) => {
        return cart.product_info?.price ? price + cart.product_info?.price * cart.cart_local_item.quantity : price;
      };
      return this.cart_items.reduce(price_handler, 0);
    },

    items_count(): number {
      return this.cart_items.length;
    },
  },
  actions: {
    fetchProductItems(page = 1) {
      return new Promise((resolve, reject) => {
        products
          .all({
            [`filter[id]`]: String(this.product_ids),
            include: "categories",
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
          .get(product_id, { include: "categories" })
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

    updateQuantityItem(product_id: string, quantity: number) {
      const cart_local_item = this.cart_local_items.find((item: CartLocalItem) => item.product_id === product_id);
      if (cart_local_item) {
        cart_local_item.quantity = quantity;
      } else {
        this.cart_local_items.push({
          product_id: product_id,
          quantity: quantity,
        });
        this.fetchProductItem(product_id);
      }
      localStorage.setItem(import.meta.env.VITE_APP_LOCALSTORAGE_CART, JSON.stringify(this.cart_local_items));
    },

    increase(product_id: string, quantity: number) {
      const cart_local_item = this.cart_local_items.find((item: CartLocalItem) => item.product_id == product_id);
      if (cart_local_item) {
        this.updateQuantityItem(product_id, cart_local_item.quantity + quantity);
      } else {
        this.updateQuantityItem(product_id, quantity);
      }
    },

    fetchCartItems() {
      if (!(import.meta.env.VITE_APP_LOCALSTORAGE_CART in localStorage)) {
        return;
      }
      this.cart_local_items = JSON.parse(String(localStorage.getItem(import.meta.env.VITE_APP_LOCALSTORAGE_CART)));
      if (this.cart_local_items.length) {
        this.fetchProductItems();
      }
    },

    removeCartItem(product_id: string) {
      this.cart_local_items = this.cart_local_items.filter(function (cart: CartLocalItem) {
        return cart.product_id != product_id;
      });
      localStorage.setItem(import.meta.env.VITE_APP_LOCALSTORAGE_CART, JSON.stringify(this.cart_local_items));
      //remove product_items unused
      this.product_items = this.cart_items.map((item) => {
        return item.product_info;
      });
    },

    clearCartItems() {
      this.cart_local_items = [];
      this.product_items = [];
      localStorage.setItem(import.meta.env.VITE_APP_LOCALSTORAGE_CART, JSON.stringify([]));
    },
  },
});
