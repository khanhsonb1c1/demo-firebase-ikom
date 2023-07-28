<template>
  <!-- Start Hero Area -->
  <section class="hero-area">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-12 custom-padding-right">
          <div class="slider-head position-relative">
            <div class="wrapper-loading">
              <TheLoading v-if="fetching" />
            </div>
            <div class="hero-slider">
              <div
                v-for="(item, index) in list"
                :key="index"
                class="single-slider"
                :style="{
                  'background-image': `url(${item.image_url})`,
                }"
              >
                <div class="content">
                  <h2>
                    <span>{{ $t("Hot product") }}</span>
                    {{ item.name || "..." }}
                  </h2>
                  <p>
                    {{ item.ingredients || "..." }}
                  </p>
                  <h3>
                    <span>{{ $t("Now only") }}</span>

                    <text-money :amount="item.price" currency="JPY" />
                  </h3>
                  <div class="button">
                    <router-link :to="`/products/${item.id}`" class="btn">{{ $t("Shop now") }}</router-link>
                  </div>
                </div>
              </div>

              <!-- End Single Slider -->
            </div>
            <!-- End Hero Slider -->
          </div>
        </div>
        <div class="col-lg-4 col-12">
          <div class="row">
            <div class="col-lg-12 col-md-6 col-12 md-custom-padding">
              <!-- Start Small Banner -->
              <div
                class="hero-small-banner position-relative"
                :style="{
                  'background-image': `url(${single.image_url})`,
                }"
              >
                <div class="wrapper-loading">
                  <TheLoading v-if="fetching" />
                </div>
                <div class="content w-75">
                  <h2>
                    <span>{{ $t("New product") }}</span>

                    <router-link :to="`/products/${single.id}`">{{ single.name }}</router-link>
                  </h2>
                  <h3 class="mt-3">
                    <text-money :amount="single.price" currency="JPY" />
                  </h3>
                </div>
              </div>
              <!-- End Small Banner -->
            </div>
            <div class="col-lg-12 col-md-6 col-12">
              <!-- Start Small Banner -->
              <div class="hero-small-banner style2">
                <div class="content">
                  <h2>{{ $t("Weekly sale") }}!</h2>
                  <p>{{ $t("Saving up to 50% off all online store items this week") }}.</p>
                  <div class="button">
                    <router-link to="/products" class="btn">{{ $t("Shop now") }}</router-link>
                  </div>
                </div>
              </div>
              <!-- Start Small Banner -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- End Hero Area -->
</template>

<script lang="ts">
import TextMoney from "@/components/TextMoney.vue";
import type Product from "@/types/Product";
import type ProductTop from "@/types/ProductTop";
import { defineComponent } from "vue";
import TheLoading from "@/components/TheLoading.vue";

export default defineComponent({
  components: { TextMoney, TheLoading },

  props: {
    list_top: {
      type: Object as () => ProductTop,
      required: true,
    },

    fetching: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      list: [
        {
          image_url: "https://via.placeholder.com/800x500",
        },
      ] as Array<Product>,
      single: { image_url: "https://via.placeholder.com/800x500" } as Product,
    };
  },

  mounted() {
    if (Object.keys(this.list_top).length != 0) {
      this.syncData();
    }
  },

  watch: {
    list_top() {
      this.syncData();
    },
  },

  methods: {
    syncData() {
      this.list = this.list_top.slide_hot;
      this.list_top.new_hot.length && (this.single = this.list_top.new_hot[0]);
      const plugin = document.createElement("script");
      plugin.setAttribute("src", "/assets/js/slider.js");
      plugin.async = true;
      document.head.appendChild(plugin);
    },
  },
});
</script>
