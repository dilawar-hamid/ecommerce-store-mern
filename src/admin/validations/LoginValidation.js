import { object, string } from "yup";

const UserSchema = object({
  email: string().required(),
  password: string().required(),
});
export default UserSchema;
