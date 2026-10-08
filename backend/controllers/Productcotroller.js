import fs from "fs";
import productmodel from "../models/Productmodel.js";

class Productcontroller {
  static AddPro = async (req, res) => {
    try {
      const newpro = new productmodel({
        ...req.body,
        image: req.file.filename,
      });
      const savepro = await newpro.save();
      res.status(201).json(savepro);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  static FetchAllData = async (req, res) => {
    try {
      const fetch = await productmodel.find();
      res.status(200).json(fetch);
    } catch (err) {
      res.status(500).json({
        error: err.message,
      });
    }
  };
  static del = async (req, res) => {
    try {
      const dell = await productmodel.findByIdAndDelete(req.params.id);
      res.status(200).json(dell);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  static getupdatedata = async (req, res) => {
    try {
      const get = await productmodel.findById(req.params.id);
      res.status(200).json(get);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  static update = async (req, res) => {
    try {
      const oldProduct = await productmodel.findById(req.params.id);
      const UpdateData = {
        ...req.body,
      };

      if (req.file) {
        UpdateData.image = req.file.filename;

        fs.unlink(`uploads/${oldProduct.image}`, (err) => {
          if (err) {
            console.log(err);
          }
        });
      }

      const update = await productmodel.findByIdAndUpdate(
        req.params.id,

        UpdateData,
        { new: true },
      );
      res.status(200).json(update);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
}
export default Productcontroller;
