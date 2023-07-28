<template>
  <div :class="custom">
    <div class="single-product">
      <div class="product-image aspect-ratio position-relative">
        <div class="wrapper-loading">
          <TheLoading v-if="fetching" />
        </div>
        <img :src="item?.image_url || 'https://via.placeholder.com/335x335'" />
        <span class="sale-tag" v-show="item?.discount != 0">-{{ item?.discount }}%</span>
        <div class="button" v-if="show_added">
          <a class="btn" style="width: 200px"><i class="lni lni-checkmark"></i> {{ $t("Added") }}</a>
        </div>
        <div class="button" @click="addProductToCart" v-else>
          <a class="btn" style="width: 200px"><i class="lni lni-cart"></i> {{ $t("Add to cart") }}</a>
        </div>
      </div>
      <div class="product-info">
        <span class="category">{{ item?.categories[0]?.name || "..." }}</span>
        <h4 class="title mb-2">
          <RouterLink class="text-truncate-2 pt-1" :to="`/products/${item?.id}`">{{ item?.name || "..." }}</RouterLink>
        </h4>
        <div class="d-flex">
          <TheStar :star="item?.star" class="" />
          <div class="ms-1">
            <span>( {{ item?.reviews_count || item?.reviewCount || 0 }} {{ $t("Review") }} )</span>
          </div>
        </div>
        <div class="d-flex justify-content-between align-items-baseline">
          <div class="price">
            <TextMoney :amount="item?.price" currency="JPY" />
            <TextMoneyInital :amount="item?.initial_price" currency="JPY" v-show="item?.discount != 0" />
          </div>
          <i
            :class="[is_in_wish_list ? 'text-danger' : '', 'lni lni-heart cursor-pointer fw-bold']"
            @click="handleWishlist"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import TextMoney from "@/components/TextMoney.vue";
import TextMoneyInital from "@/components/TextMoneyInital.vue";
import type Product from "@/types/Product";
import { defineComponent } from "vue";
import TheLoading from "@/components/TheLoading.vue";
import TheStar from "@/components/TheStar.vue";
import { useCartStore } from "@/stores/cart";
import { useWishlistStore } from "@/stores/wishlist";

export default defineComponent({
  components: { TextMoney, TextMoneyInital, TheLoading, TheStar },

  props: {
    item: {
      type: Object as () => Product,
      required: false,
      default: {} as Product,
    },
    custom: {
      type: String,
      default: "col-lg-4 col-md-6 col-12",
      required: false,
    },
    fetching: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      show_added: false,
    };
  },

  computed: {
    is_in_wish_list() {
      return useWishlistStore().product_ids.includes(this.item.id);
    },
  },

  methods: {
    addProductToCart() {
      useCartStore().increase(this.item.id, 1);
      this.show_added = true;
      setTimeout(() => {
        this.show_added = false;
      }, 2000);
    },

    handleWishlist() {
      if (this.is_in_wish_list) {
        useWishlistStore().removeWishlistItem(this.item.id);
      } else {
        useWishlistStore().addProductToWishlist(this.item.id);
      }
    },
  },
});
</script>

<style scoped>
.single-product .product-info .price > span {
  margin-top: unset;
}
.product-image img {
  height: 100%;
  object-fit: cover;
}
.title {
  height: 1.5em;
}
</style>
