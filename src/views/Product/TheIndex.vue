<template>
  <section class="product-grids section">
    <div class="container">
      <div class="row">
        <div class="col-lg-3 col-12">
          <AsideBar :button="IconFilter">
            <ProductFilter />
          </AsideBar>
        </div>
        <div class="col-lg-9 col-12">
          <div class="product-grids-head">
            <TagFilter :pagination="pagination" />
            <div>
              <div>
                <div class="row">
                  <ProductCard v-for="(item, index) in product_list" :key="index" :item="item" />
                </div>
                <ThePagination :paginate="pagination" @change-page="changePage" />
              </div>
            </div>
          </div>
        </div>
        <!-- <AsideBar :button="IconFilter">
          <ProductFilter/>
        </AsideBar> -->
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useProductStore } from "@/stores/products";
import { mapState } from "pinia";
import ThePagination from "@/components/ThePagination.vue";
import TagFilter from "./TagFilter.vue";
import ProductCard from "./ProductCard.vue";
import AsideBar from "@/components/AsideBar.vue";
import ProductFilter from "./ProductFilter.vue";
import IconFilter from "@/components/IconFilter.vue";

export default defineComponent({
  components: {
    ThePagination,
    TagFilter,
    ProductCard,
    AsideBar,
    ProductFilter,
  },

  data() {
    return {
      IconFilter: IconFilter,
      filter_default: {
        include: "suppliers,origin,categories,reviewsCount",
      },

      filter: {
        category: "",
        origin: "",
        search_name: "",
        sort: "-updated_at",
        price: "",
        page: 1,
      } as any,
    };
  },

  computed: {
    ...mapState(useProductStore, {
      product_list: "list",
      pagination: "pagination",
    }),

    params() {
      if (this.filter.price) {
        return {
          ...this.filter_default,
          page: this.filter.page,
          sort: this.filter.sort,
          filter: {
            categories: this.filter.category,
            origin_id: this.filter.origin,
            name: this.filter.search_name,
          },
          "filter_between[price]": this.filter.price,
        };
      } else {
        return {
          ...this.filter_default,
          page: this.filter.page,
          sort: this.filter.sort,
          filter: {
            categories: this.filter.category,
            origin_id: this.filter.origin,
            name: this.filter.search_name,
          },
        };
      }
    },

    filter_query() {
      return this.$route.query;
    },
  },

  created() {
    this.syncWithUrl();
  },

  watch: {
    params() {
      this.fetchProducts();
    },

    filter_query: {
      deep: false,
      handler(newValue, oldValue) {
        if (newValue && JSON.stringify(oldValue) === JSON.stringify(newValue)) {
          return;
        } else {
          this.syncWithUrl();
        }
      },
    },
  },

  methods: {
    fetchProducts() {
      useProductStore().fetch(this.params);
    },

    changePage(page: number) {
      this.$router.replace({
        query: {
          ...this.filter_query,
          page: page,
        },
      });
    },

    syncWithUrl() {
      if (this.filter_query) {
        this.filter = JSON.parse(JSON.stringify(this.filter_query));
      }
    },
  },
});
</script>
