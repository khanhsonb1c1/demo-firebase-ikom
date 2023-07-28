<template>
  <div class="brands">
    <div class="container">
      <div class="row">
        <div class="col-lg-6 offset-lg-3 col-md-12 col-12">
          <h2 class="title">{{ $t("Popular brands") }}</h2>
        </div>
      </div>
      <div class="brands-logo-wrapper">
        <div class="brands-logo-carousel d-flex align-items-center justify-content-between">
          <div class="brand-logo">
            <img src="https://via.placeholder.com/220x160" alt="#" />
          </div>
          <div class="brand-logo">
            <img src="https://via.placeholder.com/220x160" alt="#" />
          </div>
          <div class="brand-logo">
            <img src="https://via.placeholder.com/220x160" alt="#" />
          </div>
          <div class="brand-logo">
            <img src="https://via.placeholder.com/220x160" alt="#" />
          </div>
          <div class="brand-logo">
            <img src="https://via.placeholder.com/220x160" alt="#" />
          </div>
          <div class="brand-logo">
            <img src="https://via.placeholder.com/220x160" alt="#" />
          </div>
          <div class="brand-logo">
            <img src="https://via.placeholder.com/220x160" alt="#" />
          </div>
          <div class="brand-logo">
            <img src="https://via.placeholder.com/220x160" alt="#" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "brands-component",
});
</script>
