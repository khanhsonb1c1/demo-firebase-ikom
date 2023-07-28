<template>
  <!-- Start Footer Area -->
  <footer class="footer">
    <!-- Start Footer Top -->
    <div class="footer-top">
      <div class="container">
        <div class="inner-content">
          <div class="row">
            <div class="col-lg-3 col-md-4 col-12">
              <div class="footer-logo">
                <router-link to="/">
                  <img src="../../../public/images/logo/logo-footer.png" alt="#" />
                  <h3>Ikom</h3>
                </router-link>
              </div>
            </div>
            <div class="col-lg-9 col-md-8 col-12">
              <div class="footer-newsletter">
                <h4 class="title">
                  {{ $t("Subscribe to our newsletter") }}
                  <span>{{ $t("Get all the latest information, sales and offers") }}.</span>
                </h4>
                <div class="newsletter-form-head">
                  <form class="newsletter-form" action="#" method="get" target="_blank" @submit.prevent="">
                    <input :placeholder="`${$t('Email address here')}...`" type="email" />
                    <div class="button">
                      <button class="btn">{{ $t("Subscribe") }}<span class="dir-part"></span></button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End Footer Top -->
    <!-- Start Footer Middle -->
    <div class="footer-middle">
      <div class="container">
        <div class="bottom-inner">
          <div class="row">
            <div class="col-lg-3 col-md-6 col-12">
              <!-- Single Widget -->
              <div class="single-footer f-contact">
                <h3>{{ $t("Contact us") }}</h3>
                <p class="phone">{{ $t("Phone") }}: +1 (900) 33 169 7720</p>
                <ul>
                  <li>
                    <span>{{ $t("Monday-Friday") }}: </span> 9.00 am - 8.00 pm
                  </li>
                  <li>
                    <span>{{ $t("Saturday") }}: </span> 10.00 am - 6.00 pm
                  </li>
                </ul>
                <p class="mail">
                  <a href="#">support@shopgrids.com</a>
                </p>
              </div>
              <!-- End Single Widget -->
            </div>
            <div class="col-lg-3 col-md-6 col-12">
              <!-- Single Widget -->
              <div class="single-footer our-app">
                <h3>{{ $t("Our mobile app") }}</h3>
                <ul class="app-btn">
                  <li>
                    <a href="javascript:void(0)" class="w-100">
                      <i class="lni lni-apple"></i>
                      <span class="small-title">{{ $t("Download on the") }}</span>
                      <span class="big-title">App Store</span>
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0)" class="w-100">
                      <i class="lni lni-play-store"></i>
                      <span class="small-title">{{ $t("Download on the") }}</span>
                      <span class="big-title">Google Play</span>
                    </a>
                  </li>
                </ul>
              </div>
              <!-- End Single Widget -->
            </div>
            <div class="col-lg-3 col-md-6 col-12">
              <!-- Single Widget -->
              <div class="single-footer f-link">
                <h3>{{ $t("Infomation") }}</h3>
                <ul>
                  <li>
                    <a href="javascript:void(0)">{{ $t("About") }}</a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">{{ $t("Contact us") }}</a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">{{ $t("Downloads") }}</a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">{{ $t("Blog") }}</a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">{{ $t("Services") }}</a>
                  </li>
                </ul>
              </div>
              <!-- End Single Widget -->
            </div>
            <div class="col-lg-3 col-md-6 col-12">
              <!-- Single Widget -->
              <div class="single-footer f-link">
                <h3>{{ $t("Category") }}</h3>
                <ul>
                  <li v-for="category in categories" :key="category.id">
                    <router-link :to="`/products?category=${category.id}`">
                      {{ category.name }}
                    </router-link>
                  </li>
                </ul>
              </div>
              <!-- End Single Widget -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End Footer Middle -->
    <!-- Start Footer Bottom -->
    <div class="footer-bottom">
      <div class="container">
        <div class="inner-content">
          <div class="row align-items-center">
            <div class="col-lg-4 col-12">
              <div class="payment-gateway">
                <span>{{ $t("We accept") }}:</span>
                <img src="/images/footer/credit-cards-footer.png" alt="#" />
              </div>
            </div>
            <div class="col-lg-4 col-12">
              <div class="copyright">
                <p>
                  Designed and Developed by<a href="https://graygrids.com/" rel="nofollow" target="_blank">GrayGrids</a>
                </p>
              </div>
            </div>
            <div class="col-lg-4 col-12">
              <ul class="socila">
                <li>
                  <span>{{ $t("Follow us on") }}:</span>
                </li>
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
                  <a href="javascript:void(0)"><i class="lni lni-google"></i></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End Footer Bottom -->
  </footer>
  <!--/ End Footer Area -->
</template>

<script lang="ts">
import { useCategoryStore } from "@/stores/categories";
import { defineComponent } from "vue";

export default defineComponent({
  computed: {
    categories() {
      return useCategoryStore().list.slice(0, 5);
    },
  },
});
</script>
