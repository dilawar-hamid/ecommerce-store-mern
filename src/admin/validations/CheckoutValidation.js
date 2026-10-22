
import { object, string } from "yup";

const schema = object({
  name: string().required("Name is required"),
  email: string().email("Enter a valid email").required("Email is required"),
  phone: string().required("Phone is required"),
  address: string().required("Address is required"),
  paymentMethod: string().required("Payment method is required"),
});

export default schema;
