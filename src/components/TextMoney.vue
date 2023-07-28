<template>
  <span class="price">
    <span :class="`text-${color}`">{{ amountDisplay }}</span>
  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    amount: {
      type: Number,
      required: false,
      default: 0,
    },
    currency: {
      type: String,
      default: "VND",
    },
    color: {
      type: String,
      required: false,
    },
  },
  computed: {
    amountDisplay() {
      if (!this.amount && this.amount !== 0) {
        return NaN;
      }
      return new Intl.NumberFormat("ja-JP", {
        style: "currency",
        currency: this.currency,
      }).format(this.amount);
    },
  },
});
</script>
