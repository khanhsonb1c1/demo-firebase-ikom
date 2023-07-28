<script setup lang="ts">
import { RouterView } from "vue-router";
import TheHeader from "@/views/Home/TheHeader.vue";
import TheFooter from "@/views/Home/TheFooter.vue";
</script>

<template>
  <TheHeader />
  <router-view />
  <TheFooter />
</template>

<script lang="ts">
import { useAuthStore } from "@/stores/auth";
import { useCategoryStore } from "./stores/categories";
import { useOriginStore } from "./stores/origins";
import { useCartStore } from "./stores/cart";
import { useCurrencyStore } from "./stores/currencies";
import { useWishlistStore } from "./stores/wishlist";

export default {
  beforeCreate() {
    useAuthStore()
      .authenticate()
      .catch(() => {
        // no auth
      });
    useCategoryStore().fetch();
    useOriginStore().fetch();
    useCurrencyStore().fetch();
    useCartStore().fetchCartItems();
    useWishlistStore().fetchWishlist();
  },
};
</script>

<style lang="scss">
@import "../public/assets/scss/main.scss";
</style>
