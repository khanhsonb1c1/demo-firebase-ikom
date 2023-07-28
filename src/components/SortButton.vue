<template>
  <div @click="changeSort()" class="cursor-pointer">
    <i :class="[is_sort ? 'fw-bold text-primary' : '', sort_up ? 'lni lni-arrow-up' : 'lni lni-arrow-down']"></i>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    sort_by: {
      type: String,
      required: true,
    },
    sort_value: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      sort: "",
      sort_up: true,
      is_sort: false,
    };
  },

  created() {
    this.sort = JSON.parse(JSON.stringify(this.sort_by));
  },

  watch: {
    sort_value() {
      if (!this.sort_value) {
        this.sort = "";
        return;
      }
      //check condition for arrow up or down
      if (this.sort_value == `-${this.sort_by}`) {
        this.is_sort = true;
        this.sort_up = false;
      } else if (this.sort_value == this.sort_by) {
        this.is_sort = true;
        this.sort_up = true;
      } else {
        this.is_sort = false;
        this.sort_up = true;
      }
    },
  },

  methods: {
    changeSort() {
      this.sort == this.sort_by ? (this.sort = `-${this.sort_by}`) : (this.sort = this.sort_by);
      this.$emit("update:sort", this.sort);
    },
  },
});
</script>
