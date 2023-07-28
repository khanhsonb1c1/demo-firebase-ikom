<template>
  <div class="row">
    <div class="col-md-4">
      <div class="single-form form-default">
        <label>Province</label>
        <VueMultiselect
          v-model="province"
          :options="provinces"
          :close-on-select="true"
          :clear-on-select="false"
          placeholder="Select one"
          label="name"
          track-by="name"
          selectLabel=""
          deselectLabel=""
          @select="selectProvince"
          :allow-empty="false"
        />
      </div>
    </div>
    <div class="col-md-4">
      <div class="single-form form-default">
        <label>District</label>
        <VueMultiselect
          v-model="district"
          :options="districts"
          :close-on-select="true"
          :clear-on-select="false"
          placeholder="Select one"
          label="name"
          track-by="name"
          selectLabel=""
          deselectLabel=""
          @select="selectDistrict"
          :allow-empty="false"
        />
      </div>
    </div>
    <div class="col-md-4">
      <div class="single-form form-default">
        <label>Ward</label>
        <VueMultiselect
          v-model="ward"
          :options="wards"
          :close-on-select="true"
          :clear-on-select="false"
          placeholder="Select one"
          label="name"
          track-by="name"
          selectLabel=""
          deselectLabel=""
          :allow-empty="false"
          @select="selectWard"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import VueMultiselect from "vue-multiselect";
import type Province from "@/types/Province";
import type District from "@/types/District";
import type Ward from "@/types/Ward";
import { useProvinceStore } from "@/stores/provinces";
import { districts, wards } from "@/services/helper";

export default defineComponent({
  components: { VueMultiselect },

  props: {
    select_ward_id: {
      type: [String, Number],
      required: false,
    },
  },

  data() {
    return {
      province: {},
      district: {},
      ward: {},
      districts: [],
      wards: [],
    };
  },

  created() {
    useProvinceStore().fetchFirstTime();
    if (this.select_ward_id) {
      wards.get(this.select_ward_id, { include: "district,province" }).then(({ data }) => {
        this.ward = data;
        this.district = data.district;
        this.province = data.province;
      });
    }
  },

  computed: {
    provinces() {
      return useProvinceStore().list;
    },
  },

  methods: {
    selectProvince(province: Province) {
      this.district = {};
      this.ward = {};
      districts.all({ "filter[province_id]": province.id }).then(({ data }) => {
        this.districts = data;
      });
    },
    selectDistrict(district: District) {
      this.ward = {};
      wards.all({ "filter[district_id]": district.id }).then(({ data }) => {
        this.wards = data;
      });
    },
    selectWard(ward: Ward) {
      this.$emit("select", ward);
    },
  },
});
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style>
.multiselect,
.multiselect__input,
.multiselect__single {
  font-size: inherit;
}

.checkout-steps-form-style-1 #accordionExample li {
  margin-bottom: 0;
}
</style>
