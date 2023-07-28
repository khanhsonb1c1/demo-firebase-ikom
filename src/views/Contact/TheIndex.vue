<template>
  <section id="contact-us" class="contact-us section">
    <div class="container">
      <div class="contact-head">
        <div class="row">
          <div class="col-12">
            <div class="section-title">
              <h2>{{ $t("Contact us") }}</h2>
            </div>
          </div>
        </div>
        <div class="contact-info">
          <div class="row">
            <div class="col-lg-4 col-md-12 col-12">
              <div class="single-info-head">
                <!-- Start Single Info -->
                <div class="single-info">
                  <i class="lni lni-map"></i>
                  <h3>{{ $t("Address") }}</h3>
                  <ul>
                    <li>
                      15 Bùi Kỷ, Khuê Trung, Cẩm Lệ,<br />
                      Đà Nẵng, Việt Nam.
                    </li>
                  </ul>
                </div>
                <!-- End Single Info -->
                <!-- Start Single Info -->
                <div class="single-info">
                  <i class="lni lni-phone"></i>
                  <h3>{{ $t("Phone") }}</h3>
                  <ul>
                    <li v-for="(phone_number, index) in phone_numbers" :key="index" @click="handleCoppy(phone_number)">
                      <a href="#">{{ phone_number.content }}</a>
                      <TheAlert :message="$t('Coppied')" color="success" v-if="phone_number.is_coppied" />
                    </li>
                  </ul>
                </div>
                <!-- End Single Info -->
                <!-- Start Single Info -->
                <div class="single-info">
                  <i class="lni lni-envelope"></i>
                  <h3>{{ $t("Email") }}</h3>
                  <ul>
                    <li @click="handleCoppy(email)">
                      <a href="#">{{ email.content }}</a>
                      <TheAlert :message="$t('Coppied')" color="success" v-if="email.is_coppied" />
                    </li>
                  </ul>
                </div>
                <!-- End Single Info -->
                <div class="single-info">
                  <a :href="facebook_url">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="48" height="48" viewBox="0 0 48 48">
                      <linearGradient
                        id="Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1"
                        x1="9.993"
                        x2="40.615"
                        y1="9.993"
                        y2="40.615"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0" stop-color="#2aa4f4"></stop>
                        <stop offset="1" stop-color="#007ad9"></stop>
                      </linearGradient>
                      <path
                        fill="url(#Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1)"
                        d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"
                      ></path>
                      <path
                        fill="#fff"
                        d="M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z"
                      ></path>
                    </svg>
                  </a>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    @click="handleCoppy(viber_phone_number)"
                  >
                    <linearGradient
                      id="kVR4WAMiBT-ffYOHy6lJja_COxxOBCCKtwj_gr1"
                      x1="14.111"
                      x2="34.153"
                      y1="-5.971"
                      y2="51.731"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0" stop-color="#fcfcfc"></stop>
                      <stop offset=".495" stop-color="#f4f4f4"></stop>
                      <stop offset=".946" stop-color="#e8e8e8"></stop>
                      <stop offset="1" stop-color="#e8e8e8"></stop>
                    </linearGradient>
                    <path
                      fill="url(#kVR4WAMiBT-ffYOHy6lJja_COxxOBCCKtwj_gr1)"
                      d="M24,5C21.361,5,13.33,5,8.89,9.054	C6.246,11.688,5,15.494,5,21v3c0,5.506,1.246,9.312,3.921,11.976c1.332,1.215,3.148,2.186,5.368,2.857L15,39.047v5.328	C15,45,15.181,45,15.241,45c0.123,0,0.32-0.039,0.694-0.371c0.09-0.089,0.75-0.803,3.96-4.399l0.324-0.363l0.485,0.031	C21.779,39.965,22.888,40,24,40c2.639,0,10.67,0,15.11-4.055C41.753,33.311,43,29.505,43,24v-3c0-5.506-1.246-9.312-3.921-11.976	C34.67,5,26.639,5,24,5z"
                    ></path>
                    <linearGradient
                      id="kVR4WAMiBT-ffYOHy6lJjb_COxxOBCCKtwj_gr2"
                      x1="42.608"
                      x2="2.522"
                      y1="48.397"
                      y2="-7.263"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0" stop-color="#912fbd"></stop>
                      <stop offset="1" stop-color="#9332bf"></stop>
                    </linearGradient>
                    <path
                      fill="url(#kVR4WAMiBT-ffYOHy6lJjb_COxxOBCCKtwj_gr2)"
                      d="M33.451,28.854	c-1.111-0.936-1.624-1.219-3.158-2.14C29.654,26.331,28.68,26,28.169,26c-0.349,0-0.767,0.267-1.023,0.523	C26.49,27.179,26.275,28,25.125,28c-1.125,0-3.09-1.145-4.5-2.625C19.145,23.965,18,22,18,20.875c0-1.15,0.806-1.38,1.462-2.037	C19.718,18.583,20,18.165,20,17.816c0-0.511-0.331-1.47-0.714-2.109c-0.921-1.535-1.203-2.048-2.14-3.158	c-0.317-0.376-0.678-0.548-1.056-0.549c-0.639-0.001-1.478,0.316-2.046,0.739c-0.854,0.637-1.747,1.504-1.986,2.584	c-0.032,0.147-0.051,0.295-0.057,0.443c-0.046,1.125,0.396,2.267,0.873,3.234c1.123,2.279,2.609,4.485,4.226,6.455	c0.517,0.63,1.08,1.216,1.663,1.782c0.566,0.582,1.152,1.145,1.782,1.663c1.97,1.617,4.176,3.103,6.455,4.226	c0.958,0.472,2.086,0.906,3.2,0.874c0.159-0.005,0.318-0.023,0.477-0.058c1.08-0.238,1.947-1.132,2.584-1.986	c0.423-0.568,0.74-1.406,0.739-2.046C33.999,29.532,33.827,29.171,33.451,28.854z M34,24c-0.552,0-1-0.448-1-1v-1	c0-4.962-4.038-9-9-9c-0.552,0-1-0.448-1-1s0.448-1,1-1c6.065,0,11,4.935,11,11v1C35,23.552,34.552,24,34,24z M27.858,22	c-0.444,0-0.85-0.298-0.967-0.748c-0.274-1.051-1.094-1.872-2.141-2.142c-0.535-0.139-0.856-0.684-0.718-1.219	c0.138-0.534,0.682-0.855,1.219-0.718c1.748,0.453,3.118,1.822,3.575,3.574c0.139,0.535-0.181,1.08-0.715,1.22	C28.026,21.989,27.941,22,27.858,22z M31,23c-0.552,0-1-0.448-1-1c0-3.188-2.494-5.818-5.678-5.986	c-0.552-0.029-0.975-0.5-0.946-1.051c0.029-0.552,0.508-0.976,1.051-0.946C28.674,14.241,32,17.748,32,22C32,22.552,31.552,23,31,23	z M24,4C19.5,4,12.488,4.414,8.216,8.316C5.196,11.323,4,15.541,4,21c0,0.452-0.002,0.956,0.002,1.5C3.998,23.043,4,23.547,4,23.999	c0,5.459,1.196,9.677,4.216,12.684c1.626,1.485,3.654,2.462,5.784,3.106v4.586C14,45.971,15.049,46,15.241,46h0.009	c0.494-0.002,0.921-0.244,1.349-0.624c0.161-0.143,2.02-2.215,4.042-4.481C21.845,40.972,22.989,41,23.999,41l0,0l0,0	c4.5,0,11.511-0.415,15.784-4.317c3.019-3.006,4.216-7.225,4.216-12.684c0-0.452,0.002-0.956-0.002-1.5	c0.004-0.544,0.002-1.047,0.002-1.5c0-5.459-1.196-9.677-4.216-12.684C35.511,4.414,28.5,4,24,4z M41,23.651v0.348	c0,4.906-1.045,8.249-3.286,10.512C33.832,38,26.437,38,23.999,38c-0.742,0-1.946-0.001-3.367-0.1	C20.237,38.344,16,43.083,16,43.083V37.22c-2.104-0.505-4.183-1.333-5.714-2.708C8.045,32.248,7,28.905,7,23.999v-0.348	c0-0.351-0.001-0.73,0.002-1.173C6.999,22.078,6.999,21.7,7,21.348V21c0-4.906,1.045-8.249,3.286-10.512	C14.167,6.999,21.563,6.999,24,6.999s9.832,0,13.713,3.489c2.242,2.263,3.286,5.606,3.286,10.512v0.348	c0,0.351,0.001,0.73-0.002,1.173C41,22.922,41,23.3,41,23.651z"
                    ></path>
                  </svg>
                  <a :href="zalo_url">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="48" height="48" viewBox="0 0 48 48">
                      <path
                        fill="#2962ff"
                        d="M15,36V6.827l-1.211-0.811C8.64,8.083,5,13.112,5,19v10c0,7.732,6.268,14,14,14h10	c4.722,0,8.883-2.348,11.417-5.931V36H15z"
                      ></path>
                      <path
                        fill="#eee"
                        d="M29,5H19c-1.845,0-3.601,0.366-5.214,1.014C10.453,9.25,8,14.528,8,19	c0,6.771,0.936,10.735,3.712,14.607c0.216,0.301,0.357,0.653,0.376,1.022c0.043,0.835-0.129,2.365-1.634,3.742	c-0.162,0.148-0.059,0.419,0.16,0.428c0.942,0.041,2.843-0.014,4.797-0.877c0.557-0.246,1.191-0.203,1.729,0.083	C20.453,39.764,24.333,40,28,40c4.676,0,9.339-1.04,12.417-2.916C42.038,34.799,43,32.014,43,29V19C43,11.268,36.732,5,29,5z"
                      ></path>
                      <path
                        fill="#2962ff"
                        d="M36.75,27C34.683,27,33,25.317,33,23.25s1.683-3.75,3.75-3.75s3.75,1.683,3.75,3.75	S38.817,27,36.75,27z M36.75,21c-1.24,0-2.25,1.01-2.25,2.25s1.01,2.25,2.25,2.25S39,24.49,39,23.25S37.99,21,36.75,21z"
                      ></path>
                      <path fill="#2962ff" d="M31.5,27h-1c-0.276,0-0.5-0.224-0.5-0.5V18h1.5V27z"></path>
                      <path
                        fill="#2962ff"
                        d="M27,19.75v0.519c-0.629-0.476-1.403-0.769-2.25-0.769c-2.067,0-3.75,1.683-3.75,3.75	S22.683,27,24.75,27c0.847,0,1.621-0.293,2.25-0.769V26.5c0,0.276,0.224,0.5,0.5,0.5h1v-7.25H27z M24.75,25.5	c-1.24,0-2.25-1.01-2.25-2.25S23.51,21,24.75,21S27,22.01,27,23.25S25.99,25.5,24.75,25.5z"
                      ></path>
                      <path
                        fill="#2962ff"
                        d="M21.25,18h-8v1.5h5.321L13,26h0.026c-0.163,0.211-0.276,0.463-0.276,0.75V27h7.5	c0.276,0,0.5-0.224,0.5-0.5v-1h-5.321L21,19h-0.026c0.163-0.211,0.276-0.463,0.276-0.75V18z"
                      ></path>
                    </svg>
                  </a>
                </div>
                <TheAlert :message="$t('Coppied')" color="success" v-if="viber_phone_number.is_coppied" />
              </div>
            </div>
            <div class="col-lg-8 col-md-12 col-12">
              <div class="contact-form-head">
                <div class="form-main">
                  <form class="form" method="post" @submit.prevent="">
                    <div class="row">
                      <div class="col-lg-6 col-md-6 col-12">
                        <div class="form-group">
                          <input name="name" type="text" :placeholder="$t('Your name')" />
                        </div>
                      </div>
                      <div class="col-lg-6 col-md-6 col-12">
                        <div class="form-group">
                          <input name="phone" type="text" :placeholder="$t('Phone')" />
                        </div>
                      </div>
                      <div class="col-lg-12 col-md-6 col-12">
                        <div class="form-group">
                          <input name="subject" type="text" :placeholder="$t('Title')" />
                        </div>
                      </div>
                      <div class="col-lg-12 col-md-6 col-12">
                        <div class="form-group">
                          <input name="email" type="email" :placeholder="$t('Your email')" />
                        </div>
                      </div>
                      <div class="col-12">
                        <div class="form-group message">
                          <textarea name="message" :placeholder="$t('Content')"></textarea>
                        </div>
                      </div>
                      <div class="col-12">
                        <div class="form-group button">
                          <button type="submit" class="btn disabled">
                            {{ $t("Submit") }}
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
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
import TheAlert from "@/components/TheAlert.vue";

export default defineComponent({
  components: { TheAlert },
  data() {
    return {
      facebook_url: import.meta.env.VITE_APP_FACEBOOK_URL,
      zalo_url: import.meta.env.VITE_APP_ZALO_ID,
      viber_phone_number: {
        content: import.meta.env.VITE_APP_VIBER_PHONE_NUMBER,
        is_coppied: false,
      },
      phone_numbers: [
        { content: "+1 800 555 44 00 (Toll free)", is_coppied: false },
        { content: "+321 55 666 7890", is_coppied: false },
      ],
      email: {
        content: "support@shopgrids.com",
        is_coppied: false,
      },
    };
  },

  methods: {
    handleCoppy(obj: { content: string; is_coppied: boolean }) {
      navigator.clipboard.writeText(obj.content);
      obj.is_coppied = true;
      setTimeout(() => {
        obj.is_coppied = false;
      }, 1000);
    },
  },
});
</script>
