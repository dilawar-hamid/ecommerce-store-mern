import express from "express";
import UserController from "../controllers/Usercontroller.js";

const userruoter = express.Router();

userruoter.post("/register", UserController.NewUser);

userruoter.post("/login", UserController.LoginUser);

export default userruoter;
