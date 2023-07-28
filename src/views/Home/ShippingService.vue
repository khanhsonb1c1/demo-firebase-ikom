<template>
  <section class="shipping-info">
    <div class="container">
      <ul>
        <!-- Free Shipping -->
        <li>
          <div class="media-icon">
            <i class="lni lni-delivery"></i>
          </div>
          <div class="media-body">
            <h5>{{ $t("Free shipping") }}.</h5>
            <span>{{ $t("On order over") }} ￥99</span>
          </div>
        </li>
        <!-- Money Return -->
        <li>
          <div class="media-icon">
            <i class="lni lni-support"></i>
          </div>
          <div class="media-body">
            <h5>{{ $t("24/7 Support") }}.</h5>
            <span>{{ $t("Support live and online") }},...</span>
          </div>
        </li>
        <!-- Support 24/7 -->
        <li>
          <div class="media-icon">
            <i class="lni lni-credit-cards"></i>
          </div>
          <div class="media-body">
            <h5>{{ $t("Online payment") }}.</h5>
            <span>{{ $t("Secure payment services") }}</span>
          </div>
        </li>
        <!-- Safe Payment -->
        <li>
          <div class="media-icon">
            <i class="lni lni-reload"></i>
          </div>
          <div class="media-body">
            <h5>{{ $t("Easy return") }}.</h5>
            <span>{{ $t("Hassle free shopping") }}</span>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>
