<template>
  <div class="row mb-4 d-flex justify-content-between align-items-center">
    <div class="d-flex flex-row align-items-center col-md-12 col-lg-6 col-xl-6 col-12">
      <div class="col-3">
        <img :src="item?.product_info?.image_url" class="img-fluid rounded-3 aspect-ratio" alt="Shopping item" />
      </div>
      <div class="ms-3 col-9">
        <router-link :to="`/products/${item?.product_info?.id}`">
          <h6 class="text-truncate-2">
            {{ item?.product_info?.name || item?.cart_local_item.product_id }}
          </h6>
        </router-link>

        <p class="small mb-0">{{ categories }}</p>

        <div class="mt-2">
          {{ $t("Price") }}:
          <TextMoney :amount="item?.product_info?.price" currency="JPY" />
        </div>
      </div>
    </div>
    <div class="col-md-4 col-lg-3 col-xl-3 col-6 d-flex ps-3 mt-4 mt-lg-1 mt-xl-1">
      <button
        class="btn btn-link px-2 me-2"
        @click="decrease"
        :data-bs-toggle="quantity == 1 && 'modal'"
        :data-bs-target="quantity == 1 && `#deleteItem${item?.product_info?.id}`"
        :disabled="!item?.product_info?.id"
      >
        <i class="lni lni-minus"></i>
      </button>
      <input
        id="form1"
        min="1"
        name="quantity"
        v-model="positiveNumber"
        type="number"
        class="form-control form-control-sm"
        @change="update"
        onkeypress="return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))"
        :disabled="!item?.product_info?.id"
      />
      <button class="btn btn-link px-2 ms-2" @click="increase" :disabled="!item?.product_info?.id">
        <i class="lni lni-plus"></i>
      </button>
    </div>
    <div class="col-md-3 col-lg-2 col-xl-2 col-5 text-center mt-4 mt-lg-1 mt-xl-1">
      <h6 class="mb-0">
        <TextMoney :amount="total_price" currency="JPY" />
      </h6>
    </div>
    <div class="col-md-1 col-lg-1 col-xl-1 col-1 text-end mt-4 mt-lg-1 mt-xl-1">
      <a
        href="#"
        class="text-muted"
        data-bs-toggle="modal"
        :data-bs-target="`#deleteItem${item?.cart_local_item.product_id}`"
        ><i class="lni lni-close"></i
      ></a>
    </div>
    <div class="mt-2" v-if="!item?.product_info?.id">
      <p class="text-danger">
        {{ $t("Product not found") }}
      </p>
    </div>
  </div>
  <hr class="my-4" />
  <ModalCart
    :title="$t('Remove')"
    :action="true"
    :id="`deleteItem${item?.cart_local_item.product_id}`"
    @accept="remove"
  >
    <template #content>
      <span class="fs-6"
        >{{ $t("Do you want remove") }}
        <strong class="text-primary">{{ item?.product_info?.name }}</strong>
        ?</span
      >
    </template>
  </ModalCart>
</template>

<script lang="ts">
import TextMoney from "@/components/TextMoney.vue";
import { useCartStore } from "@/stores/cart";
import type Category from "@/types/Category";
import { defineComponent } from "vue";
import type CartItem from "@/types/CartItem";
import ModalCart from "./ModalCart.vue";

export default defineComponent({
  components: { TextMoney, ModalCart },

  props: {
    item: {
      type: Object as () => CartItem,
      required: true,
    },
  },

  data() {
    return {
      quantity: 1 as number,
    };
  },

  computed: {
    categories() {
      if (this.item?.product_info?.categories) {
        const list = this.item?.product_info?.categories
          .map((item: Category) => {
            return item?.name;
          })
          .toString();
        return list.replace(/,/gi, ", ");
      } else {
        return "";
      }
    },

    total_price() {
      if (this.item.product_info) {
        return this.quantity * this.item?.product_info?.price;
      } else return 0;
    },

    positiveNumber: {
      get() {
        return this.quantity;
      },
      set(value: number) {
        if (value <= 0) {
          this.quantity = 1;
        } else {
          this.quantity = value;
        }
      },
    },
  },

  created() {
    this.quantity = this.item?.cart_local_item.quantity;
  },

  methods: {
    decrease() {
      if (this.quantity > 1) {
        this.quantity--;
        this.update();
      }
    },

    increase() {
      this.quantity++;
      this.update();
    },

    update() {
      useCartStore().updateQuantityItem(this.item?.product_info?.id, this.quantity);
    },

    remove() {
      useCartStore().removeCartItem(this.item?.cart_local_item.product_id);
    },
  },
});
</script>
