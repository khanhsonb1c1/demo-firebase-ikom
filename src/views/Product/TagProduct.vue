<template>
  <div class="me-2 cursor-pointer">
    <span class="badge bg-primary ps-2 pe-2 fw-light lh-base mt-2">{{ title }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    title: {
      type: String,
      default: "",
      required: true,
    },
  },
});
</script>
