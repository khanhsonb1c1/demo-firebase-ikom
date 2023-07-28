<template>
  <button
    type="button"
    class="btn btn-outline-primary btn-rounded rounded-pill ms-2 me-1 bg-tag mt-2"
    data-mdb-ripple-color="dark"
    v-show="value"
    @click="remove"
  >
    <div class="d-flex align-items-center">
      <span class="line-clamp-1">{{ value }}</span>
      <i class="lni lni-close ms-3 hover-red fs-6"></i>
    </div>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    value: {
      type: String,
      default: "",
      required: true,
    },
  },

  methods: {
    remove() {
      this.$emit("remove");
    },
  },
});
</script>

<style scoped>
.hover-red:hover {
  color: red !important;
}

button:hover {
  color: #1a94ff;
}

.bg-tag {
  background: #deebf7;
}
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
