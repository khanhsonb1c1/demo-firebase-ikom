<template>
  <div class="row">
    <div class="col-md-12 mt-4">
      <div class="card pt-1">
        <h6 class="p-3 border-bottom">
          {{ $t("Shipment method") }}
        </h6>
        <div class="checkout-payment-option p-4 pt-0">
          <div class="payment-option-wrapper">
            <div
              class="single-payment-option"
              v-for="(item, index) in list"
              :key="index"
              @click="$emit('update:shipment_method', item.id)"
            >
              <input type="radio" name="shipping" :checked="item.id == 'air'" :id="item.id" />
              <label :for="item.id">
                <div class="fs-3"><IconShipmentMethod :id="item.id" /></div>
                <p>{{ item.name }}</p>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import IconShipmentMethod from "@/components/IconShipmentMethod.vue";
import { useShipmentMethodStore } from "@/stores/shipment_methods";

export default defineComponent({
  components: {
    IconShipmentMethod,
  },

  computed: {
    list() {
      return useShipmentMethodStore().list;
    },
  },

  created() {
    if (!this.list.length) {
      useShipmentMethodStore().fetch();
    }
  },
});
</script>
