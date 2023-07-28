import type PostCategory from "./PostCategory";
import type User from "./User";

export default interface Post {
  id: string;
  title: string;
  description: string;
  publish: number;
  updated_at: number;
  created_at: string;
  content: string;
  cover_url: string;
  cover_path: string;
  categories: Array<PostCategory>;
  creator: User;
}
