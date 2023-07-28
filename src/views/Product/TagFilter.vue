<template>
  <div class="product-grid-topbar">
    <div class="row align-items-center">
      <div class="col-lg-7 col-md-8 col-12">
        <div class="product-sorting">
          <label for="sorting">{{ $t("Sort by") }}:</label>
          <select class="form-control" v-model="sort" @change="changeSort">
            <option value="price">{{ $t("Price up") }}</option>
            <option value="-price">{{ $t("Price down") }}</option>
            <option value="-updated_at">{{ $t("Update new") }}</option>
            <option value="updated_at">{{ $t("Update old") }}</option>
            <option value="">{{ $t("Discount") }} ({{ $t("Coming soon") }})</option>
            <option value="">{{ $t("Most buy") }} ({{ $t("Coming soon") }})</option>
          </select>
          <TextShowingPagination :paginate="pagination" title="Product" />
        </div>
      </div>
      <div class="col-lg-5 col-md-4 col-12 d-none d-lg-block d-md-block">
        <div class="nav nav-tabs align-items-center">
          <TheLoading v-show="fetching" />
          <i class="lni lni-funnel fs-5 m-2"></i>
        </div>
      </div>
    </div>
    <div class="row mt-2 pb-2">
      <div class="box mt-2">
        <ButtonTags
          :value="filter_query.search_name ? String(filter_query.search_name) : ''"
          @remove="handleRemoveFilterTag('search_name')"
        />
        <ButtonTags :value="category?.name" @remove="handleRemoveFilterTag('category')" />
        <ButtonTags :value="origin?.name" @remove="handleRemoveFilterTag('origin')" />
        <ButtonTags :value="price" @remove="handleRemoveFilterTag('price')" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import TextShowingPagination from "@/components/TextShowingPagination.vue";
import type Pagination from "@/types/Pagination";
import ButtonTags from "./ButtonTags.vue";
import TheLoading from "@/components/TheLoading.vue";
import { defineComponent } from "vue";
import { useProductStore } from "@/stores/products";
import { useOriginStore } from "@/stores/origins";
import { useCategoryStore } from "@/stores/categories";
import type Category from "@/types/Category";

export default defineComponent({
  components: { TextShowingPagination, ButtonTags, TheLoading },
  props: {
    pagination: {
      type: Object,
      default: {} as Pagination,
    },
  },

  data() {
    return {
      sort: "-updated_at",
    };
  },

  computed: {
    fetching() {
      return useProductStore().fetching;
    },

    origin_list() {
      return useOriginStore().list;
    },
    category_list() {
      return useCategoryStore().list;
    },

    filter_query() {
      return this.$route.query;
    },

    origin() {
      return this.origin_list.find((obj) => {
        return obj.id == String(this.filter_query.origin);
      });
    },
    category() {
      let list: any = [];

      this.category_list.forEach((item) => {
        list = [...list, item, ...item.children];
      });

      return list.find((obj: Category) => {
        return obj.id == String(this.filter_query.category);
      });
    },

    price() {
      const x = this.filter_query.price;
      if (x) {
        return "￥" + String(x).replace(/,/gi, " - ￥");
      } else {
        return "";
      }
    },
  },

  created() {
    if (this.filter_query.sort) {
      this.sort = String(this.filter_query.sort);
    }
  },

  methods: {
    changeSort() {
      this.$router.push({
        query: {
          ...this.filter_query,
          sort: this.sort,
        },
      });
    },
    handleRemoveFilterTag(key: string) {
      this.$router.push({
        query: {
          ...this.filter_query,
          [key]: undefined,
        },
      });
    },
  },
});
</script>
