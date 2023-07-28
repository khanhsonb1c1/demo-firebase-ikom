<template>
  <section class="section blog-section blog-list">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="section-title d-flex align-items-baseline justify-content-center">
            <h2 class="d-inline">{{ category_name }}</h2>
            <TheLoading v-if="fetching" class="ms-2" />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-8 col-md-12 col-12">
          <div class="row">
            <TextEmpty :message="$t('Blog not found')" v-if="!list.length" />
            <BlogCard v-for="(item, index) in list" :key="index" :item="item" />
          </div>
          <ThePagination :paginate="paginate" @change-page="changePage" />
        </div>
        <CategoriesBlog @update:category_name="category_name = $event" />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CategoriesBlog from "./CategoriesBlog.vue";
import { usePostStore } from "@/stores/posts";
import ThePagination from "@/components/ThePagination.vue";
import { mapState } from "pinia";
import BlogCard from "./BlogCard.vue";
import TheLoading from "@/components/TheLoading.vue";
import TextEmpty from "@/components/TextEmpty.vue";

export default defineComponent({
  components: { CategoriesBlog, ThePagination, BlogCard, TheLoading, TextEmpty },

  data() {
    return {
      page: this.$route.query?.page || 1,
      category_name: this.$t("Blog"),
    };
  },

  computed: {
    ...mapState(usePostStore, ["paginate", "list", "fetching"]),

    category_id() {
      return this.$route.query?.category_id;
    },
  },

  watch: {
    page: {
      immediate: true,
      handler() {
        this.fetch();
      },
    },

    category_id() {
      this.fetch();
    },
  },

  methods: {
    changePage(page: number) {
      this.$router.push({
        query: {
          page: page,
        },
      });
      this.page = page;
    },
    fetch() {
      usePostStore().fetch({
        page: this.page,
        "filter[categories]": this.category_id,
      });
    },
  },
});
</script>
