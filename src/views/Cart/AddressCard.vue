<template>
  <div :class="[active ? 'border border-primary' : '', 'card w-100 mb-3']">
    <div class="card-body">
      <h5 class="card-title">{{ address.consignee }}</h5>
      <p class="card-text">
        <i class="lni lni-map"></i>
        {{ address.full_address }}
      </p>
      <p class="card-text">
        <i class="lni lni-phone"></i>
        {{ address.tel }}
      </p>
      <p class="card-text">
        <i class="lni lni-pencil-alt"></i>
        {{ address.note || "..." }}
      </p>

      <div class="mt-2">
        <!-- icon default -->
        <a v-if="address.default">
          <i class="lni lni-checkmark text-success fs-5"></i>
          <i class="text-success">{{ $t("Default") }}</i>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type Address from "@/types/Address";
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    address: {
      type: Object as () => Address,
      required: true,
    },
    id: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      active: false,
    };
  },

  watch: {
    id() {
      this.active = this.id == String(this.address.id);
    },
  },
});
</script>
