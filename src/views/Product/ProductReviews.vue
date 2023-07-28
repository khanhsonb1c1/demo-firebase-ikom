<template>
  <div class="row">
    <div class="col-lg-4 col-12">
      <div class="single-block give-review">
        <h4>{{ product.star }} ({{ $t("Overall") }})</h4>
        <ul>
          <li>
            <span>5 {{ $t("Star") }}</span>
            <i class="lni lni-star-filled"></i>
            <i class="lni lni-star-filled"></i>
            <i class="lni lni-star-filled"></i>
            <i class="lni lni-star-filled"></i>
            <i class="lni lni-star-filled"></i>
          </li>
          <li>
            <span>4 {{ $t("Star") }}</span>
            <i class="lni lni-star-filled"></i>
            <i class="lni lni-star-filled"></i>
            <i class="lni lni-star-filled"></i>
            <i class="lni lni-star-filled"></i>
            <i class="lni lni-star"></i>
          </li>
          <li>
            <span>3 {{ $t("Star") }}</span>
            <i class="lni lni-star-filled"></i>
            <i class="lni lni-star-filled"></i>
            <i class="lni lni-star-filled"></i>
            <i class="lni lni-star"></i>
            <i class="lni lni-star"></i>
          </li>
          <li>
            <span>2 {{ $t("Star") }}</span>
            <i class="lni lni-star-filled"></i>
            <i class="lni lni-star-filled"></i>
            <i class="lni lni-star"></i>
            <i class="lni lni-star"></i>
            <i class="lni lni-star"></i>
          </li>
          <li>
            <span>1 {{ $t("Star") }}</span>
            <i class="lni lni-star-filled"></i>
            <i class="lni lni-star"></i>
            <i class="lni lni-star"></i>
            <i class="lni lni-star"></i>
            <i class="lni lni-star"></i>
          </li>
        </ul>
        <!-- Button trigger modal -->
        <button type="button" class="btn review-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
          {{ $t("Leave a review") }}
        </button>
      </div>
    </div>
    <div class="col-lg-8 col-12">
      <div class="single-block">
        <div class="reviews">
          <div class="d-flex">
            <h4 class="title">{{ $t("Latest reviews") }}</h4>
            <TheLoading class="ms-3 mt-1" v-if="fetching" />
          </div>
          <span v-if="!product.reviews?.length">{{ $t("Empty reviews") }}</span>
          <!-- Start Single Review -->
          <div class="single-review" v-for="(review, index) in product.reviews" :key="index">
            <img src="https://via.placeholder.com/150x150" alt="#" />
            <div class="review-info">
              <h4>
                {{ review.comment }}
              </h4>
              <TheStar :star="review.star" />

              <p>
                <TextDateTime :timestamp="review.updated_at" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ReviewForm :id="product.id" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ReviewForm from "./ReviewForm.vue";
import type Product from "@/types/Product";
import TextDateTime from "@/components/TextDateTime.vue";
import TheStar from "@/components/TheStar.vue";
import TheLoading from "@/components/TheLoading.vue";
import { useProductStore } from "@/stores/products";

export default defineComponent({
  components: { ReviewForm, TextDateTime, TheStar, TheLoading },

  props: {
    product: {
      type: Object,
      default: {} as Product,
    },
  },

  computed: {
    fetching() {
      return useProductStore().fetching;
    },
  },
});
</script>
