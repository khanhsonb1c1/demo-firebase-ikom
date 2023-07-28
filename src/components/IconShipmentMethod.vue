<template>
  <span class="text-primary">
    <i v-if="id == 'sea'" class="lni lni-ship" title="Shipping Sea"></i>
    <i v-if="id == 'air'" class="lni lni-plane" title="Shipping Air"></i>
  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
  },
});
</script>
