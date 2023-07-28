<template>
  <div class="main-menu-search">
    <div class="navbar-search search-style-5">
      <div class="search-select">
        <div class="select-position">
          <select>
            <option selected>{{ $t("All") }}</option>
          </select>
        </div>
      </div>
      <div class="search-input">
        <input
          type="text"
          :placeholder="`${$t('Search')}`"
          @input="debounceSearch"
          @keyup.enter="goToProducts"
          @mouseenter="show_dropdown = true"
        />
        <TheLoading v-show="fetching" />
      </div>

      <div class="search-btn">
        <button @click="goToProducts()">
          <i class="lni lni-search-alt"></i>
        </button>
      </div>
      <div
        class="search-dropdown scroll-y scroll-tiny shadow"
        v-show="show_dropdown"
        @mouseleave="show_dropdown = false"
      >
        <ProductSearchItem
          v-for="(product, index) in search_list"
          :key="index"
          :product="product"
          @click="show_dropdown = false"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TheLoading from "@/components/TheLoading.vue";
import type Product from "@/types/Product";
import { products } from "@/services/product";
import ProductSearchItem from "./ProductSearchItem.vue";

export default defineComponent({
  components: {
    TheLoading,
    ProductSearchItem,
  },

  data() {
    return {
      name: "",
      show_dropdown: false,
      search_list: [] as Array<Product>,
      fetching: false,
      debounce: 0 as number,
    };
  },

  computed: {
    filter_query() {
      return this.$route.query;
    },
  },

  methods: {
    debounceSearch(event: any) {
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        this.name = event.target.value;
        if (this.name != "") {
          this.fetchProducts();
        } else if (this.name == "") {
          return;
        }
      }, 500);
    },

    fetchProducts() {
      return new Promise((resolve, reject) => {
        this.fetching = true;
        products
          .all({
            "filter[name]": this.name,
          })
          .then(({ data }) => {
            this.search_list = data.data;
            this.fetching = false;
            resolve(data.data);
          })
          .catch((err) => {
            this.fetching = false;
            reject(err);
          });
      });
    },

    goToProducts() {
      this.show_dropdown = false;
      this.$router.push({
        path: "/products",
        query: {
          search_name: `${this.name}`,
        },
      });
    },
  },
});
</script>
