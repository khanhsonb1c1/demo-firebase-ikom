<template>
  <div class="row">
    <div class="col-12">
      <div class="section-title">
        <h2>{{ title }}</h2>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
  },
});
</script>
