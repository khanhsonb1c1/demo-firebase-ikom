<template>
  <li>
    <a class="cursor-pointer" @click="handleFilter('category', category.id)"> {{ category.name }}</a>
    <span class="float-end lni lni-chevron-right" v-if="category?.children?.length" @click="is_show = !is_show"> </span>

    <ul :class="[is_show ? 'h-auto' : '', 'slide-category-child']">
      <li class="mt-3 ms-3 mb-2" v-for="(category_child, idx) in category.children" :key="idx">
        <a @click="handleFilter('category', category_child.id)">{{ category_child.name }}</a>
      </li>
    </ul>
  </li>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type Category from "@/types/Category";
export default defineComponent({
  props: {
    category: {
      required: true,
      type: Object as () => Category,
    },
  },

  data() {
    return {
      is_show: false,
    };
  },

  methods: {
    handleFilter(key: string, id: string) {
      this.$emit("handleFilter", key, id);
    },
  },
});
</script>

<style scoped>
span {
  color: #666;
  position: relative;
  font-weight: 400;
  font-size: 14px;
  display: inline-block;
  margin-right: 3px;
  padding: 5px;
  cursor: pointer;
}

.slide-category-child {
  clear: both;
  width: 100%;
  height: 0;
  overflow: hidden;
  transition: height 0.4s ease;
}
</style>
