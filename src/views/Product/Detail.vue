<template>
  <section class="item-details section">
    <div class="container">
      <div class="top-area">
        <div class="row align-items-center">
          <div class="col-lg-6 col-md-12 col-12">
            <div class="product-images">
              <main id="gallery">
                <div class="main-img">
                  <img
                    class="aspect-ratio-4-3"
                    :src="product.image_url || 'https://via.placeholder.com/1000x670'"
                    id="current"
                    alt="#"
                  />
                </div>

                <div class="images scroll-x scroll-hidden">
                  <img
                    v-for="(img, index) in product?.images"
                    :key="index"
                    :src="img.url || 'https://via.placeholder.com/1000x670'"
                    class="img aspect-ratio-4-3"
                    alt="#"
                    @click="handleClick"
                  />
                </div>
              </main>
            </div>
          </div>
          <div class="col-lg-6 col-md-12 col-12">
            <div class="product-info">
              <h2 class="title line-clamp-2">
                {{ product?.name || "..." }}
              </h2>
              <div class="d-flex mb-1">
                <TheStar :star="product?.star" />
                <div class="ms-1">
                  <span>( {{ product?.reviews_count || 0 }} {{ $t("Review") }} )</span>
                </div>
              </div>
              <h3 class="price">
                <TextMoney :amount="product?.price" currency="JPY" />
                <TextMoneyInital :amount="product?.initial_price" currency="JPY" v-if="product?.discount" />
              </h3>
              <p class="info-text">
                {{ product?.ingredients || `${$t("Empty")}` }}
              </p>
              <div class="d-flex mt-1 mb-2 flex-wrap">
                <TagProduct v-for="tag in product?.tags" :key="tag.id" :title="tag.name" />
              </div>

              <div class="row">
                <div class="col-lg-6 col-md-6 col-12">
                  <div class="form-group quantity d-flex">
                    <span class="d-flex align-items-center col-3">{{ $t("Quantity") }}</span>
                    <button class="btn btn-link px-2 ms-4 me-2" @click="decrease">
                      <i class="lni lni-minus"></i>
                    </button>

                    <input
                      id="form1"
                      min="1"
                      name="quantity"
                      type="number"
                      class="form-control form-control-sm"
                      v-model="quantity"
                      onkeypress="return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))"
                    />

                    <button class="btn btn-link px-2 ms-2" @click="increase">
                      <i class="lni lni-plus"></i>
                    </button>
                  </div>
                </div>
                <div class="col-lg-2 col-md-4 col-12"></div>
                <div class="col-lg-4 col-md-4 col-12 d-flex">
                  <div class="wish-button d-flex justify-content-end flex-column">
                    <button :class="[is_in_wish_list ? 'text-danger' : '', 'btn']" @click="handleWishlist()">
                      <i class="lni lni-heart"></i> {{ $t("To wishlist") }}
                    </button>
                  </div>
                </div>
              </div>

              <div class="bottom-content">
                <div class="row align-items-end">
                  <div class="col-lg-6 col-md-6 col-12 mt-2">
                    <div class="cart-button">
                      <button class="btn btn-danger w-100" @click="handleBuyNow">
                        {{ $t("Buy now") }}
                      </button>
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6 col-12 mt-2">
                    <div class="button cart-button">
                      <button class="btn w-100" v-if="show_added">
                        <i class="lni lni-checkmark"></i>
                        {{ $t("Added") }}
                      </button>
                      <button v-else class="btn" style="width: 100%" @click="addProductToCart">
                        {{ $t("Add to cart") }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="product-details-info">
        <ProductInfomation :product="product" />
        <ProductDescription :description="product.description" />
        <ProductReviews :product="product" />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { useProductStore } from "@/stores/products";
import { defineComponent } from "vue";
import ProductReviews from "./ProductReviews.vue";
import TextMoneyInital from "@/components/TextMoneyInital.vue";
import TextMoney from "@/components/TextMoney.vue";
import ProductDescription from "./ProductDescription.vue";
import ProductInfomation from "./ProductInfomation.vue";
import TagProduct from "./TagProduct.vue";
import TheStar from "@/components/TheStar.vue";
import { useCartStore } from "@/stores/cart";
import { useWishlistStore } from "@/stores/wishlist";

export default defineComponent({
  name: "ProductDetail",

  components: {
    ProductReviews,
    TextMoneyInital,
    TextMoney,
    ProductDescription,
    ProductInfomation,
    TagProduct,
    TheStar,
  },

  data() {
    return {
      quantity: 1,
      show_added: false,
    };
  },

  computed: {
    id() {
      return String(this.$route.params.id);
    },

    is_in_wish_list() {
      return useWishlistStore().product_ids.includes(this.id);
    },

    product() {
      return useProductStore().detail;
    },
  },

  created() {
    this.fetch();
  },

  watch: {
    $route: {
      immediate: false,
      handler(route) {
        if (route.params.id) {
          this.fetch();
        }
      },
    },
  },

  methods: {
    handleClick() {
      const current = document.getElementById("current") as any;
      const opacity = 0.6;
      const imgs = document.querySelectorAll(".img");
      imgs.forEach((img: any) => {
        img.addEventListener("click", (e: any) => {
          //reset opacity
          imgs.forEach((img: any) => {
            img.style.opacity = 1;
          });
          current.src = e.target.src;
          e.target.style.opacity = opacity;
        });
      });
    },

    fetch() {
      useProductStore().get(this.id);
    },

    decrease() {
      this.quantity > 1 && this.quantity--;
    },

    increase() {
      this.quantity++;
    },

    handleBuyNow() {
      useCartStore().increase(this.id, this.quantity);
      this.$router.push("/cart");
    },

    addProductToCart() {
      useCartStore().increase(this.id, this.quantity);
      this.show_added = true;
      setTimeout(() => {
        this.show_added = false;
      }, 2000);

      this.quantity = 1;
    },

    handleWishlist() {
      if (this.is_in_wish_list) {
        useWishlistStore().removeWishlistItem(this.id);
      } else {
        useWishlistStore().addProductToWishlist(this.id);
      }
    },
  },
});
</script>
