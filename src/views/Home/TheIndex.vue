<template>
  <TheSlider :list_top="list_top" :fetching="fetching" />

  <section class="featured-categories section">
    <div class="container">
      <TitleTop :title="$t(`${rows.category.title}`)" />
      <div class="row">
        <CategoryItem v-for="(item, index) in featured_categories" :key="index" :item="item" :fetching="fetching" />
      </div>
    </div>
  </section>

  <section class="trending-product section">
    <div class="container">
      <TitleTop :title="$t(`${rows.trending.title}`)" />
      <div class="row">
        <ProductCard
          v-for="(item, index) in list_top.trending"
          :key="index"
          :item="item"
          :fetching="fetching"
          custom="col-lg-3 col-md-6 col-12"
        />
      </div>
    </div>
  </section>

  <HotProducts :products="list_top.hot" :fetching="fetching" v-if="list_top?.hot?.length" />

  <section class="special-offer section" v-if="list_top?.fix_hot?.length">
    <div class="container">
      <TitleTop :title="$t(`${rows.special_offer.title}`)" />
      <SpecialOffer :list_top="list_top" :fetching="fetching" />
    </div>
  </section>

  <TopList :list_top="list_top" :fetching="fetching" />

  <Brands />

  <LatestNews />

  <ShippingService />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TheSlider from "@/views/Home/TheSlider.vue";
import CategoryItem from "./CategoryItem.vue";
import { mapState } from "pinia";
import { useCategoryStore } from "@/stores/categories";
import { useProductStore } from "@/stores/products";
import ProductCard from "@/views/Product/ProductCard.vue";
import TitleTop from "./TitleTop.vue";
import HotProducts from "./HotProducts.vue";
import TopList from "./TopList.vue";
import Brands from "./Brands.vue";
import LatestNews from "./LatestNews.vue";
import ShippingService from "./ShippingService.vue";
import SpecialOffer from "./SpecialOffer.vue";

export default defineComponent({
  components: {
    TheSlider,
    CategoryItem,
    ProductCard,
    TitleTop,
    HotProducts,
    TopList,
    Brands,
    LatestNews,
    ShippingService,
    SpecialOffer,
  },

  data() {
    return {
      include: "origin,categories,reviewsCount",
      rows: {
        category: {
          title: "Category",
        },

        trending: {
          title: "Trending",
        },

        fix_hot: {
          title: "Fix hot",
        },

        special_offer: {
          title: "Special promotion",
        },
        news: {
          title: "Our last news",
        },
      },
    };
  },

  computed: {
    ...mapState(useCategoryStore, { categories: "list" }),
    ...mapState(useProductStore, ["list_top", "fetching"]),

    featured_categories() {
      const x = JSON.parse(JSON.stringify(this.categories));
      return x.slice(0, 6);
    },

    trending() {
      if (this.list_top.trending.length) {
        return JSON.parse(JSON.stringify(useProductStore().list_top.trending)).slice(0, 8);
      } else {
        return 0;
      }
    },
  },

  created() {
    if (Object.keys(this.list_top).length === 0) {
      useProductStore().fetchTopProductsForSale();
    }
  },
});
</script>
