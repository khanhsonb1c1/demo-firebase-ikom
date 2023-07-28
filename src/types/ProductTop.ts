import type Product from "./Product";

export default interface ProductTop {
  best_seller: Array<Product>;
  fix_hot: Array<Product>;
  new_arrival: Array<Product>;
  hot: Array<Product>;
  new_hot: Array<Product>;
  slide_hot: Array<Product>;
  top_rated: Array<Product>;
  trending: Array<Product>;
}
