<template>
  <div class="col-lg-4 col-md-6 col-12">
    <div class="single-category">
      <div class="wrapper-loading">
        <TheLoading v-if="fetching" />
      </div>
      <h3 class="heading text-truncate-1">
        <router-link :to="`/products?category=${item.id}`">
          {{ item.name }}
        </router-link>
      </h3>
      <ul style="height: 6rem; overflow-y: hidden">
        <li v-for="child in item.children" :key="child.id">
          <router-link :to="`/products?category=${child.id}`">
            {{ child.name }}
          </router-link>
        </li>

        <li>
          <router-link :to="`/products?category=${item.id}`">
            {{ $t("View all") }}
          </router-link>
        </li>
      </ul>
      <div class="images">
        <img class="aspect-ratio" :src="item.image_url || 'https://via.placeholder.com/180x180'" alt="#" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type Category from "@/types/Category";
import { defineComponent } from "vue";
import TheLoading from "@/components/TheLoading.vue";

export default defineComponent({
  components: { TheLoading },

  props: {
    item: {
      type: Object as () => Category,
      default: {} as Category,
    },

    fetching: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    filter_query() {
      return this.$route.query;
    },
  },

  methods: {
    handleClick(category: string) {
      this.$router.replace({
        path: "/products",
        query: {
          ...this.filter_query,
          category: category,
        },
      });
    },
  },
});
</script>
