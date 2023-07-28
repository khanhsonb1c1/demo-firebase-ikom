<template>
  <div class="pagination left">
    <ul class="pagination-list">
      <li v-if="paginate.current_page > 1">
        <a href="#" @click="changePage(paginate.current_page - 1)"><i class="lni lni-chevron-left"></i></a>
      </li>
      <li v-if="paginate.current_page - num_previous > 0">
        <a href="#" @click="changePage(1)">1 </a>
      </li>
      <li
        v-for="index in last"
        v-show="getPage(index) > 0 && getPage(index) <= paginate.last_page"
        :key="index"
        :class="getPage(index) == paginate.current_page ? 'active' : ''"
      >
        <a href="#" @click="changePage(getPage(index))">{{ getPage(index) }}</a>
      </li>
      <li v-if="paginate.current_page < paginate.last_page">
        <a href="#" @click="changePage(paginate.current_page + 1)"><i class="lni lni-chevron-right"></i></a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    paginate: {
      type: Object,
      required: true,
    },
    max: {
      type: Number,
      default: 5,
    },
    num_previous: {
      type: Number,
      default: 2,
    },
  },
  computed: {
    last() {
      return this.paginate.last_page > this.max ? this.max : this.paginate.last_page;
    },
  },
  methods: {
    getPage(index: number) {
      return index + this.paginate.current_page - this.num_previous;
    },
    changePage(page: number) {
      this.$emit("change-page", page);
    },
  },
});
</script>
