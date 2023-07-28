<template>
  <div class="modal fade review-modal" :id="id" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            {{ title }}
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body scroll-y scroll-tiny">
          <slot name="content"></slot>
        </div>
        <div class="modal-footer border-0" v-if="action">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="$emit('cancel')">
            {{ $t("Cancel") }}
          </button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="$emit('accept')">
            {{ $t("Accept") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: "",
    },
    action: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
