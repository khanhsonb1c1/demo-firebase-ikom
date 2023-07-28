import { getAmoutWithConditions } from "@/services/helper";
import { defineStore } from "pinia";

export const useExchangeRate = defineStore({
  id: "exchange_rate",
  state: () => ({
    rate: 1 as number,
    fetching: false,
    selected_currency: "",
  }),

  actions: {
    fetch(from_currency: string, to_currency: string) {
      return new Promise((resolve, reject) => {
        this.fetching = true;
        getAmoutWithConditions({
          include: "timelines.amounts",
          timeline: Math.round(Date.now() / 1000),
          range: 1,
          conditions: {
            type: "exchange-rates",
            from: from_currency,
            to: to_currency,
          },
        })
          .then((res) => {
            this.rate = res.data;
            this.fetching = false;
            resolve(res.data);
          })
          .catch((err) => {
            this.fetching = false;
            reject(err);
          });
      });
    },
  },
});
