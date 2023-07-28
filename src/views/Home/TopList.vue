<template>
  <section class="home-product-list section">
    <div class="container position-relative">
      <div class="wrapper-loading">
        <TheLoading v-if="fetching" />
      </div>
      <div class="row">
        <div class="col-lg-4 col-md-4 col-12 custom-responsive-margin">
          <h4 class="list-title">{{ $t("Best sallers") }}</h4>
          <div class="single-list" v-for="(item, index) in list_top.best_seller" :key="index">
            <div class="list-image">
              <router-link :to="`/products/${item?.id}`">
                <img class="aspect-ratio" :src="item.image_url || 'https://via.placeholder.com/100x100'" alt="#" />
              </router-link>
            </div>
            <div class="list-info">
              <h3>
                <router-link :to="`/products/${item?.id}`"> {{ item.name || "..." }}</router-link>
              </h3>
              <TextMoney :amount="item.price" currency="JPY" />
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-4 col-12 custom-responsive-margin">
          <h4 class="list-title">{{ $t("New arrivals") }}</h4>
          <div class="single-list" v-for="(item, index) in list_top.new_arrival" :key="index">
            <div class="list-image">
              <router-link :to="`/products/${item?.id}`">
                <img class="aspect-ratio" :src="item.image_url || 'https://via.placeholder.com/100x100'" alt="#" />
              </router-link>
            </div>
            <div class="list-info">
              <h3>
                <router-link :to="`/products/${item?.id}`"> {{ item.name || "..." }}</router-link>
              </h3>
              <TextMoney :amount="item.price" currency="JPY" />
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-4 col-12">
          <h4 class="list-title">{{ $t("Top rated") }}</h4>
          <div class="single-list" v-for="(item, index) in list_top.top_rated" :key="index">
            <div class="list-image">
              <router-link :to="`/products/${item?.id}`">
                <img class="aspect-ratio" :src="item.image_url || 'https://via.placeholder.com/100x100'" alt="#" />
              </router-link>
            </div>
            <div class="list-info">
              <h3>
                <router-link :to="`/products/${item?.id}`"> {{ item.name || "..." }}</router-link>
              </h3>
              <TextMoney :amount="item.price" currency="JPY" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import TextMoney from "@/components/TextMoney.vue";
import type ProductTop from "@/types/ProductTop";
import { defineComponent } from "vue";
import TheLoading from "@/components/TheLoading.vue";

export default defineComponent({
  components: { TextMoney, TheLoading },

  props: {
    list_top: {
      type: Object,
      default: {} as ProductTop,
    },
    fetching: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
