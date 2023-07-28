import { shipment_methods } from "@/services/warehouse";
import type ShipmentMethod from "@/types/ShipmentMethods";
import { defineStore } from "pinia";

export const useShipmentMethodStore = defineStore({
  id: "shipment_method",
  state: () => ({
    list: [] as Array<ShipmentMethod>,
    fetching: false,
  }),

  actions: {
    fetch() {
      return new Promise((resolve, reject) => {
        this.fetching = true;
        shipment_methods
          .all()
          .then(({ data }) => {
            this.fetching = false;
            this.list = data;
            resolve(data);
          })
          .catch((error) => {
            this.fetching = false;
            reject(error);
          });
      });
    },
  },
});
