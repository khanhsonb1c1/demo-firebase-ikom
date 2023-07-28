<template>
  <!-- Start Contact Area -->
  <section class="product-grids section">
    <div class="container">
      <div class="contact-head">
        <div class="contact-info">
          <div class="row">
            <div class="col-lg-3 col-md-12 col-12">
              <AsideBar>
                <!-- navbar collapse -->
                <ul class="nav-customer list-group w-100 mb-4">
                  <router-link to="/customer/user-info">
                    <li :class="navItemClass('user-info')">
                      <i class="lni lni-user"></i>
                      <span class="mx-3">User info</span>
                    </li>
                  </router-link>
                  <router-link to="/customer/address">
                    <li :class="navItemClass('address')">
                      <i class="lni lni-map"></i>
                      <span class="mx-3">Address</span>
                      <TheLoading v-if="addresses_fetching" />
                    </li>
                  </router-link>
                  <router-link to="/customer/orders">
                    <li :class="navItemClass('orders')">
                      <i class="lni lni-files"></i>
                      <span class="mx-3">Orders</span>
                      <TheLoading v-if="orders_fetching" />
                    </li>
                  </router-link>
                  <router-link to="/customer/wallet">
                    <li :class="navItemClass('wallet')">
                      <i class="lni lni-wallet"></i>
                      <span class="mx-3">Wallet</span>
                      <TheLoading v-if="wallets_fetching" />
                    </li>
                  </router-link>
                </ul>
              </AsideBar>
            </div>
            <div class="col-lg-9 col-md-12 col-12">
              <router-view></router-view>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!--/ End Contact Area -->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TheLoading from "@/components/TheLoading.vue";
import { useAddressStore } from "@/stores/addresses";
import { useOrderStore } from "@/stores/orders";
import { useStatusStore } from "@/stores/statuses";
import AsideBar from "@/components/AsideBar.vue";
import { useWalletUserStore } from "@/stores/wallet_users";
import { useAreaStore } from "@/stores/areas";

export default defineComponent({
  components: {
    TheLoading,
    AsideBar,
  },

  computed: {
    addresses_fetching() {
      return useAddressStore().fetching;
    },
    orders_fetching() {
      return useOrderStore().fetching;
    },
    wallets_fetching() {
      return useWalletUserStore().fetching;
    },
  },

  created() {
    useStatusStore().fetch();
    useAreaStore().fetch();
  },

  methods: {
    navItemClass(route: string) {
      return "list-group-item p-4 " + (this.$route.path.search(route) >= 0 ? "active" : "");
    },
  },
});
</script>

<style scoped>
.nav-customer.list-group .list-group-item i {
  font-size: 20px;
}
</style>
