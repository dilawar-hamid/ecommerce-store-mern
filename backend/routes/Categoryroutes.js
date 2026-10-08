import express from "express";
import CategoryController from "../controllers/Categorycontroller.js";
import Authmiddleware from "../middleware/verifyToken.js";

const catrouter = express.Router();

catrouter.get("/", CategoryController.getalldata);
catrouter.post("/", Authmiddleware, CategoryController.addCat);
catrouter.delete("/:id", Authmiddleware, CategoryController.deleterow);
catrouter.put("/:id", Authmiddleware, CategoryController.update);
catrouter.get("/:id", CategoryController.getdataforupdate);

export default catrouter;
