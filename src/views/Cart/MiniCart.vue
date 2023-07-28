<template>
  <div class="cart-items #panier">
    <a href="javascript:void(0)" class="main-btn">
      <i class="lni lni-cart fw-bold"></i>
      <span class="total-items">{{ items_count }}</span>
    </a>
    <!-- Shopping Item -->
    <div class="shopping-item">
      <div class="dropdown-cart-header">
        <span>{{ items_count }} {{ $t("Products") }}</span>
      </div>
      <ul class="shopping-list scroll-y scroll-tiny">
        <li v-for="(item, index) in cart_items" :key="index">
          <a
            href="javascript:void(0)"
            class="remove"
            title="Remove this item"
            @click="removeItem(item?.cart_local_item.product_id)"
            ><i class="lni lni-close"></i
          ></a>
          <div class="cart-img-head">
            <a class="cart-img"><img :src="item?.product_info?.image_url" alt="#" /></a>
          </div>
          <div class="content">
            <h4>
              <router-link class="text-truncate-2" :to="`/products/${item?.cart_local_item.product_id}`">
                {{ item?.product_info?.name || item?.cart_local_item.product_id }}</router-link
              >
            </h4>
            <p class="quantity" v-if="item?.product_info?.id">
              {{ item?.cart_local_item.quantity }} x
              <TextMoney :amount="Number(item?.product_info?.price)" currency="JPY" />
            </p>
            <p class="text-danger">
              {{ item?.product_info?.id ? "" : $t("Product not found") }}
            </p>
          </div>
        </li>
        <div class="mb-3 text-center text-primary" v-if="items_count > display_items">
          <router-link to="/cart">
            {{ $t("Views more") }}
          </router-link>
        </div>
      </ul>
      <div class="bottom">
        <div class="total">
          <span>{{ $t("Cost of goods") }}</span>
          <span class="total-amount fs-5 color-orgin">
            <TextMoney :amount="total_price" currency="JPY" />
          </span>
        </div>
        <div class="button">
          <router-link to="/cart" class="btn animate">
            {{ $t("Go to cart") }}
          </router-link>
        </div>
      </div>
    </div>
    <!--/ End Shopping Item -->
  </div>
</template>

<script lang="ts">
import { useCartStore } from "@/stores/cart";
import { defineComponent } from "vue";
import TextMoney from "@/components/TextMoney.vue";

export default defineComponent({
  components: { TextMoney },
  props: {
    display_items: {
      type: Number,
      default: 5,
    },
  },
  computed: {
    cart_items() {
      return useCartStore().cart_items.slice(0, this.display_items);
    },
    total_price() {
      return useCartStore().total_price;
    },
    items_count() {
      return useCartStore().items_count;
    },
  },

  methods: {
    removeItem(id: string) {
      useCartStore().removeCartItem(id);
    },
  },
});
</script>
