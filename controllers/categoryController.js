const Category = require("../models/category");

exports.createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    const savedCategory = await category.save();

    res.json({
      message: "Category created successfully",
      category: savedCategory,
    });
  } catch (error) {
    return res.status(400).json({
      error: "Bad request: Category not created",
      details: error.message,
    });
  }
};
