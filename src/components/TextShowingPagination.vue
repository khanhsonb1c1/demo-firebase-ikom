<template>
  <h3 class="total-show">
    {{ $t("Showing") }}:
    <span
      >{{ paginate.from || "..." }} - {{ paginate.to || "..." }} / {{ paginate.total || "..." }}
      {{ $t(String(title)) }}</span
    >
  </h3>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    paginate: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
    },
  },
});
</script>
