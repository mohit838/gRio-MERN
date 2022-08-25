const { validationResult } = require("express-validator");
const { CategoryModel } = require("../models/Category");

class Category {
  async createCategory(req, res) {
    const errors = validationResult(req);
    const { name } = req.body;

    if (errors.isEmpty()) {
      const isCategory = await CategoryModel.findOne({ name });

      if (!isCategory) {
        await CategoryModel.create({ name });
        return res
          .status(201)
          .json({ message: "Your category has been created successfully!" });
      } else {
        return res
          .status(400)
          .json({ errors: [{ msg: `${name} category is already exist` }] });
      }
    } else {
      return res.status(400).json({ errors: errors.array() });
    }
  }
}

module.exports = new Category();
