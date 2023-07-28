<template>
  <div class="row justify-content-center">
    <div class="col-lg-8">
      <div class="order-card-table">
        <h5 class="title text-capitalize">{{ $t("Order info") }}</h5>

        <div class="card-group-content">
          <div class="card-content">
            <p>{{ $t("Id") }}:</p>
            <p>{{ detail.id }}</p>
          </div>
          <div class="card-content">
            <p>{{ $t("Status") }}:</p>
            <p>{{ detail.status?.name }}</p>
          </div>
          <div class="card-content">
            <p>{{ $t("Shipment method") }}:</p>
            <p>{{ detail.shipment_method?.name }}</p>
          </div>
          <div class="card-content shipping">
            <p>{{ $t("Note") }}:</p>
            <p>{{ detail.note || "..." }}</p>
          </div>
          <div class="card-content shipping">
            <p>{{ $t("Order date") }}:</p>
            <p><TextDateTime :timestamp="detail.created_at" /></p>
          </div>
        </div>
      </div>
      <div>
        <OrderProductItem v-for="item in order_items" :key="item.id" :data="item" />
        <ThePagination
          v-if="items_pagination.last_page > 1"
          :paginate="items_pagination"
          @change-page="changeItemsPage"
        />
      </div>
      <div class="order-card-table mt-30">
        <h5 class="title text-capitalize">{{ $t("Payment info") }}</h5>

        <div class="card-group-content">
          <div class="card-content">
            <p>{{ $t("Purchase cost") }}:</p>
            <div>
              <TextMoney :amount="detail.purchase_cost" :currency="detail.purchase_cost_currency_id" />
              ~
              <TextMoney
                :amount="detail.purchase_cost * detail.payment_rate"
                :currency="detail.service_fee_currency_id"
              />
            </div>
          </div>
          <div class="card-content">
            <p>{{ $t("Service fee") }}:</p>
            <TextMoney :amount="detail.service_fee" :currency="detail.service_fee_currency_id" />
          </div>
          <div class="card-content" v-if="checkStatusEstimatedFreightCharge()">
            <p>{{ $t("Shipping fee (Estimates)") }}:</p>
            <TextMoney :amount="detail.estimated_freight_charge" :currency="detail.service_fee_currency_id" />
          </div>
          <div class="card-content">
            <p>{{ $t("Discount") }}:</p>
            <TextMoney :amount="0" currency="VND" />
          </div>
        </div>

        <div class="total-payable">
          <div class="payable-price">
            <p>{{ $t("Total") }}:</p>
            <TextMoney :amount="total_payment" :currency="detail.service_fee_currency_id" />
          </div>
        </div>
        <div class="card-btn button">
          <router-link to="/payment-info" class="btn btn-alt">
            {{ $t("Payment") }}
          </router-link>
        </div>
      </div>
      <div class="order-card-table mt-30">
        <h5 class="title text-capitalize">{{ $t("Shipment info") }}</h5>

        <div class="card-group-content">
          <div class="card-content">
            <p>{{ $t("Consignee") }}:</p>
            <p>{{ detail.shipment_info?.consignee }}</p>
          </div>
          <div class="card-content">
            <p>{{ $t("Address") }}:</p>
            <p class="price text-truncate">
              {{ detail.shipment_info?.full_address }}
            </p>
          </div>
          <div class="card-content">
            <p>{{ $t("Tel") }}:</p>
            <p>{{ detail.shipment_info?.tel }}</p>
          </div>
          <div class="card-content shipping">
            <p>{{ $t("Note") }}:</p>
            <p class="price text-truncate">
              {{ detail.shipment_info?.note || "..." }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-4">
      <div class="order-card-coupon">
        <p>{{ $t("Appy Coupon to get discount") }}!</p>
        <div>
          <div class="single-form form-default">
            <div class="form-input form">
              <input type="text" />
            </div>
            <div class="button">
              <button class="btn">{{ $t("Apply") }}</button>
            </div>
          </div>
        </div>
      </div>
      <div class="order-card-table mt-20">
        <h5 class="title text-capitalize">{{ $t("Notifications") }}</h5>
        <TextEmpty v-if="!detail?.owning_boxes?.length" />
        <div class="card-group-content border-bottom pb-3 pt-2" v-for="box in detail?.owning_boxes" :key="box.id">
          <p class="mb-1 fw-bold">{{ $t("SKU") }}: {{ box?.box_id }}</p>
          <TextEmpty v-if="!box?.notifications?.length" />
          <OrderNotification
            v-for="notification in box.notifications"
            :key="notification.id"
            :notification="notification"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import OrderProductItem from "./ProductItem.vue";
import TextMoney from "@/components/TextMoney.vue";
import { useOrderStore } from "@/stores/orders";
import TextDateTime from "@/components/TextDateTime.vue";
import { items } from "@/services/order";
import type OrderItem from "@/types/OrderItem";
import type Pagination from "@/types/Pagination";
import ThePagination from "@/components/ThePagination.vue";
import OrderNotification from "./OrderNotification.vue";
import TextEmpty from "@/components/TextEmpty.vue";

export default defineComponent({
  components: {
    TextEmpty,
    TextMoney,
    OrderProductItem,
    TextDateTime,
    ThePagination,
    OrderNotification,
  },
  data() {
    return {
      order_items: [] as Array<OrderItem>,
      items_pagination: {} as Pagination,
    };
  },
  watch: {
    $route: {
      immediate: true,
      handler(route) {
        if (route.params.id && !this.order_items.length) {
          this.fetchOrderDetail(route.params.id);
        }
      },
    },
  },
  computed: {
    detail() {
      return useOrderStore().detail;
    },
    total_payment() {
      const detail = JSON.parse(JSON.stringify(this.detail));
      if (this.checkStatusEstimatedFreightCharge()) {
        return detail.estimated_freight_charge + detail.total_payment;
      } else {
        return detail.total_payment;
      }
    },
  },
  methods: {
    fetchOrderDetail(id: string) {
      useOrderStore().get(id);
      this.fetchOrderItems(id, 1);
    },
    checkStatusEstimatedFreightCharge() {
      const statusesWithoutEstimatedFreightCharge = ["Debited", "Finish", "Cancelled", "PaidToSupplier"];
      return !statusesWithoutEstimatedFreightCharge.some((item) => this.detail.status_id == item);
    },
    fetchOrderItems(id: string, page: number) {
      items
        .all({
          page: page,
          "filter[order_id]": id,
          append: "currency_id",
          include: "product",
        })
        .then(({ data }) => {
          this.order_items = data.data;
          this.items_pagination = data;
        });
    },
    changeItemsPage(page: number) {
      const id = this.$route.params.id as string;
      this.fetchOrderItems(id, page);
    },
  },
});
</script>
