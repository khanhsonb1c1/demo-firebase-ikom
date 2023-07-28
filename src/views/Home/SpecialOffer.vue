<template>
  <div class="row">
    <div class="col-lg-8 col-md-12 col-12">
      <div class="row">
        <ProductCard v-for="item in list" :key="item.id" :item="item" custom="col-lg-4 col-md-4 col-12" />
      </div>

      <div
        class="single-banner right mt-3 position-relative"
        :style="{
          'background-image': `url(${product_row.image_url})`,
        }"
        v-if="Object.keys(product_row).length"
      >
        <div class="wrapper-loading">
          <TheLoading v-if="fetching" />
        </div>
        <div class="content">
          <h2>{{ product_row.name }}</h2>
          <p>
            {{ product_row.ingredients }}
          </p>
          <TextMoney :amount="product_row.price" currency="JPY" />
          <div class="button">
            <router-link :to="`/products/${product_row.id}`" class="btn">{{ $t("Shop now") }}</router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Col -->
    <div class="col-lg-4 col-md-12 col-12" v-if="Object.keys(product_col).length">
      <div class="offer-content">
        <div class="image position-relative">
          <img class="aspect-ratio" :src="product_col.image_url || 'https://via.placeholder.com/510x600'" alt="#" />
          <div class="wrapper-loading">
            <TheLoading v-if="fetching" />
          </div>
          <span class="sale-tag" v-if="product_col.discount">-{{ product_col.discount }}%</span>
        </div>
        <div class="text">
          <h2>
            <router-link :to="`/products/${product_col.id}`"> {{ product_col.name }}</router-link>
          </h2>
          <div class="d-flex">
            <TheStar :star="product_col.star" />
            <div class="ms-1">
              <span>( {{ product_col.reviewCount || 0 }} {{ $t("Review") }} )</span>
            </div>
          </div>
          <div class="price">
            <TextMoney :amount="product_col.price" currency="JPY" />
            <TextMoneyInital
              :amount="product_col.initial_price"
              currency="JPY"
              v-if="product_col.price != product_col.initial_price"
            />
          </div>
          <p>
            {{ product_col.ingredients || "Empty" }}
          </p>
        </div>
        <div class="box-head">
          <div class="box">
            <h1 id="days">000</h1>
            <h2 id="daystxt">Days</h2>
          </div>
          <div class="box">
            <h1 id="hours">00</h1>
            <h2 id="hourstxt">Hours</h2>
          </div>
          <div class="box">
            <h1 id="minutes">00</h1>
            <h2 id="minutestxt">Minutes</h2>
          </div>
          <div class="box">
            <h1 id="seconds">00</h1>
            <h2 id="secondstxt">Secondes</h2>
          </div>
        </div>
        <div style="background: rgb(204, 24, 24)" class="alert">
          <h1 style="padding: 30px; color: white; line-height: 1.3">{{ $t("Event ended") }} !</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type ProductTop from "@/types/ProductTop";
import { defineComponent } from "vue";
import ProductCard from "@/views/Product/ProductCard.vue";
import type Product from "@/types/Product";
import TextMoney from "@/components/TextMoney.vue";
import TextMoneyInital from "@/components/TextMoneyInital.vue";
import TheLoading from "@/components/TheLoading.vue";
import TheStar from "@/components/TheStar.vue";

export default defineComponent({
  components: { ProductCard, TextMoneyInital, TextMoney, TheLoading, TheStar },

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

  data() {
    return {
      list: [] as Array<Product>,
      product_col: {} as Product,
      product_row: {} as Product,
      time_now: Date.now(),
      countDown: 0,
    };
  },

  computed: {
    finaleDate() {
      // change time end event here.
      return Date.now() + 86400000;
    },
  },

  mounted() {
    if (Object.keys(this.list_top).length != 0) {
      this.syncData();
    }

    if (Object.keys(this.product_col).length) {
      if (Date.now() <= this.finaleDate) {
        this.countDown = setInterval(() => {
          this.timer();
          if (this.time_now >= this.finaleDate) {
            clearInterval(this.countDown);
            (document.querySelector(".alert") as HTMLElement).style.display = "block";
            (document.querySelector(".container") as HTMLElement).style.display = "none";

            (document.querySelector("#days") as HTMLElement).textContent = "00";
            (document.querySelector("#hours") as HTMLElement).textContent = "00";
            (document.querySelector("#minutes") as HTMLElement).textContent = "00";
            (document.querySelector("#seconds") as HTMLElement).textContent = "00";
          }
        }, 1000);
      } else {
        (document.querySelector(".alert") as HTMLElement).style.display = "block";
      }
    }
  },

  watch: {
    list_top() {
      this.syncData();
    },
  },

  methods: {
    timer() {
      const now = Date.now();
      this.time_now = now;
      const diff = this.finaleDate - now;
      let days = `${Math.floor(diff / (1000 * 60 * 60 * 24))}`;
      let hours = `${Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))}`;
      let minutes = `${Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))}`;
      let seconds = `${Math.floor((diff % (1000 * 60)) / 1000)}`;

      Number(days) <= 9 ? (days = `0${days}`) : days;
      Number(hours) <= 9 ? (hours = `0${hours}`) : hours;
      Number(minutes) <= 9 ? (minutes = `0${minutes}`) : minutes;
      Number(seconds) <= 9 ? (seconds = `0${seconds}`) : seconds;

      (document.querySelector("#days") as HTMLElement).textContent = days;
      (document.querySelector("#hours") as HTMLElement).textContent = hours;
      (document.querySelector("#minutes") as HTMLElement).textContent = minutes;
      (document.querySelector("#seconds") as HTMLElement).textContent = seconds;
    },

    syncData() {
      const products = this.list_top.fix_hot;
      this.list = products.slice(0, 3);

      this.list_top.fix_hot[3] && (this.product_row = this.list_top.fix_hot[3]);

      this.list_top.fix_hot[4] && (this.product_col = this.list_top.fix_hot[4]);
    },
  },

  beforeUnmount() {
    clearInterval(this.countDown);
  },
});
</script>
