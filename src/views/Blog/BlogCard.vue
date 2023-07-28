<template>
  <div :class="custom">
    <div class="single-blog">
      <div class="blog-img">
        <router-link :to="`/blogs/${item.id}`">
          <img :src="item.cover_url || 'https://via.placeholder.com/370x215'" />
        </router-link>
      </div>
      <div class="blog-content">
        <a class="category text-truncate-1" href="#">{{ categories }}</a>
        <h4>
          <router-link :to="`/blogs/${item.id}`" class="text-truncate-2">{{ item.title || $t("Empty") }}</router-link>
        </h4>
        <p class="text-truncate-3">{{ item.description || $t("Empty") }}</p>
        <div class="button">
          <router-link class="btn" :to="`/blogs/${item.id}`">
            {{ $t("Views more") }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type Post from "@/types/Post";
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    item: {
      type: Object as () => Post,
      default: {} as Post,
    },
    custom: {
      type: String,
      default: "col-lg-6 col-md-6 col-12",
    },
  },
  computed: {
    categories() {
      const names = this.item.categories
        .map((item) => {
          return item.name;
        })
        .toString();
      return names ? names.replace(/,/gi, ", ") : "...";
    },
  },
});
</script>
