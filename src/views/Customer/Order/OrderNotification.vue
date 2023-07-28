<template>
  <div class="mt-3">
    <div class="time-notification">
      <TextDateTime :timestamp="notification?.created_at" :is_compact="true" />
    </div>
    <div>
      <span :class="`${content?.style}`">
        {{ content?.title }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import TextDateTime from "@/components/TextDateTime.vue";
import { useAreaStore } from "@/stores/areas";
import type Area from "@/types/Area";
import type Notification from "@/types/Notification";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    TextDateTime,
  },

  props: {
    notification: {
      type: Object as () => Notification,
    },
  },

  computed: {
    areas() {
      return useAreaStore().list;
    },

    content() {
      const contents = [
        {
          title: `${this.$t("Distributed in warehouse")} ${this.getNameArea(
            this.notification?.content?.distributed?.area_id
          )}`,
          condition: !!this.notification?.content?.distributed,
          style: "text-dark",
        },
        {
          title: `${this.$t("Shipping goods from")} ${this.getNameArea(
            this.notification?.content?.pick_in_container?.from_area_id
          )} ${this.$t("To warehouse")} ${this.getNameArea(this.notification?.content?.pick_in_container?.to_area_id)}`,
          condition: !!this.notification?.content?.pick_in_container,
          style: "text-dark",
        },
        {
          title: `${this.$t("Received goods in")} ${this.getNameArea(
            this.notification?.content?.pick_out_container?.area_id
          )}`,
          condition: !!this.notification?.content?.pick_out_container,
          style: "text-dark",
        },
        {
          title: `${this.$t("Delivered to a shipping partner")}`,
          condition: !!this.notification?.content?.shipping,
          style: "text-dark",
        },
        {
          title: `${this.$t("Cancel distributed")}`,
          condition: !!this.notification?.content?.cancel_distributed,
          style: "text-danger",
        },
        {
          title: `${this.$t("Received")}`,
          condition: !!this.notification?.content?.received,
          style: "text-success",
        },
        {
          title: `${this.$t("Refunded")}`,
          condition: !!this.notification?.content?.refunded,
          style: "text-danger",
        },
        {
          title: `${this.$t("Cancelled")}`,
          condition: !!this.notification?.content?.cancelled,
          style: "text-danger",
        },
      ];

      let content = contents.find((item) => {
        return item.condition;
      });

      if (!content) {
        content = {
          title: this.$t("Undefined"),
          condition: true,
          style: "fst-italic",
        };
      }

      return content;
    },
  },

  methods: {
    getNameArea(id_area?: string) {
      const area = this.areas.find((item) => {
        return item.id === id_area;
      }) as Area;
      return area ? area.name : id_area;
    },
  },
});
</script>
