
import mongoose from "mongoose";
import Productmodel from "../models/Productmodel.js";
import ordermodel from "../models/Ordermodel.js";

class OrderController {
  static NewOrder = async (req, res) => {
    const session = await mongoose.startSession();

    try {
      const { items, customer, paymentMethod } = req.body;

      if (
        typeof customer?.name !== "string" ||
        !customer.name.trim() ||
        typeof customer?.email !== "string" ||
        !customer.email.trim() ||
        typeof customer?.phone !== "string" ||
        !customer.phone.trim() ||
        typeof customer?.address !== "string" ||
        !customer.address.trim()
      ) {
        return res.status(400).json({
          message: "Please provide all customer details",
        });
      }

      if (paymentMethod !== "Cash on Delivery") {
        return res.status(400).json({
          message: "Invalid payment method",
        });
      }

      if (
        !Array.isArray(items) ||
        items.length === 0 ||
        items.some(
          (item) =>
            !item ||
            typeof item.product !== "string" ||
            !Number.isInteger(item.quantity) ||
            item.quantity < 1
        )
      ) {
        return res.status(400).json({
          message: "Invalid order items or quantity",
        });
      }

      const productIds = items.map((item) => item.product);

      if (productIds.some((id) => !mongoose.Types.ObjectId.isValid(id))) {
        return res.status(400).json({
          message: "Invalid product ID",
        });
      }

      if (new Set(productIds).size !== productIds.length) {
        return res.status(400).json({
          message: "Duplicate products are not allowed",
        });
      }

      await session.withTransaction(async () => {
        const products = await Productmodel.find({
          _id: { $in: productIds },
        }).session(session);

        if (products.length !== items.length) {
          throw new Error("PRODUCTS_NOT_FOUND");
        }

        const orderItems = [];

        for (const item of items) {
          const product = products.find(
            (product) => product._id.toString() === item.product
          );

          if (!product || product.stock < item.quantity) {
            throw new Error("INSUFFICIENT_STOCK");
          }

          const updatedProduct = await Productmodel.findOneAndUpdate(
            {
              _id: product._id,
              stock: { $gte: item.quantity },
            },
            {
              $inc: { stock: -item.quantity },
            },
            {
              new: true,
              session,
            }
          );

          if (!updatedProduct) {
            throw new Error("INSUFFICIENT_STOCK");
          }

          orderItems.push({
            product: product._id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: item.quantity,
          });
        }

        const totalAmount = orderItems.reduce(
          (total, item) =>
            total + Number(item.price) * item.quantity,
          0
        );

        const [savedOrder] = await ordermodel.create(
          [
            {
              user: req.user.id,
              customer: {
                name: customer.name.trim(),
                email: customer.email.trim(),
                phone: customer.phone.trim(),
                address: customer.address.trim(),
              },
              items: orderItems,
              totalAmount,
              paymentMethod,
            },
          ],
          { session }
        );

        req.createdOrder = savedOrder;
      });

      return res.status(201).json({
        message: "Order placed successfully",
        order: req.createdOrder,
      });
    } catch (err) {
      if (err.message === "PRODUCTS_NOT_FOUND") {
        return res.status(400).json({
          message: "One or more products were not found",
        });
      }

      if (err.message === "INSUFFICIENT_STOCK") {
        return res.status(400).json({
          message: "Insufficient stock for one or more products",
        });
      }

      return res.status(500).json({
        message: "Failed to place order",
      });
    } finally {
      await session.endSession();
    }
  };

  static MyOrders = async (req, res) => {
    try {
      const orders = await ordermodel
        .find({ user: req.user.id })
        .sort({ createdAt: -1 });

      return res.status(200).json({
        message: "Orders fetched successfully",
        orders,
      });
    } catch (error) {
      console.error("MyOrders Error:", error);

      return res.status(500).json({
        message: "Failed to fetch orders",
      });
    }
  };

  static AllOrders = async (req, res) => {
    try {
      const orders = await ordermodel
        .find()
        .sort({ createdAt: -1 });

      return res.status(200).json({
        message: "Orders fetched successfully",
        orders,
      });
    } catch (error) {
      console.error("AllOrders Error:", error);

      return res.status(500).json({
        message: "Failed to fetch orders",
      });
    }
  };

  static UpdateOrderStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const allowedStatuses = [
        "Pending",
        "Processing",
        "Completed",
      ];

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          message: "Invalid order ID",
        });
      }

      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          message: "Invalid order status",
        });
      }

      const order = await ordermodel.findById(id);

      if (!order) {
        return res.status(404).json({
          message: "Order not found",
        });
      }

      // Prevent cancelled orders from being reopened.
      if (order.status === "Cancelled") {
        return res.status(400).json({
          message: "Cancelled orders cannot be reopened",
        });
      }

      // Prevent completed orders from being reopened or changed.
      if (order.status === "Completed" && status !== "Completed") {
        return res.status(400).json({
          message: "Completed orders cannot be reopened or changed",
        });
      }

      order.status = status;
      await order.save();

      return res.status(200).json({
        message: "Order status updated successfully",
        order,
      });
    } catch (error) {
      console.error("UpdateOrderStatus Error:", error);

      return res.status(500).json({
        message: "Failed to update order status",
      });
    }
  };

  static CancelOrder = async (req, res) => {
    const session = await mongoose.startSession();

    try {
      const { id } = req.params;
      const isAdmin = req.user.role === "admin";

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          message: "Invalid order ID",
        });
      }

      await session.withTransaction(async () => {
        const order = await ordermodel.findById(id).session(session);

        if (!order) {
          throw new Error("ORDER_NOT_FOUND");
        }

        if (!isAdmin && order.user.toString() !== req.user.id) {
          throw new Error("ORDER_ACCESS_DENIED");
        }

        if (order.status === "Cancelled") {
          throw new Error("ORDER_ALREADY_CANCELLED");
        }

        if (order.status === "Completed") {
          throw new Error("ORDER_ALREADY_COMPLETED");
        }

        if (!isAdmin && order.status !== "Pending") {
          throw new Error("CANCELLATION_NOT_ALLOWED");
        }

        if (
          isAdmin &&
          !["Pending", "Processing"].includes(order.status)
        ) {
          throw new Error("CANCELLATION_NOT_ALLOWED");
        }

        for (const item of order.items) {
          const result = await Productmodel.updateOne(
            { _id: item.product },
            { $inc: { stock: item.quantity } },
            { session }
          );

          if (result.matchedCount !== 1) {
            throw new Error("PRODUCT_NOT_FOUND");
          }
        }

        order.status = "Cancelled";
        await order.save({ session });
      });

      return res.status(200).json({
        message: "Order cancelled successfully",
      });
    } catch (error) {
      const errors = {
        ORDER_NOT_FOUND: [
          404,
          "Order not found",
        ],
        ORDER_ACCESS_DENIED: [
          403,
          "You cannot cancel this order",
        ],
        ORDER_ALREADY_CANCELLED: [
          400,
          "Order is already cancelled",
        ],
        ORDER_ALREADY_COMPLETED: [
          400,
          "Completed orders cannot be cancelled",
        ],
        CANCELLATION_NOT_ALLOWED: [
          400,
          "This order cannot be cancelled",
        ],
        PRODUCT_NOT_FOUND: [
          400,
          "A product in this order no longer exists",
        ],
      };

      if (errors[error.message]) {
        const [statusCode, message] = errors[error.message];

        return res.status(statusCode).json({
          message,
        });
      }

      console.error("CancelOrder Error:", error);

      return res.status(500).json({
        message: "Failed to cancel order",
      });
    } finally {
      await session.endSession();
    }
  };
}

export default OrderController;
