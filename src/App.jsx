import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./admin/layouts/DashboardLayout";
import Dashboard from "./admin/pages/Dashboard";
import Orders from "./admin/pages/Orders";
import "./admin/styles/sb-admin-2.css";
import "./App.css";
import UserLayout from "./user/layouts/userlayout";
import Home from "./user/pages/home";
import NotFound from "./pages/NotFound";
import Products from "./user/pages/products";
import Cart from "./user/pages/cart";
import Login from "./user/pages/login";
import Register from "./user/pages/register";
import Product from "./admin/pages/AddProduct";
import ShowProducts from "./admin/pages/showpro";
import AddCategory from "./admin/pages/AddCat";
import ShowCategory from "./admin/pages/showcat";
import About from "./user/pages/about";
import UpdateCategory from "./admin/pages/UpdateCat";
import UpdateProduct from "./admin/pages/UpdateProduct";
import ProtectedRoute from "../ProtectedRoute";
import Logout from "./user/pages/logout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
        </Route>

        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/addcat" element={<AddCategory />} />
          <Route path="/showcat" element={<ShowCategory />} />
          <Route path="/updcat/:id" element={<UpdateCategory />} />
          <Route path="/addpro" element={<Product />} />
          <Route path="/showpro" element={<ShowProducts />} />
          <Route path="/updpro/:id" element={<UpdateProduct />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
