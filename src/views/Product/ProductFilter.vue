<template>
  <div class="product-sidebar">
    <!-- !Filter by name -->
    <div class="single-widget search">
      <h3>{{ $t("Search product") }}</h3>
      <form @submit.prevent="handleFilter('search_name', name)">
        <input type="text" :placeholder="`${$t('Search')}`" v-model="name" />
        <button type="submit"><i class="lni lni-search-alt"></i></button>
      </form>
    </div>
    <!-- !Filter by category -->
    <div class="single-widget">
      <h3>{{ $t("All categories") }}</h3>
      <ul class="list list-filter-category">
        <CategoryFilterItem
          v-for="(category, index) in category_list"
          :key="index"
          :category="category"
          @handleFilter="handleFilter"
        />
      </ul>
    </div>
    <!-- !Filter by price -->
    <div class="single-widget condition">
      <h3>{{ $t("Filter by price") }}</h3>

      <div class="form-check" v-for="(price, index) in filter_price_list" :key="index">
        <input
          class="form-check-input"
          type="checkbox"
          name="checkboxprice"
          :id="price.id"
          :checked="String(filter_query.price) == price.value"
          @click="handleFilterPrice($event, price.value)"
        />
        <label class="form-check-label" :for="price.id">
          {{ price.name }}
        </label>
      </div>
    </div>
    <!-- !Filter by origin -->
    <div class="single-widget">
      <h3>{{ $t("All origins") }}</h3>
      <ul class="list" :class="{ 'line-clamp-10': !view_more }">
        <li v-for="(origin, index) in origin_list" :key="index" @click="handleFilter('origin', origin.id)">
          <a>{{ origin?.name || "..." }}</a>
        </li>
      </ul>
      <span class="d-block text-center mt-3 plus" v-if="!view_more" @click="view_more = true">{{
        $t("Views more")
      }}</span>
      <span class="d-block text-center mt-3 plus" v-else @click="view_more = false">{{ $t("Hidden") }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { useCategoryStore } from "@/stores/categories";
import { useOriginStore } from "@/stores/origins";
import { useProductStore } from "@/stores/products";
import { mapState } from "pinia";
import { defineComponent } from "vue";
import CategoryFilterItem from "./CategoryFilterItem.vue";

export default defineComponent({
  components: { CategoryFilterItem },
  data() {
    return {
      name: "",
      view_more: false,
      filter_price_list: [
        {
          value: "1,500",
          name: "¥ 1 - ¥ 500",
          id: "filter_price_1",
        },
        {
          value: "500,2500",
          name: "¥ 500 - ¥ 2,500",
          id: "filter_price_2",
        },
        {
          value: "2500,5000",
          name: "¥ 2,500 - ¥ 5,000",
          id: "filter_price_3",
        },
        {
          value: "5000,10000",
          name: "¥ 5,000 - ¥ 10,000",
          id: "filter_price_4",
        },
        {
          value: "10000,50000",
          name: "¥ 10,000 - ¥ 50,000",
          id: "filter_price_5",
        },
        {
          value: "50000,100000",
          name: "¥ 50,000 - ¥ 100,000",
          id: "filter_price_6",
        },
        {
          value: "100000,5000000",
          name: "Trên ¥ 100,000",
          id: "filter_price_7",
        },
      ],
    };
  },

  computed: {
    ...mapState(useProductStore, {
      product_list: "list",
      pagination: "pagination",
      fetching: "fetching",
    }),

    ...mapState(useCategoryStore, { category_list: "list" }),

    ...mapState(useOriginStore, { origin_list: "list" }),

    filter_query() {
      return this.$route.query;
    },
  },

  methods: {
    handleFilter(key: string, value: string) {
      this.$router.push({
        query: {
          ...this.filter_query,
          [key]: value,
          page: undefined,
        },
      });
    },
    handleFilterPrice(checkbox: any, value: string) {
      if (checkbox.target.checked == true) {
        this.$router.push({
          query: {
            ...this.filter_query,
            price: value,
            page: undefined,
          },
        });
      } else {
        this.$router.push({
          query: {
            ...this.filter_query,
            price: undefined,
            page: undefined,
          },
        });
      }
      const checkboxes = document.getElementsByName("checkboxprice");
      checkboxes.forEach((item: any) => {
        if (item !== checkbox.target) {
          item.checked = false;
        }
      });
    },
  },
});
</script>

<style scoped>
.line-clamp-10 {
  display: -webkit-box;
  -webkit-line-clamp: 10;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-unset {
  -webkit-line-clamp: unset;
}

.bg-secondary {
  background: #eeeeee !important;
  color: #666;
  font-weight: 400 !important;
  padding: 0.4rem 0.75rem;
}

.badge {
  border: 1px solid #eeeeee !important;
}

.badge:hover {
  border-color: #1a94ff !important;
  background: #e0edf8d1 !important;
  cursor: pointer;
}

.list li a {
  width: 100%;
}

.plus:hover {
  cursor: pointer;
  color: #1a94ff;
}
</style>
