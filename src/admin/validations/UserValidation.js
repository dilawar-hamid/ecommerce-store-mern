import { object, string } from "yup";

const schema = object({
  name: string().required(),
  lastname: string().required(),
  email: string().required(),
  password: string().required(),
});
export default schema;
