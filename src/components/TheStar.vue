<template>
  <ul class="d-flex star">
    <li v-for="n in round_star" :key="n">
      <i class="lni lni-star-filled"></i>
    </li>
    <li v-for="n in max - round_star" :key="n">
      <i class="lni lni-star"></i>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    star: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 5,
    },
  },
  computed: {
    round_star() {
      return Math.round(this.star);
    },
  },
});
</script>
