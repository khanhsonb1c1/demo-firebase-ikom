import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/Home/TheIndex.vue";
import LoginPage from "@/views/Auth/LoginPage.vue";
import RegisterPage from "@/views/Auth/RegisterPage.vue";
import { nextTick } from "vue";
import { useAuthStore } from "@/stores/auth";
import CustomerContainer from "@/views/Customer/TheContainer.vue";
import UserInfo from "@/views/Customer/UserInfo.vue";
import Address from "@/views/Customer/TheAddress.vue";
import NotFound from "@/views/NotFound.vue";
import OrderList from "@/views/Customer/Order/TheList.vue";
import OrderDetail from "@/views/Customer/Order/TheDetail.vue";
import ProductView from "@/views/Product/TheIndex.vue";
import ProductDetail from "@/views/Product/Detail.vue";
import CartPage from "@/views/Cart/TheIndex.vue";
import Wallet from "@/views/Customer/Wallet/TheIndex.vue";
import WalletDetail from "@/views/Customer/Wallet/TheDetail.vue";
import ContactUs from "@/views/Contact/TheIndex.vue";
import AboutUs from "@/views/AboutUs/TheIndex.vue";
import Blog from "@/views/Blog/TheIndex.vue";
import BlogDetail from "@/views/Blog/TheDetail.vue";
import Policy from "@/views/Policy/TheIndex.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/home",
      redirect: "/",
    },
    {
      path: "/",
      name: "Home",
      component: ProductView,
    },
    {
      path: "/login",
      name: "Login",
      component: LoginPage,
    },
    {
      path: "/register",
      name: "Register",
      component: RegisterPage,
    },
    {
      path: "/products",
      name: "Products",
      component: ProductView,
    },
    {
      path: "/products/:id",
      name: "Product detail",
      component: ProductDetail,
    },
    {
      path: "/cart",
      name: "cart",
      component: CartPage,
      meta: { title: "Giỏ hàng", authRequired: true },
    },
    {
      path: "/customer",
      name: "Customer",
      component: CustomerContainer,
      redirect: "/customer/orders",
      meta: { authRequired: true },
      children: [
        {
          path: "user-info",
          name: "User info",
          component: UserInfo,
        },
        {
          path: "address",
          name: "Address",
          component: Address,
        },
        {
          path: "orders",
          name: "Orders",
          component: OrderList,
        },
        {
          path: "orders/:id",
          name: "Order detail",
          component: OrderDetail,
        },
        {
          path: "wallet",
          name: "Wallet",
          component: Wallet,
        },
        {
          path: "wallet/:id",
          name: "Wallet detail",
          component: WalletDetail,
        },
      ],
    },
    {
      path: "/contact-us",
      name: "Contact us",
      component: ContactUs,
    },
    {
      path: "/about-us",
      name: "About us",
      component: AboutUs,
    },
    {
      path: "/blogs",
      name: "Blogs",
      component: Blog,
    },
    {
      path: "/blogs/:id",
      name: "Blog detail",
      component: BlogDetail,
    },
    {
      path: "/policy",
      name: "Policy",
      component: Policy,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "Not found",
      component: NotFound,
    },
  ],

  scrollBehavior() {
    // always scroll to top
    return { top: 0 };
  },
});

router.beforeEach((routeTo, routeFrom, next) => {
  const authRequired = routeTo.matched.some((route) => route.meta.authRequired);
  if (!authRequired) {
    return next();
  }

  useAuthStore()
    .authenticate()
    .then(() => {
      return next();
    })
    .catch(() => {
      router.push({ path: "/login" });
    });
});

router.afterEach((to) => {
  nextTick(() => {
    document.title = (to.meta.title || to.name) + " | " + import.meta.env.VITE_APP_NAME;
  });
});

export default router;
