import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./routes/Productroutes.js";
import catrouter from "./routes/Categoryroutes.js";
import userruoter from "./routes/Userroutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/productroutes", router);
app.use("/uploads", express.static("uploads"));
app.use("/categoryroutes", catrouter);
app.use("/userroutes", userruoter);

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
