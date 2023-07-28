<template>
  <div class="order-grids">
    <div class="order-grid-topbar">
      <div class="row align-items-center">
        <div class="order-filter">
          <label for="filter-status">{{ $t("Filter") }}:</label>
          <select class="form-control" id="filter-status" v-model="filter.filter.status_id" @change="fetchOrders()">
            <option value="">{{ $t("All") }}</option>
            <option v-for="status in statuses" :key="status.id" :value="status.id">
              {{ status.name }}
            </option>
          </select>
          <TextShowingPagination :paginate="paginate" title="orders" />
        </div>
      </div>
    </div>
    <div class="tab-content">
      <div class="tab-pane show active fade" role="tabpanel" aria-labelledby="nav-list-tab">
        <div class="row" v-if="orders.length">
          <div v-for="order in orders" :key="order.id" class="col-lg-12 col-md-12 col-12">
            <!-- Start Single Product -->
            <div class="order-item">
              <div class="row align-items-center">
                <div class="col-md-3 col-12">
                  <div class="product-image">
                    <img :src="order.first_item?.product?.image_url" />
                    <span class="count-tag" v-if="order.items_count > 1"
                      >+{{ order.items_count - 1 }} {{ $t("items") }}</span
                    >
                  </div>
                </div>
                <div class="col-md-9 col-12">
                  <div class="product-info d-flex flex-column">
                    <div class="d-flex">
                      <router-link :to="`/customer/orders/${order.id}`">
                        <span class="text-dark text-uppercase"
                          >{{ $t("Id") }}: {{ order.id }}
                          <IconShipmentMethod v-if="order.shipment_method_id" :id="order.shipment_method_id"
                        /></span>
                      </router-link>
                      <TextOrderStatus :status="order.status" class="ms-auto" />
                    </div>
                    <h4 class="title pb-1 mb-auto">
                      <router-link :to="`/customer/orders/${order.id}`" class="text-truncate-2">
                        {{ order.first_item?.product?.name || order.first_item?.product_id || "..." }}
                      </router-link>
                    </h4>
                    <div class="d-flex mb-1">
                      <div>
                        {{ $t("Purchase cost") }}:
                        <TextMoney :amount="order.purchase_cost" :currency="order.purchase_cost_currency_id" />
                      </div>
                      <div class="mx-3">
                        {{ $t("Service fee") }}:
                        <TextMoney :amount="order.service_fee" :currency="order.service_fee_currency_id" />
                      </div>
                    </div>
                    <div class="d-flex">
                      <div class="text-truncate">{{ $t("Note") }}: ...</div>
                      <TextDateTime :timestamp="order.created_at" class="ms-auto small text-truncate" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- End Single Product -->
          </div>
        </div>
        <TextEmpty v-else class="mt-4" />
        <div class="row">
          <div class="col-12">
            <!-- Pagination -->
            <ThePagination :paginate="paginate" @change-page="changePage" />
            <!--/ End Pagination -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useOrderStore } from "@/stores/orders";
import { defineComponent } from "vue";
import IconShipmentMethod from "@/components/IconShipmentMethod.vue";
import TextMoney from "@/components/TextMoney.vue";
import TextDateTime from "@/components/TextDateTime.vue";
import ThePagination from "@/components/ThePagination.vue";
import TextOrderStatus from "@/components/TextOrderStatus.vue";
import TextShowingPagination from "@/components/TextShowingPagination.vue";
import { useStatusStore } from "@/stores/statuses";
import TextEmpty from "@/components/TextEmpty.vue";

export default defineComponent({
  components: {
    IconShipmentMethod,
    TextMoney,
    TextDateTime,
    ThePagination,
    TextOrderStatus,
    TextShowingPagination,
    TextEmpty,
  },

  data() {
    return {
      filter: {
        include: "type,status,itemsCount,customer",
        append: "first_item",
        sort: "-created_at",
        page: 1,
        filter: {
          status_id: "",
        },
      },
    };
  },

  created() {
    this.fetchOrders();
  },

  computed: {
    orders() {
      return useOrderStore().list;
    },
    paginate() {
      return useOrderStore().paginate;
    },
    statuses() {
      return useStatusStore().list;
    },
  },

  methods: {
    fetchOrders() {
      useOrderStore().fetch(this.filter);
    },
    changePage(page: number) {
      this.filter.page = page;
      this.fetchOrders();
    },
  },
});
</script>
