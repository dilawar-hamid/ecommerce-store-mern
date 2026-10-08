import express from "express";
import Productcontroller from "../controllers/Productcotroller.js";

import upload from "../config/multer.js";
import Authmiddleware from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/",  Productcontroller.FetchAllData);
router.post("/", Authmiddleware, upload.single("image"), Productcontroller.AddPro);
router.delete("/:id", Authmiddleware, Productcontroller.del);
router.get("/:id", Productcontroller.getupdatedata);
router.put("/:id", Authmiddleware, upload.single("image"), Productcontroller.update);

export default router;
