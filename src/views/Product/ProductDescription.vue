<template>
  <section class="mt-4 blog-single product-description">
    <div class="row">
      <div class="col-lg-12 col-md-12 col-12">
        <div class="single-inner">
          <div class="post-details">
            <div class="main-content-head" v-if="description">
              <div class="detail-inner pt-5">
                <div :class="[show ? 'show' : 'hidden']" v-html="description"></div>
                <div class="btn-view-plus" v-if="!show">
                  <div class="mark"></div>
                  <button class="btn" @click="show = !show">
                    {{ $t("Views more") }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    description: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      show: false,
    };
  },
});
</script>
