import { defineStore } from "pinia";
import type { Component } from "vue";

export const useAppConfig = defineStore({
  id: "app_config",
  state: () => ({
    aside_bar_exist: false,
    aside_bar_btn: {} as Component,
  }),
});
