<template>
  <section class="section blog-single">
    <div class="container">
      <div class="row">
        <div class="col-lg-10 offset-lg-1 col-md-12 col-12">
          <div class="single-inner">
            <div class="post-details">
              <div class="text-center">
                <TheLoading v-if="fetching" />
              </div>
              <div class="main-content-head">
                <div class="post-thumbnails">
                  <img :src="detail.cover_url || 'https://via.placeholder.com/850x460'" />
                </div>
                <div class="meta-information">
                  <h2 class="post-title">
                    <a href="#">{{ detail.title || $t("Empty") }}</a>
                  </h2>
                  <ul class="meta-info">
                    <li>
                      <a href="#">
                        <i class="lni lni-user"></i>
                        {{ detail.creator?.name || $t("Empty") }}</a
                      >
                    </li>
                    <li>
                      <a href="#"
                        ><i class="lni lni-calendar"></i> <TextDateTime :timestamp="detail.updated_at" :dateOnly="true"
                      /></a>
                    </li>
                    <li>
                      <a href="#"><i class="lni lni-tag"></i> {{ categories }}</a>
                    </li>
                  </ul>
                </div>
                <div class="detail-inner">
                  <p>
                    {{ detail.description || $t("Empty") }}
                  </p>
                  <div v-html="detail.content || $t('Empty')" class="mb-5"></div>
                  <div class="post-bottom-area">
                    <div class="post-tag"></div>
                    <div class="post-social-media">
                      <h5 class="share-title">{{ $t("Share") }} :</h5>
                      <ul>
                        <li>
                          <a href="#">
                            <i class="lni lni-facebook-filled"></i>
                            <span>facebook</span>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i class="lni lni-twitter-original"></i>
                            <span>twitter</span>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i class="lni lni-google"></i>
                            <span>google+</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { usePostStore } from "@/stores/posts";
import { mapState } from "pinia";
import TextDateTime from "@/components/TextDateTime.vue";
import TheLoading from "@/components/TheLoading.vue";
import type PostCategory from "@/types/PostCategory";

export default defineComponent({
  components: { TextDateTime, TheLoading },

  computed: {
    ...mapState(usePostStore, ["fetching", "detail"]),

    categories() {
      const cloneDetail = JSON.parse(JSON.stringify(this.detail));
      const names = cloneDetail.categories?.map((item: PostCategory) => {
        return item.name;
      });
      return names ? names.toString().replace(/,/gi, ", ") : `${this.$t("Empty")}`;
    },
  },

  watch: {
    $route: {
      immediate: true,
      handler(route) {
        if (route.params.id) {
          this.fetch();
        }
      },
    },
  },

  methods: {
    fetch() {
      usePostStore().get(String(this.$route.params.id));
    },
  },
});
</script>
