import { tomoni } from "../http-tomoni";
import Resource from "./Resource";

const products = new Resource({ service: tomoni, path: "/api/products" });

const categories = new Resource({ service: tomoni, path: "/api/product-categories" });

const origins = new Resource({ service: tomoni, path: "/api/origins" });

const reviews = new Resource({
  service: tomoni,
  path: "/api/product-reviews",
});

function fetchTopProductsForSale() {
  return tomoni.get("/api/top-products-for-sale");
}

export { products, categories, origins, reviews, fetchTopProductsForSale };
