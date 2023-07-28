<template>
  <select @change="switchLanguage()" v-model="selected">
    <option v-for="locale in locales" :key="locale.id" :value="locale.id" :selected="locale.id === active">
      {{ locale.name }}
    </option>
  </select>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { locales, getActiveLocale, setRememberLocale } from "../i18n/translation";

export default defineComponent({
  data() {
    return {
      selected: getActiveLocale() as string,
    };
  },
  computed: {
    locales() {
      return locales;
    },
    active() {
      return getActiveLocale();
    },
  },
  methods: {
    switchLanguage() {
      setRememberLocale(this.selected);
      window.location.reload();
    },
  },
});
</script>
