<template>
  <header class="header navbar-area">
    <div class="topbar">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-6 scroll-x scroll-hidden">
            <div class="top-left">
              <ul class="menu-top-link">
                <li>
                  <CurrencySwitcher />
                </li>
                <li>
                  <div class="select-position">
                    <LanguageSwitcher />
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-6 scroll-x scroll-hidden">
            <div class="top-end">
              <ul v-if="authenticated" class="user-login">
                <li>
                  <router-link class="navbar-brand" to="/customer">
                    <i class="lni lni-user"></i>
                    {{ me?.displayName }}
                  </router-link>
                </li>
                <li>
                  <a class="navbar-brand" href="#" @click="logout()">
                    {{ $t("Logout") }}
                    <i class="lni lni-arrow-right"></i>
                  </a>
                </li>
              </ul>
              <ul v-else class="user-login">
                <li>
                  <router-link class="navbar-brand" to="/login">
                    {{ $t("Sign in") }}
                  </router-link>
                </li>
                <li>
                  <router-link class="navbar-brand" to="/register">
                    {{ $t("Register") }}
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="header-middle">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-3 col-md-3 col-7">
            <router-link class="navbar-brand" to="/home">
              <img src="../../../public/images/logo/logo-header.png" alt="ikom" />
            </router-link>
          </div>
          <div class="col-lg-5 col-md-7 d-xs-none">
            <!-- Start Main Menu Search -->
            <SearchBox />
          </div>
          <div class="col-lg-4 col-md-2 col-5">
            <div class="middle-right-area">
              <div class="nav-hotline">
                <i class="lni lni-phone"></i>
                <h3>
                  Hotline:
                  <span>(+100) 123 456 7890</span>
                </h3>
              </div>
              <div class="navbar-cart">
                <MiniWishlist />
                <MiniCart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-8 col-md-6 col-12">
          <div class="nav-inner">
            <div class="mega-category-menu">
              <span class="cat-button"><i class="lni lni-menu"></i>{{ $t("All categories") }}</span>
              <ul class="sub-category">
                <li v-for="(item, index) in category_list" :key="index">
                  <router-link :to="`/products?category=${item.id}`"
                    >{{ item.name }} <i class="lni lni-chevron-right" v-if="item?.children?.length"></i
                  ></router-link>
                  <ul class="inner-sub-category" v-if="item?.children.length">
                    <li v-for="(item_child, idx) in item?.children" :key="idx">
                      <router-link :to="`/products?category=${item_child.id}`">{{ item_child.name }}</router-link>
                    </li>
                  </ul>
                </li>
                <li class="text-center">
                  <router-link :to="`/products`">
                    {{ $t("Views more") }}
                  </router-link>
                </li>
              </ul>
            </div>
            <nav class="navbar navbar-expand-lg">
              <button
                class="navbar-toggler mobile-menu-btn"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <IconList />
              </button>
              <div class="collapse navbar-collapse sub-menu-bar" id="navbarSupportedContent">
                <ul id="nav" class="navbar-nav ms-auto">
                  <li class="nav-item">
                    <router-link to="/" :class="navItemClass('/', true)">
                      {{ $t("Home") }}
                    </router-link>
                  </li>
                  <li class="nav-item">
                    <router-link to="/products" :class="navItemClass('products')">
                      {{ $t("Product") }}
                    </router-link>
                  </li>

                  <li class="nav-item">
                    <router-link to="/blogs" :class="navItemClass('blog')">
                      {{ $t("Blog") }}
                    </router-link>
                  </li>
                  <li class="nav-item">
                    <router-link to="/policy" :class="navItemClass('policy')">
                      {{ $t("Policy") }}
                    </router-link>
                  </li>
                  <li class="nav-item">
                    <router-link to="/contact-us" :class="navItemClass('contact')">
                      {{ $t("Contact us") }}
                    </router-link>
                  </li>
                  <li class="nav-item">
                    <router-link to="/about-us" :class="navItemClass('about')">
                      {{ $t("About") }}
                    </router-link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
        <div class="col-lg-4 col-md-6 col-12">
          <div class="nav-social d-sm-none d-md-none d-lg-block">
            <h5 class="title">{{ $t("Follow us") }}:</h5>
            <ul class="d-none d-sm-block">
              <li>
                <a href="javascript:void(0)"><i class="lni lni-facebook-filled"></i></a>
              </li>
              <li>
                <a href="javascript:void(0)"><i class="lni lni-twitter-original"></i></a>
              </li>
              <li>
                <a href="javascript:void(0)"><i class="lni lni-instagram"></i></a>
              </li>
              <li>
                <a href="javascript:void(0)"><i class="lni lni-skype"></i></a>
              </li>
            </ul>
          </div>
          <div class="nav-social d-md-block d-lg-none">
            <button
              v-show="aside_bar_exist"
              class="navbar-toggler mobile-menu-btn"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#asideBar"
              aria-controls="asideBar"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <component :is="aside_bar_btn"></component>
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useAuthStore } from "@/stores/auth";
import LanguageSwitcher from "@/components/LanguageSwitcher.vue";
import { useCategoryStore } from "@/stores/categories";
import { mapState } from "pinia";
import SearchBox from "./SearchBox.vue";
import { useAppConfig } from "@/stores/app_config";
import IconList from "@/components/IconList.vue";
import MiniCart from "../Cart/MiniCart.vue";
import CurrencySwitcher from "@/components/CurrencySwitcher.vue";
import { useAddressStore } from "@/stores/addresses";
import MiniWishlist from "../Cart/MiniWishlist.vue";

export default defineComponent({
  components: {
    LanguageSwitcher,
    SearchBox,
    IconList,
    MiniCart,
    CurrencySwitcher,
    MiniWishlist,
  },

  computed: {
    authenticated() {
      return useAuthStore().authenticated;
    },
    me() {
      return useAuthStore().me;
    },
    ...mapState(useAppConfig, {
      aside_bar_exist: "aside_bar_exist",
    }),
    category_list() {
      return useCategoryStore().list.slice(0, 8);
    },
    aside_bar_btn() {
      return useAppConfig().aside_bar_btn;
    },
  },

  methods: {
    logout() {
      useAuthStore()
        .logout()
        .then(() => {
          this.$router.push({ path: "/login" });
          const store = useAddressStore();
          store.$reset();
        });
    },
    navItemClass(route: string, exact = false) {
      if (exact) {
        return this.$route.path == route ? "active" : "";
      }
      return this.$route.path.search(route) >= 0 ? "active" : "";
    },
  },
});
</script>
