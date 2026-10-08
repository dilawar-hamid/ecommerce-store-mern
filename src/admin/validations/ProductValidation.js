import { mixed, number, object, string } from "yup";

const schema = object({
  name: string().required(),
  description: string().required(),
  price: number().required(),
  category: string().required(),
  stock: number().required(),
  image: mixed().required(),
});
export default schema;