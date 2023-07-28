<template>
  <section class="banner section">
    <div class="container">
      <div class="row">
        <div class="col-lg-6 col-md-6 col-12" v-for="(item, index) in list" :key="index">
          <div
            class="single-banner custom-responsive-margin position-relative"
            :style="{
              'background-image': `url(${item.image_url})`,
            }"
          >
            <div class="wrapper-loading">
              <TheLoading v-if="fetching" />
            </div>
            <div class="content w-75">
              <h2 class="text-truncate-1">{{ item?.name || "..." }}</h2>
              <p class="text-truncate-3" style="height: 5em">
                {{ item?.ingredients || "Empty" }}
              </p>
              <div class="button">
                <router-link :to="`/products/${item.id}`" class="btn">{{ $t("Shop now") }}</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import type Product from "@/types/Product";
import { defineComponent } from "vue";
import TheLoading from "@/components/TheLoading.vue";

export default defineComponent({
  components: { TheLoading },

  props: {
    products: {
      type: Array<Product>,
      default: [],
    },
    fetching: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    list() {
      return this.products.slice(0, 2);
    },
  },
});
</script>
