<template>
  <div class="align-center">
    <i>{{ $t(message) }}</i>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    message: {
      type: String,
      default: "Empty",
    },
  },
});
</script>
