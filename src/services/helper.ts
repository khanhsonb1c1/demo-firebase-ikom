import { tomoni } from "../http-tomoni";
import Resource from "./Resource";

const provinces = new Resource({ service: tomoni, path: "/api/provinces" });
const districts = new Resource({ service: tomoni, path: "/api/districts" });
const wards = new Resource({ service: tomoni, path: "/api/wards" });
const posts = new Resource({ service: tomoni, path: "/api/posts" });
const post_categories = new Resource({ service: tomoni, path: "/api/post-categories" });

function getAmoutWithConditions(params?: object) {
  return tomoni.get("/api/amount-with-conditions", { params });
}

export { provinces, districts, wards, posts, post_categories, getAmoutWithConditions };
