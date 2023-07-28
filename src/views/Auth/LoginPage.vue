<template>
  <!-- Start Account Login Area -->
  <div class="account-login section">
    <div class="container">
      <div class="row">
        <div class="col-lg-6 offset-lg-3 col-md-10 offset-md-1 col-12">
          <div class="card login-form">
            <div class="card-body">
              <div class="title">
                <h3>{{ $t("Login") }}</h3>
                <p>{{ $t("You can login using your social media account or email address") }}.</p>
              </div>
              <SocialLogin @error="error = $event.message" />
              <div class="alt-option">
                <span>{{ $t("Or") }}</span>
              </div>
              <TheAlert v-if="error" :message="error" color="danger" />
              <div class="form-group input-group">
                <label for="reg-fn">Email</label>
                <input class="form-control" type="email" id="reg-email" required v-model="email" />
              </div>
              <div class="form-group input-group">
                <label for="reg-fn">{{ $t("Password") }}</label>
                <input class="form-control" type="password" id="reg-pass" required v-model="password" />
              </div>
              <div class="d-flex flex-wrap justify-content-between bottom-content">
                <div class="form-check">
                  <input type="checkbox" class="form-check-input width-auto" id="exampleCheck1" />
                  <label class="form-check-label">{{ $t("Remember me") }}</label>
                </div>
                <router-link class="lost-pass" to="forget-password">{{ $t("Forgot password") }}?</router-link>
              </div>
              <div class="button">
                <button class="btn" @click="loginByEmail()">
                  {{ $t("Login") }}
                </button>
              </div>
              <p class="outer-link">
                {{ $t("Don't have an account") }}?
                <router-link to="register">{{ $t("Register here") }}</router-link>
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
import TheAlert from "@/components/TheAlert.vue";
import SocialLogin from "./SocialLogin.vue";
</script>

<script lang="ts">
import { defineComponent } from "vue";
import { useAuthStore } from "@/stores/auth";

export default defineComponent({
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    loginByEmail() {
      useAuthStore()
        .loginByEmail(this.email, this.password)
        .then(() => {
          this.$router.push({ path: "home" });
        })
        .catch((error) => {
          this.error = error.message;
        });
    },
  },
});
</script>
