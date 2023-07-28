<template>
  <div class="single-block">
    <div class="row">
      <div class="col-lg-6 col-12">
        <div class="info-body custom-responsive-margin">
          <h4>{{ $t("Ingredients") }}</h4>
          <p>
            {{ product?.ingredients || `${$t("Empty")}` }}
          </p>
          <h4>{{ $t("Product specifications") }}</h4>
          <ul class="normal-list">
            <li>
              <span>{{ $t("Weight") }}:</span> {{ product?.weight }} (kg)
            </li>
            <li>
              <span>{{ $t("Height") }}:</span> {{ product?.height }} (cm)
            </li>
            <li>
              <span>{{ $t("Width") }}:</span> {{ product?.width }} (cm)
            </li>
            <li>
              <span>{{ $t("Length") }}:</span>{{ product?.length }} (cm)
            </li>
            <li>
              <span>{{ $t("Quantity in box") }}:</span>
              {{ product?.quantity_items }}
            </li>
          </ul>
        </div>
      </div>
      <div class="col-lg-6 col-12">
        <div class="info-body">
          <h4>{{ $t("Infomation") }}</h4>
          <ul class="normal-list">
            <li>
              <span>{{ $t("Hs code") }}: </span> {{ product?.hs_code }}
            </li>
            <li>
              <span>{{ $t("Product id") }}: </span> {{ product?.id }}
            </li>
            <li>
              <span class="me-2">{{ $t("Category") }}: </span>
              {{ categories }}
            </li>
            <li>
              <span>{{ $t("Origin") }}: </span>
              {{ product?.origin?.name }}
            </li>
            <li>
              <span>{{ $t("Tax percent") }}: </span>
              {{ product?.tax_percent || 0 }}%
            </li>
          </ul>

          <h4>{{ $t("Service policy") }}</h4>

          <ul class="features">
            <li>{{ $t("Free ship") }}</li>
            <li>{{ $t("Refund 100%") }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type Category from "@/types/Category";
import type Product from "@/types/Product";
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    product: {
      type: Object as () => Product,
      required: true,
    },
  },

  computed: {
    categories() {
      if (this.product.categories) {
        const list = this.product?.categories
          .map((item: Category) => {
            return item?.name;
          })
          .toString();
        return list.replace(/,/gi, ", ");
      } else {
        return "";
      }
    },
  },
});
</script>
