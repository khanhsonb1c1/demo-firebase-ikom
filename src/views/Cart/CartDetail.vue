<template>
  <div class="mb-3 card border-0">
    <h6 class="p-3 border">
      {{ $t("Your cart detail") }}
      <span> ( {{ items_count }}-{{ $t("Product") }} ) </span>
    </h6>
    <section class="checkout-steps-form-content">
      <div class="row mt-3">
        <div class="list-items scroll-y scroll-tiny">
          <CartItem v-for="item in cart_items" :key="item.cart_local_item.product_id" :item="item" />
          <div v-if="!cart_items.length">
            <h5 class="text-center mt-2 text-primary">
              {{ $t("Cart is empty") }}
            </h5>
            <div class="col-12">
              <div class="single-form button">
                <router-link to="/products"
                  ><button class="btn">
                    <i class="lni lni-cart"></i>
                    {{ $t("Buy now") }}
                  </button></router-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { useCartStore } from "@/stores/cart";
import { defineComponent } from "vue";
import CartItem from "./CartItem.vue";

export default defineComponent({
  components: { CartItem },

  data() {
    return {
      page: 1,
    };
  },

  computed: {
    cart_items() {
      return useCartStore().cart_items;
    },
    items_count() {
      return useCartStore().items_count;
    },
  },

  methods: {
    changePage(page: number) {
      this.page = page;
    },
  },
});
</script>
