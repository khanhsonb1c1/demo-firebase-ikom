import type CartLocalItem from "./CartLocalItem";
import type Product from "./Product";

export default interface CartItem {
  cart_local_item: CartLocalItem;
  product_info: Product;
  price: number;
  tax_percent: number;
}
