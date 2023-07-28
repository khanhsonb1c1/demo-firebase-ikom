<template>
  <span :class="`badge bg-${color}`">{{ status.name }}</span>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    status: {
      type: Object,
      required: true,
    },
  },
  computed: {
    color() {
      switch (this.status.id) {
        case "ReceivedAtWarehouse":
          return "primary";
        case "WaitingToReceive":
          return "info";
        case "Newish":
        case "Pending":
          return "secondary";
        case "Paid":
        case "Finish":
          return "success";
        case "OutOfStock":
        case "Cancelled":
          return "danger";
        default:
          return "warning";
      }
    },
  },
});
</script>
