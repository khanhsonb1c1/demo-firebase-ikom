import type Category from "./Category";
import type Review from "./Review";

export default interface Product {
  hs_code: string;
  id: string;
  categories: Array<Category>;
  origin: {
    name: string;
  };
  images: [
    {
      url: string;
      primary: boolean;
    }
  ];
  tags: [
    {
      id: string;
      name: string;
    }
  ];
  reviews: Array<Review>;
  description: string;
  initial_price: number;
  star: number;
  reviews_count: number;
  reviewCount: number;
  discount: number;
  image_url: string;
  name: string;
  created_at: number;
  updated_at: number;
  quantity_items: number;
  price: 0 | number;
  ingredients: string;
  tax_percent: number;
  width: number;
  length: number;
  height: number;
  weight: number;
  special: boolean | false;
  private_license: boolean | false;
  banned_export: boolean | false;
  banned_air: boolean | false;
  banned_sea: boolean | false;
}
