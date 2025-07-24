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


exports.categoryById = async (req, res, next, id) => {
  try {
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        error: "category not found ",
      });
    }

    req.category = category;
    next();
  } catch (error) {
    return res.status(400).json({
      error: "Invalid category ID or database error",
      details: error.message,
    });
  }
}

exports.showCategory = (req, res) => {
 
  let category = req.category;

  res.json(category);
}
