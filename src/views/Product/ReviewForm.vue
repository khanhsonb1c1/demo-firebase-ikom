<template>
  <div
    class="modal fade review-modal"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            {{ $t("Leave a review") }}
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-12">
              <div class="form-group">
                <label for="review-rating">{{ $t("Rating") }}</label>
                <select class="form-control" id="review-rating" v-model="star">
                  <option :value="number" v-for="number in 5" :key="number">{{ number }} {{ $t("Star") }}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="review-message">{{ $t("Review") }}</label>
            <textarea class="form-control" id="review-message" rows="8" required v-model="comment"></textarea>
          </div>
        </div>
        <div class="modal-footer button">
          <button type="button" class="btn" @click="create()" data-bs-dismiss="modal">
            {{ $t("Submit review") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reviews } from "@/services/product";
import { useProductStore } from "@/stores/products";
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    id: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      comment: "",
      star: 5,
    };
  },

  methods: {
    create() {
      return new Promise(() => {
        reviews
          .create({ ...this.$data, product_id: this.id })
          .then(() => {
            useProductStore().get(this.id);
            this.comment = "";
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
  },
});
</script>
