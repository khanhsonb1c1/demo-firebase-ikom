<template>
  <div class="w-100 date-picker">
    <div class="date-picker-label" v-if="!date_picker_only">
      <text-date-time :timestamp="toTimeStamp(range_dates?.start)" :dateOnly="true" />
      <span class="ms-1 me-1">-</span>
      <text-date-time :timestamp="toTimeStamp(range_dates?.end)" :dateOnly="true" />
    </div>
    <div class="date-picker-icon lni lni-calendar fs-5" @click="is_show = true">
      <div class="date-picker-table" v-show="is_show">
        <DatePicker v-model="range_dates" :model-config="modelConfig" :isRange="true" :locale="locale"> </DatePicker>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { DatePicker } from "v-calendar";
import { getActiveLocale } from "@/i18n/translation";
import TextDateTime from "./TextDateTime.vue";
import "v-calendar/dist/style.css";

export default defineComponent({
  created() {
    // event click outside
    window.addEventListener("click", (e) => {
      if (!this.$el.contains(e.target)) {
        this.is_show = false;
      }
    });
  },
  components: {
    DatePicker,
    TextDateTime,
  },
  props: {
    date_picker_only: {
      type: Boolean,
      default: false,
    },
    date_time: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      modelConfig: {
        type: "number",
      },
      range_dates: {
        start: "",
        end: "",
      },
      is_show: false,
    };
  },

  computed: {
    locale() {
      return { id: getActiveLocale() };
    },
  },

  watch: {
    range_dates() {
      if (this.range_dates?.start && this.range_dates?.end) {
        const time = `${this.toTimeStamp(this.range_dates.start)},${this.toTimeStamp(this.range_dates.end)}`;
        this.$emit("update:date_time", time);
      }
    },
    date_time() {
      if (!this.date_time) {
        this.range_dates = {
          start: "",
          end: "",
        };
      }
    },
  },

  methods: {
    toTimeStamp(value: string) {
      const datum = Date.parse(value);
      return datum / 1000;
    },
  },
});
</script>
