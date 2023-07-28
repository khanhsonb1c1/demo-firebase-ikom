<template>
  <div class="col-lg-4">
    <div class="checkout-sidebar">
      <div class="checkout-sidebar-coupon">
        <p>{{ $t("Appy coupon") }}!</p>
        <form action="#">
          <div class="single-form form-default">
            <div class="form-input form">
              <input type="text" :placeholder="$t('Coupon code')" v-model="coupon_code" />
            </div>
            <div class="button">
              <button class="btn">{{ $t("Apply") }}</button>
            </div>
          </div>
        </form>
      </div>

      <div class="checkout-sidebar-price-table mt-30">
        <h5 class="title">{{ $t("Pricing table") }}</h5>

        <div class="sub-total-price">
          <div class="total-price">
            <p class="value">{{ $t("Cost of goods") }}:</p>
            <span>
              <TextMoney :amount="total_price" currency="JPY" /><span>~</span>
              <TextMoney :amount="exchangePrice(total_price)" :currency="selected_currency" />
            </span>
          </div>
          <div class="total-price shipping">
            <p class="value">{{ $t("Discount") }}:</p>
            <TextMoney :amount="discount_of_code" :currency="selected_currency" />
          </div>
          <div class="total-price discount">
            <div class="d-flex align-items-center">
              <p class="value">{{ $t("Shipping fee (Estimates)") }}:</p>
              <TheLoading v-if="fetching_shipping_fee" />
            </div>

            <TextMoney :amount="shipping_fee" :currency="selected_currency" />
          </div>
        </div>

        <div class="total-payable">
          <div class="payable-price">
            <p class="value">{{ $t("Total price") }}:</p>
            <TextMoney :amount="final_price" :currency="selected_currency" />
          </div>
        </div>
        <div class="d-flex align-items-center">
          <button class="price-table-btn button border-0" @click="create" :disabled="!check_btn">
            <a href="#" :class="[check_btn ? '' : 'disabled', 'btn btn-alt']">{{ $t("Create order") }}</a>
          </button>
          <TheLoading class="ms-3 mt-3" v-if="fetching" />
        </div>
        <TheAlert :message="message" :color="color" />
      </div>

      <div class="checkout-sidebar-banner mt-30">
        <a href="#">
          <img src="https://via.placeholder.com/400x330" alt="#" />
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import TextMoney from "@/components/TextMoney.vue";
import TheAlert from "@/components/TheAlert.vue";
import { retail } from "@/services/order";
import { useCartStore } from "@/stores/cart";
import type Address from "@/types/Address";
import type ItemRetail from "@/types/ItemRetail";
import { mapState } from "pinia";
import { defineComponent } from "vue";
import TheLoading from "@/components/TheLoading.vue";
import type CartItem from "@/types/CartItem";
import { getAmoutWithConditions } from "@/services/helper";
import { useExchangeRate } from "@/stores/exchange_rates";

export default defineComponent({
  components: { TextMoney, TheAlert, TheLoading },

  props: {
    address: {
      type: Object as () => Address,
      required: true,
    },
    shipment_method: {
      type: String,
      required: false,
    },
  },

  data() {
    return {
      coupon_code: "", // not used yet
      discount_of_code: 0 as number, // not used yet
      message: "",
      color: "",
      fetching: false,
      debouce: 0,
      range: 0,
      shipping_fee: 0,
      creating: false,
      fetching_shipping_fee: false,
    };
  },

  computed: {
    ...mapState(useCartStore, ["total_price", "cart_items", "product_items"]),

    final_price() {
      if (this.selected_currency == "JPY") {
        return this.shipping_fee + this.total_price;
      } else {
        return this.shipping_fee + this.exchangePrice(this.total_price);
      }
    },

    ...mapState(useExchangeRate, ["rate", "selected_currency"]),

    check_btn() {
      if (this.cart_items.length && this.address && this.shipment_method && !this.creating) {
        return true;
      } else {
        return false;
      }
    },
  },

  mounted() {
    if (this.product_items.length) {
      this.getExpectedShippingFee();
    }
  },

  watch: {
    cart_items() {
      this.getExpectedShippingFee();
    },

    shipment_method() {
      this.getExpectedShippingFee();
    },

    selected_currency() {
      this.getExpectedShippingFee();
    },
  },

  methods: {
    getRange() {
      const weightHandler = (weight: number, product: CartItem) => {
        return product.product_info?.weight
          ? weight +
              (product.product_info?.weight * product.cart_local_item.quantity) / product.product_info?.quantity_items
          : weight;
      };

      const weightVolumeHanler = (weight_volume: number, product: CartItem) => {
        if (product.product_info?.width) {
          return (
            weight_volume +
            (((product.product_info?.width * product.product_info?.length * product.product_info?.height) /
              (this.shipment_method == "air" ? 6000 : 3600)) *
              product.cart_local_item.quantity) /
              product.product_info?.quantity_items
          );
        } else {
          return weight_volume;
        }
      };

      const weight = this.cart_items.reduce(weightHandler, 0);

      const weightVolume = this.cart_items.reduce(weightVolumeHanler, 0);

      weight < weightVolume ? (this.range = weightVolume) : (this.range = weight);
    },

    getExpectedShippingFee() {
      this.getRange();
      const conditions = {
        type: "shipping-fee",
        currency: this.selected_currency,
        organization: import.meta.env.VITE_APP_ORGANIZATION,
        from: import.meta.env.VITE_APP_TRANSFER_WAREHOUSE_FROM,
        to: import.meta.env.VITE_APP_TRANSFER_WAREHOUSE_TO,
        "shipment-method": this.shipment_method,
      };

      return new Promise((resolve, reject) => {
        this.fetching_shipping_fee = true;
        getAmoutWithConditions({
          conditions,
          timeline: Math.round(Date.now() / 1000),
          range: this.range,
        })
          .then((res) => {
            this.shipping_fee = res.data * this.range;
            this.fetching_shipping_fee = false;
            resolve(res);
          })
          .catch((err) => {
            this.fetching_shipping_fee = false;
            reject(err);
          });
      });
    },

    exchangePrice(price: number) {
      if (this.rate) {
        return this.rate * price;
      } else {
        return price;
      }
    },

    create() {
      this.creating = true;
      clearTimeout(this.debouce);
      this.debouce = setTimeout(() => {
        const shipment_info = {
          consignee: this.address.consignee,
          address: this.address.address_detail,
          tel: this.address.tel,
          ward_id: this.address.ward_id,
          note: this.address.note,
          sender_name: this.address.consignee,
          sender_tel: this.address.tel,
        };

        const items_convert = this.cart_items.map((item) => {
          return {
            product_id: item.cart_local_item.product_id,
            quantity: item.cart_local_item.quantity,
            price: item.price,
            tax_percent: item.tax_percent,
          };
        });
        const items = [] as Array<ItemRetail>;
        items_convert.forEach((item: ItemRetail) => {
          items.push({
            quantity: item.quantity,
            product_id: item.product_id,
            price: item.price,
            tax_percent: item.tax_percent,
          });
        });

        const data = {
          shipment_info,
          items,
          shipment_method_id: this.shipment_method,
          sales_organization_id: import.meta.env.VITE_APP_ORGANIZATION,
        };
        this.fetching = true;

        retail
          .create(data)
          .then((res) => {
            this.fetching = false;
            useCartStore().clearCartItems();
            this.creating = false;
            this.$router.push({
              path: `/customer/orders/${res.data.id}`,
            });
          })
          .catch((err) => {
            this.creating = false;
            this.fetching = false;
            this.message = `${err.response.data.message}`;
            this.color = "danger";
            setTimeout(() => {
              this.message = "";
              this.color = "";
            }, 3000);
          });
      }, 300);
    },
  },
});
</script>
