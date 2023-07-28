<template>
  <ul v-if="error" class="mt-1">
    <li v-for="(message, index) in messages" :key="index" class="small text-danger">
      {{ message }}
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    error: {
      type: Object,
    },
    input: {
      type: String,
      required: true,
    },
  },
  computed: {
    messages() {
      return this.error?.errors?.[this.input];
    },
  },
});
</script>
