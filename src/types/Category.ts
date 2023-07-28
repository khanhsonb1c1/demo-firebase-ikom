export default interface Category {
  id: string;
  name: string;
  parent_id: string;
  image_url: string;
  children: [
    {
      id: string;
      name: string;
    }
  ];
}
