<template>
  <!-- Start Account Login Area -->
  <div class="account-login section">
    <div class="container">
      <div class="row">
        <div class="col-lg-6 offset-lg-3 col-md-10 offset-md-1 col-12">
          <div class="card login-form">
            <div class="card-body">
              <div class="title">
                <h3>{{ $t("Register") }}</h3>
                <p>{{ $t("You can register using your social media account") }}.</p>
              </div>
              <SocialLogin @error="error = $event.message" />
              <TheAlert v-if="error" :message="error" color="danger" />
              <p class="outer-link">
                {{ $t("Or") }}
                <router-link to="login">{{ $t("Login here") }}</router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- End Account Login Area -->
</template>

<script setup lang="ts">
import SocialLogin from "./SocialLogin.vue";
import TheAlert from "@/components/TheAlert.vue";
</script>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      error: "",
    };
  },
});
</script>
