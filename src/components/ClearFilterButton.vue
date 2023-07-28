<template>
  <div class="d-flex justify-content-around p-2 fs-6 cursor-pointer" @click="handleClear()">
    <i class="lni lni-reload"></i>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  methods: {
    handleClear() {
      this.$emit("clear");
    },
  },
});
</script>
