import categorymodel from "../models/Categorymodel.js";

class CategoryController {
  static addCat = async (req, res) => {
    try {
      const newcat = new categorymodel(req.body);
      const savecat = await newcat.save();
      res.status(201).json(savecat);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  static getalldata = async (req, res) => {
    try {
      const finddata = await categorymodel.find();
      res.status(200).json(finddata);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  static deleterow = async (req, res) => {
    try {
      const del = await categorymodel.findByIdAndDelete(req.params.id);
      res.status(200).json(del);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  static update = async (req, res) => {
    try {
      const upd = await categorymodel.findByIdAndUpdate(
        req.params.id,
        req.body,
      );
      res.status(200).json(upd);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  static getdataforupdate = async (req, res) => {
    try {
      const get = await categorymodel.findById(req.params.id);
      res.status(200).json(get);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
}
export default CategoryController;
