<template>
  <div class="wallet-form">
    <ul v-if="wallets.length">
      <li v-for="wallet in wallets" :key="wallet.id" class="mb-4">
        <router-link :to="`/customer/wallet/${wallet.id}`" class="w-100">
          <h6 class="title text-capitalize">
            {{ wallet.currency_id }}
            <TextMoney
              :amount="wallet.balance"
              :currency="wallet.currency_id"
              :color="wallet.balance < 0 ? 'danger' : ''"
            />
          </h6>
        </router-link>
      </li>
    </ul>
    <TextEmpty v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useWalletUserStore } from "@/stores/wallet_users";
import TextMoney from "@/components/TextMoney.vue";
import TextEmpty from "@/components/TextEmpty.vue";

export default defineComponent({
  components: { TextMoney, TextEmpty },

  created() {
    useWalletUserStore().fetch();
  },

  computed: {
    wallets() {
      return useWalletUserStore().list;
    },
  },
});
</script>
