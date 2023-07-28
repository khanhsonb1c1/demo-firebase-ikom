<template>
  <input class="form-control" type="text" v-model="filter" @keyup.enter="changeFilter" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    filter_by: {
      type: String,
      required: true,
    },
    filter_value: {
      //this is filter value current in parent component
      type: String || undefined,
      required: false,
    },
  },

  data() {
    return {
      filter: "",
    };
  },

  watch: {
    filter_value() {
      !this.filter_value && (this.filter = "");
    },
  },

  methods: {
    changeFilter() {
      if (!this.filter && !this.filter_value) {
        return;
      } else {
        this.filter ? this.$emit("update:filter", this.filter) : this.$emit("update:filter", undefined);
      }
    },
  },
});
</script>
