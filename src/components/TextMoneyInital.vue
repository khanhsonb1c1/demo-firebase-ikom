<template>
  <span class="discount-price ms-2">{{ amountDisplay }}</span>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    amount: {
      type: Number,
      required: true,
      default: 0,
    },
    currency: {
      type: String,
    },
  },

  computed: {
    amountDisplay() {
      return new Intl.NumberFormat("ja-JP", {
        style: "currency",
        currency: this.currency,
      }).format(this.amount);
    },
  },
});
</script>
