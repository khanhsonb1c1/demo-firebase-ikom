<template>
  <aside class="col-lg-4 col-md-12 col-12">
    <div class="sidebar blog-grid-page">
      <div class="widget categories-widget">
        <div class="d-flex align-items-baseline">
          <h5 class="widget-title">{{ $t("Category") }}</h5>
          <TheLoading class="ms-3" v-if="fetching_post_categories" />
        </div>
        <ul class="custom">
          <li @click="handleChooseCategory({ id: undefined, name: `${$t('Blog')}` })">
            <a href="#" :class="{ active: !category_id }">{{ $t("All") }}</a>
          </li>
          <li
            v-for="(item, index) in post_categories"
            :key="index"
            @click="handleChooseCategory({ id: item.id, name: item.name })"
          >
            <a href="#" :class="{ active: category_id == item.id }">{{ item.name }}</a>
          </li>
        </ul>
      </div>
      <div class="widget popular-feeds">
        <div class="d-flex align-items-baseline">
          <h5 class="widget-title">{{ $t("Featured posts") }}</h5>
          <TheLoading class="ms-3" v-if="fetching_new_posts" />
        </div>
        <div class="popular-feed-loop">
          <div class="single-popular-feed" v-for="new_post in new_posts" :key="new_post.id">
            <div class="feed-desc">
              <router-link :to="`/blogs/${new_post.id}`" class="feed-img">
                <img :src="new_post.cover_url || 'https://via.placeholder.com/200x200'" alt="#" />
              </router-link>
              <h6 class="post-title">
                <router-link :to="`/blogs/${new_post.id}`" class="text-truncate-2">
                  {{ new_post.title }}
                </router-link>
              </h6>
              <span class="time"
                ><i class="lni lni-calendar"></i>
                <TextDateTime :timestamp="new_post.updated_at" :dateOnly="true" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script lang="ts">
import { useNewPostStore } from "@/stores/new_posts";
import { usePostcategory } from "@/stores/post_categories";
import { mapState } from "pinia";
import { defineComponent } from "vue";
import TextDateTime from "@/components/TextDateTime.vue";
import TheLoading from "@/components/TheLoading.vue";

export default defineComponent({
  components: { TextDateTime, TheLoading },

  data() {
    return {
      category_name: this.$t("Blog"),
    };
  },

  async created() {
    !this.post_categories.length && (await usePostcategory().fetch({ category_id: this.category_id }));
    !this.new_posts.length && useNewPostStore().fetch();

    if (this.category_id) {
      const category = this.post_categories.find((item) => {
        return item.id == this.category_id;
      });
      category && (this.category_name = category.name);
      this.$emit("update:category_name", this.category_name);
    }
  },

  computed: {
    ...mapState(usePostcategory, {
      fetching_post_categories: "fetching",
      post_categories: "list",
    }),
    ...mapState(useNewPostStore, {
      new_posts: "list",
      fetching_new_posts: "fetching",
    }),
    category_id() {
      return this.$route.query.category_id || undefined;
    },
  },

  watch: {
    category_id: {
      handler(newValue) {
        newValue
          ? this.$emit("update:category_name", this.category_name)
          : this.$emit("update:category_name", this.$t("Blog"));
      },
    },
  },

  methods: {
    handleChooseCategory(value: { id: string | undefined; name: string }) {
      this.category_name = value.name;

      this.$router.push({
        query: {
          category_id: value.id,
        },
      });
    },
  },
});
</script>
