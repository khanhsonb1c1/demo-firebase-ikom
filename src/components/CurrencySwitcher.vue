<template>
  <div class="select-position">
    <select id="select4" v-model="currency">
      <option :value="currency.id" v-for="currency in currencies" :key="currency.id">
        {{ currency.symbol }} {{ currency.id }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { useExchangeRate } from "@/stores/exchange_rates";
import { defineComponent } from "vue";
import { useCurrencyStore } from "../stores/currencies";

export default defineComponent({
  data() {
    return {
      currency: "",
    };
  },

  computed: {
    currencies() {
      return useCurrencyStore().list;
    },
  },

  created() {
    if (localStorage.getItem("currency")) {
      this.currency = JSON.parse(String(localStorage.getItem("currency")));
    } else {
      this.currency = import.meta.env.VITE_APP_CURRENCY_DEFAULT;
      localStorage.setItem("currency", JSON.stringify(import.meta.env.VITE_APP_CURRENCY_DEFAULT));
    }
  },

  watch: {
    currency() {
      useExchangeRate().selected_currency = this.currency;
      useExchangeRate().fetch("JPY", this.currency);
      localStorage.setItem("currency", JSON.stringify(this.currency));
    },
  },
});
</script>
