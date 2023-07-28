<template>
  <router-link class="product-search-item row p-3" :to="`/products/${product.id}`">
    <div class="col-3 avatar">
      <img :src="product.image_url || 'https://placehold.jp/80x80.png'" class="img-fluid rounded-3" alt="" />
    </div>
    <div class="col-9">
      <h6 class="text-truncate-2">{{ product.name || "..." }}</h6>
      <div>
        <TextMoney :amount="product.price" currency="JPY" />
        <TheStar :star="product.star" class="float-end" />
      </div>
    </div>
  </router-link>
</template>

<script lang="ts">
import type Product from "@/types/Product";
import { defineComponent } from "vue";
import TheStar from "@/components/TheStar.vue";
import TextMoney from "@/components/TextMoney.vue";

export default defineComponent({
  components: {
    TheStar,
    TextMoney,
  },
  props: {
    product: {
      type: Object as () => Product,
      required: true,
    },
  },
});
</script>
