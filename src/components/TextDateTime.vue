<template>
  <span>{{ formatTime }}</span>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    timestamp: {
      type: Number,
      required: false,
    },
    dateOnly: {
      type: Boolean,
    },
    is_compact: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    formatTime() {
      if (!this.timestamp) {
        return "...";
      }
      const dateOptions = {
        year: this.is_compact ? "2-digit" : "numeric",
        month: "numeric",
        day: "numeric",
      } as Intl.DateTimeFormatOptions;

      let seccond_option = { second: "numeric" } as object;

      this.is_compact && (seccond_option = {});

      const dateTimeOptions = {
        ...dateOptions,
        hour: "numeric",
        minute: "numeric",
        ...seccond_option,
      } as Intl.DateTimeFormatOptions;
      const intlDate = new Intl.DateTimeFormat("en-GB", this.dateOnly ? dateOptions : dateTimeOptions);
      // Timestamp format
      return intlDate.format(new Date(1000 * this.timestamp));
    },
  },
});
</script>
