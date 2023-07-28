<template>
  <section class="blog-section section">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="section-title">
            <h2>{{ $t("Latest news") }}</h2>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="text-center">
          <TheLoading v-if="fetching" />
        </div>
        <BlogCard v-for="item in list" :key="item.id" custom="col-lg-4 col-md-6 col-12" :item="item" />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { mapState } from "pinia";
import { defineComponent } from "vue";
import BlogCard from "../Blog/BlogCard.vue";
import TheLoading from "@/components/TheLoading.vue";
import { useNewPostStore } from "@/stores/new_posts";

export default defineComponent({
  components: { BlogCard, TheLoading },
  computed: {
    ...mapState(useNewPostStore, ["list", "fetching"]),
  },

  created() {
    !this.list.length && useNewPostStore().fetch();
  },
});
</script>
