import { object, string } from "yup";

const schema = object({
  name: string().required(),
  description: string().required(),
});
export default  schema