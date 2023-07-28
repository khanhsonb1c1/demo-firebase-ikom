<template>
  <div class="checkout-steps-form-style-1">
    <ul id="accordionExample">
      <li class="mb-4">
        <h6
          class="title py-2 collapsed text-capitalize"
          data-bs-toggle="collapse"
          data-bs-target="#collapseAddressCreate"
          aria-expanded="false"
          aria-controls="collapseAddressCreate"
        >
          <i class="lni lni-plus"></i>
          <span class="px-3"> Create new address </span>
          <TheLoading v-if="input_address._loading" class="mx-2" />
        </h6>
        <section
          class="checkout-steps-form-content collapse"
          id="collapseAddressCreate"
          aria-labelledby="headingThree"
          data-bs-parent="#accordionExample"
        >
          <div class="row">
            <div class="col-md-6">
              <div class="single-form form-default">
                <label>Consignee</label>
                <div class="form-input form">
                  <input type="text" v-model="input_address.consignee" />
                </div>
                <alert-input-error :error="input_address._error" input="consignee" />
              </div>
            </div>
            <div class="col-md-6">
              <div class="single-form form-default">
                <label>Phone Number</label>
                <div class="form-input form">
                  <input type="tel" v-model="input_address.tel" />
                </div>
                <alert-input-error :error="input_address._error" input="tel" />
              </div>
            </div>
            <SelectWard :select_ward_id="input_address.ward_id" @select="selectWard($event, input_address)" />
            <alert-input-error :error="input_address._error" input="ward_id" />
            <div class="col-md-12">
              <div class="single-form form-default">
                <label>Address detail</label>
                <div class="form-input form">
                  <input type="text" v-model="input_address.address_detail" />
                </div>
                <alert-input-error :error="input_address._error" input="address_detail" />
              </div>
            </div>
            <div class="col-md-12">
              <div class="single-form form-default">
                <label>Note</label>
                <div class="form-input form">
                  <input type="text" v-model="input_address.note" />
                </div>
                <alert-input-error :error="input_address._error" input="note" />
              </div>
            </div>
            <div class="col-md-12">
              <div class="single-checkbox checkbox-style-3">
                <input type="checkbox" id="checkbox-create-address-default" v-model="input_address.default" />
                <label for="checkbox-create-address-default"><span></span></label>
                <p>Set as default</p>
              </div>
            </div>
            <div class="col-md-12">
              <TheAlert :message="input_address._error?.message" color="danger" />
            </div>
            <div class="col-md-12">
              <div class="single-form button">
                <button class="btn" @click="create(input_address)">Create</button>
              </div>
            </div>
          </div>
        </section>
      </li>
      <li v-for="address in addresses" :key="address.id">
        <h6
          class="title text-capitalize collapsed"
          data-bs-toggle="collapse"
          :data-bs-target="`#collapseThree${address.id}`"
          aria-expanded="false"
          :aria-controls="`collapseThree${address.id}`"
        >
          {{ address.full_address }}
          <i v-if="address.default" class="lni lni-checkmark mx-3 text-primary"></i>
          <TheLoading v-if="address._loading" class="mx-2" />
        </h6>
        <section
          class="checkout-steps-form-content collapse"
          :id="`collapseThree${address.id}`"
          aria-labelledby="headingThree"
          data-bs-parent="#accordionExample"
        >
          <div class="row">
            <div class="col-md-6">
              <div class="single-form form-default">
                <label>Consignee</label>
                <div class="form-input form">
                  <input type="text" v-model="address.consignee" />
                </div>
                <alert-input-error :error="address._error" input="consignee" />
              </div>
            </div>
            <div class="col-md-6">
              <div class="single-form form-default">
                <label>Phone Number</label>
                <div class="form-input form">
                  <input type="tel" v-model="address.tel" />
                </div>
                <alert-input-error :error="address._error" input="tel" />
              </div>
            </div>
            <SelectWard :select_ward_id="address.ward_id" @select="selectWard($event, address)" />
            <alert-input-error :error="address._error" input="ward_id" />
            <div class="col-md-12">
              <div class="single-form form-default">
                <label>Address detail</label>
                <div class="form-input form">
                  <input type="text" v-model="address.address_detail" />
                </div>
                <alert-input-error :error="address._error" input="address_detail" />
              </div>
            </div>
            <div class="col-md-12">
              <div class="single-form form-default">
                <label>Note</label>
                <div class="form-input form">
                  <input type="text" v-model="address.note" />
                </div>
                <alert-input-error :error="address._error" input="note" />
              </div>
            </div>
            <div class="col-md-12">
              <div class="single-checkbox checkbox-style-3">
                <input type="checkbox" :id="`checkbox-${address.id}`" v-model="address.default" />
                <label :for="`checkbox-${address.id}`"><span></span></label>
                <p>Set as default</p>
              </div>
            </div>
            <div class="col-md-12">
              <TheAlert :message="address._error?.message" color="danger" />
            </div>
            <div class="col-md-12">
              <div class="single-form button d-flex">
                <button class="btn" @click="save(address)">Save</button>
                <button class="btn btn-alt ms-auto" @click="remove(address)">Delete</button>
              </div>
            </div>
          </div>
        </section>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { addresses } from "@/services/auth";
import { useAddressStore } from "@/stores/addresses";
import type Address from "@/types/Address";
import type Ward from "@/types/Ward";
import { defineComponent } from "vue";
import SelectWard from "./SelectWard.vue";
import TheLoading from "@/components/TheLoading.vue";
import TheAlert from "@/components/TheAlert.vue";
import AlertInputError from "@/components/AlertInputError.vue";

export default defineComponent({
  components: { SelectWard, TheLoading, TheAlert, AlertInputError },

  data() {
    return {
      input_address: {} as Address,
    };
  },

  created() {
    useAddressStore().fetch();
  },

  computed: {
    addresses() {
      return useAddressStore().list;
    },
  },

  methods: {
    selectWard(ward: Ward, address: Address) {
      address.ward_id = ward.id;
    },
    save(address: Address) {
      address._loading = true;
      addresses
        .update(address.id, {
          consignee: address.consignee,
          tel: address.tel,
          ward_id: address.ward_id,
          address_detail: address.address_detail,
          note: address.note,
          default: address.default,
        })
        .then(() => {
          useAddressStore().fetch();
          address._loading = false;
        })
        .catch(({ response }) => {
          address._loading = false;
          address._error = response.data;
        });
    },
    create(address: Address) {
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
          useAddressStore().fetch();
          this.input_address._loading = false;
          this.input_address = {} as Address;
        })
        .catch(({ response }) => {
          this.input_address._loading = false;
          this.input_address._error = response.data;
        });
    },
    remove(address: Address) {
      address._loading = true;
      addresses
        .delete(address.id)
        .then(() => {
          useAddressStore().fetch();
          address._loading = false;
        })
        .catch(({ response }) => {
          address._loading = false;
          address._error = response.data;
        });
    },
  },
});
</script>
