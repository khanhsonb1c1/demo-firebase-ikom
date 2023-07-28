<template>
  <div v-if="message" :class="`alert alert-${color} mt-3`" role="alert">
    {{ message }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    message: {
      type: String,
    },
    color: {
      type: String,
      validator: function (value: string) {
        return ["danger"].includes(value);
      },
    },
  },
});
</script>
