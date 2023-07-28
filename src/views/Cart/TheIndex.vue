<template>
  <section class="checkout-wrapper section">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <div class="checkout-steps-form-style-1">
            <CartDetail />
            <div class="row">
              <div class="col-md-12">
                <div class="card">
                  <h6 class="p-3 border-bottom">
                    {{ $t("Address") }}
                  </h6>
                  <div class="w-100 mt-2 d-flex flex-wrap flex-row p-3" v-if="addresses.length">
                    <div class="card-body pt-0">
                      <h5 class="card-title">
                        {{ shipment_address.consignee }}
                      </h5>
                      <p class="card-text">
                        <i class="lni lni-map" style=""></i>
                        {{ shipment_address.full_address }}
                      </p>
                      <p class="card-text">
                        <i class="lni lni-phone" style=""></i>
                        {{ shipment_address.tel }}
                      </p>
                      <p class="card-text">
                        <i class="lni lni-pencil-alt" style=""></i>
                        {{ shipment_address.note || "..." }}
                      </p>

                      <div class="mt-2">
                        <slot name="action"></slot>

                        <a v-if="shipment_address.default">
                          <i class="lni lni-checkmark fs-5 text-success"></i>
                          <i class="text-success">{{ $t("Default") }}</i>
                        </a>
                      </div>
                    </div>
                    <div class="card-btn">
                      <i class="lni lni-pencil me-2 text-primary"></i>
                      <a href="#" data-bs-toggle="modal" data-bs-target="#chooseAddress">{{ $t("Change address") }}</a>
                    </div>
                  </div>
                </div>
                <CreateAddressForm v-show="!addresses.length" @update:address="shipment_address = $event" />
                <DeliveryOption @update:shipment_method="shipment_method = $event" />
              </div>
            </div>
          </div>
        </div>
        <PricingTable :address="shipment_address" :shipment_method="shipment_method" />
      </div>
    </div>
    <ModalCart id="chooseAddress" :title="$t('Delivery address')">
      <template #content>
        <AddressCard
          v-for="(address, index) in addresses"
          :key="index"
          :address="address"
          :id="String(shipment_address.id)"
          @click="chooseAddress(address)"
        />
      </template>
    </ModalCart>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CartDetail from "./CartDetail.vue";
import PricingTable from "./PricingTable.vue";
import type Address from "@/types/Address";
import { useAddressStore } from "@/stores/addresses";
import ModalCart from "./ModalCart.vue";
import AddressCard from "./AddressCard.vue";
import DeliveryOption from "./DeliveryOption.vue";
import CreateAddressForm from "./CreateAddressForm.vue";

export default defineComponent({
  components: {
    CartDetail,
    PricingTable,
    ModalCart,
    AddressCard,
    DeliveryOption,
    CreateAddressForm,
  },

  data() {
    return {
      shipment_address: {} as Address,
      shipment_method: "air",
    };
  },

  computed: {
    addresses(): Array<Address> {
      return useAddressStore().list;
    },

    address_default() {
      return useAddressStore().list.find((item) => item.default === true);
    },
  },

  created() {
    if (!this.addresses.length) {
      useAddressStore()
        .fetch()
        .then(() => {
          if (useAddressStore().list.length) {
            this.shipment_address = JSON.parse(JSON.stringify(this.address_default));
          }
        });
    }
    if (this.address_default) {
      this.shipment_address = JSON.parse(JSON.stringify(this.address_default));
    }
  },

  methods: {
    chooseAddress(address: Address) {
      this.shipment_address = address;
    },
  },
});
</script>
