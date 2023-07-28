<template>
  <div class="loading spinner-grow" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<style scoped>
.spinner-grow {
  width: 1em;
  height: 1em;
}
</style>
