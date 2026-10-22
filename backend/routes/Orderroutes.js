import express from "express";
import OrderController from "../controllers/Ordercontroller.js";
import UserAuthmiddleware from "../middleware/UserAuthmiddleware.js";
import Authmiddleware from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/", UserAuthmiddleware, OrderController.NewOrder);

router.get("/my-orders", UserAuthmiddleware, OrderController.MyOrders);

router.get("/all-orders", Authmiddleware, OrderController.AllOrders);

router.patch("/:id/status", Authmiddleware, OrderController.UpdateOrderStatus);

router.patch("/:id/cancel", UserAuthmiddleware, OrderController.CancelOrder);

export default router;
