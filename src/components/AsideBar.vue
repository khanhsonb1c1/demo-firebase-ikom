<template>
  <div class="aside-bar">
    <div class="collapse navbar-collapse sub-menu-bar" id="asideBar">
      <slot></slot>
    </div>
  </div>
  <div class="d-none d-lg-block">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, type Component } from "vue";
import { useAppConfig } from "@/stores/app_config";
import IconListVue from "./IconList.vue";

export default defineComponent({
  props: {
    button: {
      type: Object as () => Component,
      required: true,
      default: IconListVue,
    },
  },
  created() {
    useAppConfig().aside_bar_btn = this.button as () => Component;
  },
  beforeMount() {
    useAppConfig().aside_bar_exist = true;
  },
  beforeUnmount() {
    useAppConfig().aside_bar_exist = false;
  },
});
</script>
