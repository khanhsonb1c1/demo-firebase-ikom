<template>
  <div class="order-product-item">
    <div class="row align-items-center">
      <div class="col-lg-3 col-md-3 col-12">
        <div class="product-image">
          <img :src="data.product?.image_url" />
        </div>
      </div>
      <div class="col-lg-9 col-md-9 col-12">
        <div class="product-info d-flex flex-column p-1">
          <h4 class="title pb-1">
            <router-link :to="`/products/${data.product_id}`" class="text-truncate-2">
              {{ data.product?.name || data.product_id || "..." }}
            </router-link>
          </h4>
          <div class="d-flex text-dark">
            <div>
              {{ $t("Price") }}
              <small class="text-muted">({{ $t("Tax included") }})</small>:
              <TextMoney :amount="data.price_with_tax" :currency="data.currency_id" />
            </div>
            <div class="mx-3">{{ $t("Quantity") }}: {{ data.quantity }}</div>
            <div>
              {{ $t("Total") }}:
              <TextMoney :amount="data.balance" :currency="data.currency_id" />
            </div>
          </div>
          <div>{{ $t("Note") }}: {{ data.note || "..." }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TextMoney from "@/components/TextMoney.vue";
import type OrderItem from "@/types/OrderItem";

export default defineComponent({
  components: {
    TextMoney,
  },
  props: {
    data: {
      type: Object as () => OrderItem,
      required: true,
    },
  },
});
</script>
