<template>
  <div class="card w-100 mt-3 p-4">
    <div class="card-text d-flex align-items-center">
      <p>{{ $t("You have not address, please create") }} !</p>
      <TheLoading v-if="input_address._loading" class="mx-2" />
    </div>
    <div class="row">
      <div class="col-md-6">
        <div class="single-form form-default">
          <label>{{ $t("Consignee") }}</label>
          <div class="form-input form">
            <input type="text" v-model="input_address.consignee" />
          </div>
          <AlertInputError :error="input_address._error" input="consignee" />
        </div>
      </div>
      <div class="col-md-6">
        <div class="single-form form-default">
          <label>{{ $t("Tel") }}</label>
          <div class="form-input form">
            <input type="tel" v-model="input_address.tel" />
          </div>
          <AlertInputError :error="input_address._error" input="tel" />
        </div>
      </div>
      <SelectWard :select_ward_id="input_address.ward_id" @select="selectWard($event, input_address)" />
      <AlertInputError :error="input_address._error" input="ward_id" />
      <div class="col-md-12">
        <div class="single-form form-default">
          <label>{{ $t("Address detail") }}</label>
          <div class="form-input form">
            <input type="text" v-model="input_address.address_detail" />
          </div>
          <AlertInputError :error="input_address._error" input="address_detail" />
        </div>
      </div>
      <div class="col-md-12">
        <div class="single-form form-default">
          <label>{{ $t("Note") }}</label>
          <div class="form-input form">
            <input type="text" v-model="input_address.note" />
          </div>
          <AlertInputError :error="input_address._error" input="note" />
        </div>
      </div>
      <div class="col-md-12">
        <div class="single-checkbox checkbox-style-3">
          <input type="checkbox" id="checkbox-create-address-default" v-model="input_address.default" />
          <label for="checkbox-create-address-default"><span></span></label>
          <p>{{ $t("Set as default") }}</p>
        </div>
      </div>
      <div class="col-md-12">
        <TheAlert :message="input_address._error?.message" color="danger" />
      </div>
      <div class="col-md-12">
        <div class="single-form button">
          <button class="btn w-100" @click="create(input_address)">
            {{ $t("Create") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type Address from "@/types/Address";
import { defineComponent } from "vue";
import TheAlert from "@/components/TheAlert.vue";
import AlertInputError from "@/components/AlertInputError.vue";
import SelectWard from "@/views/Customer/SelectWard.vue";
import type Ward from "@/types/Ward";
import { useAddressStore } from "@/stores/addresses";
import { addresses } from "@/services/auth";
import TheLoading from "@/components/TheLoading.vue";

export default defineComponent({
  components: {
    SelectWard,
    TheAlert,
    AlertInputError,
    TheLoading,
  },

  data() {
    return {
      input_address: {} as Address,
      debouce: 0,
    };
  },

  methods: {
    selectWard(ward: Ward, address: Address) {
      address.ward_id = ward.id;
    },

    create(address: Address) {
      //using debouce for button create new address
      clearTimeout(this.debouce);
      this.debouce = setTimeout(() => {
        this.input_address._loading = true;
        addresses
          .create({
            consignee: address.consignee,
            tel: address.tel,
            ward_id: address.ward_id,
            address_detail: address.address_detail,
            note: address.note,
            default: address.default,
          })
          .then(() => {
            this.input_address._loading = false;
            useAddressStore().fetch();
            this.$emit("update:address", address);
          })
          .catch(({ response }) => {
            this.input_address._loading = false;
            this.input_address._error = response.data;
          });
      }, 300);
    },
  },
});
</script>
