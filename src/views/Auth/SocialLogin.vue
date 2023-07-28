<template>
  <div class="social-login">
    <div class="row">
      <div class="col-lg-4 col-md-4 col-12">
        <a class="btn facebook-btn disabled" href="javascript:void(0)"
          ><i class="lni lni-facebook-filled"></i> Facebook</a
        >
      </div>
      <div class="col-lg-4 col-md-4 col-12">
        <a class="btn apple-btn" href="javascript:void(0)" @click="loginByApple()"
          ><i class="lni lni-apple"></i> Apple</a
        >
      </div>
      <div class="col-lg-4 col-md-4 col-12">
        <a class="btn google-btn" href="javascript:void(0)" @click="loginByGoogle()"
          ><i class="lni lni-google"></i> Google</a
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useAuthStore } from "@/stores/auth";

export default defineComponent({
  methods: {
    loginByGoogle() {
      useAuthStore()
        .loginByGoogle()
        .then(() => {
          this.$router.push({ path: "home" });
        })
        .catch((error) => {
          this.$emit("error", error);
        });
    },
    loginByApple() {
      useAuthStore()
        .loginByApple()
        .then(() => {
          this.$router.push({ path: "home" });
        })
        .catch((error) => {
          this.$emit("error", error);
        });
    },
  },
});
</script>
