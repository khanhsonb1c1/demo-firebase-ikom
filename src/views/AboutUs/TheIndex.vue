<template>
  <section class="about-us section">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-6 col-md-12 col-12">
          <div class="content-left">
            <img src="https://via.placeholder.com/540x420" alt="#" />
            <a
              href="https://www.youtube.com/watch?v=r44RKWyfcFw&fbclid=IwAR21beSJORalzmzokxDRcGfkZA1AtRTE__l5N4r09HcGS5Y6vOluyouM9EM"
              class="glightbox video"
              ><i class="lni lni-play"></i
            ></a>
          </div>
        </div>
        <div class="col-lg-6 col-md-12 col-12">
          <!-- content-1 start -->
          <div class="content-right">
            <h2>ShopGrids - {{ $t("Your trusted partner") }}.</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam id purus at risus pellentesque faucibus a
              quis eros. In eu fermentum leo. Integer ut eros lacus. Proin ut accumsan leo. Morbi vitae est eget dolor
              consequat aliquam eget quis dolor. Mauris rutrum fermentum erat, at euismod lorem pharetra nec. Duis erat
              lectus, ultrices euismod sagittis.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eius mod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi aliquip ex ea
              commodo consequat.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- End About Area -->

  <!-- Start Team Area -->
  <section class="team section">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="section-title">
            <h2 class="wow fadeInUp" data-wow-delay=".4s">{{ $t("Our team") }}</h2>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-3 col-md-6 col-12" v-for="(item, index) in list" :key="index">
          <div class="single-team">
            <div class="image">
              <img :src="item.avatar" alt="#" />
            </div>
            <div class="content">
              <div class="info">
                <h3>{{ item.name }}</h3>
                <h5>{{ item.position }}</h5>
                <ul class="social">
                  <li>
                    <a href="javascript:void(0)"><i class="lni lni-facebook-filled"></i></a>
                  </li>
                  <li>
                    <a href="javascript:void(0)"><i class="lni lni-twitter-original"></i></a>
                  </li>
                  <li>
                    <a href="javascript:void(0)"><i class="lni lni-skype"></i></a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      list: [
        {
          name: "Grace Wright",
          position: "Founder, CEO",
          avatar: "https://via.placeholder.com/300x300",
        },
        {
          name: "Taylor Jackson",
          position: "Financial Director",
          avatar: "https://via.placeholder.com/300x300",
        },
        {
          name: "Quinton Cross",
          position: "Marketing Director",
          avatar: "https://via.placeholder.com/300x300",
        },
        {
          name: "Liana Mullen",
          position: "Lead Designer",
          avatar: "https://via.placeholder.com/300x300",
        },
      ],
    };
  },
});
</script>
