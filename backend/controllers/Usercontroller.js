import usermodel from "../models/Usermodel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
class UserController {
  static NewUser = async (req, res) => {
    try {
      const { name, lastname, email, password } = req.body;
      const hashpassword = await bcrypt.hash(password, 10);
      const register = new usermodel({
        name,
        lastname,
        email,
        password: hashpassword,
      });
      const saveuser = await register.save();
      saveuser.password = undefined;
      res.status(200).json(saveuser);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  static LoginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const finduser = await usermodel.findOne({ email });

      if (!finduser) {
        return res.status(404).json({ message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, finduser.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid password" });
      }
      const payload = {
        id: finduser._id,
        role: finduser.role,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      finduser.password = undefined;

      res.status(200).json({
        token,
        user: finduser,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
}
export default UserController;
