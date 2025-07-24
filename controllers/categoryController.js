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



exports.categoryById = async (req, res, next, id) => {
  try {
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        error: "Category not found",
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
};

exports.showCategory = (req, res) => {
  res.json(req.category);
};

// ✅ Fixed: Use async/await instead of callbacks
exports.updateCategory = async (req, res) => {
  try {
    const category = req.category;
    category.name = req.body.name;

    const updatedCategory = await category.save();
    
    res.json({
      message: "Category updated successfully",
      category: updatedCategory
    });
  } catch (error) {
    return res.status(400).json({
      error: "Bad request: Category not updated",
      details: error.message,
    });
  }
};

exports.removeCategory = async (req, res) => {
  try {
    const category = req.category;

    await Category.findByIdAndDelete(category._id);

    res.json({
      message: "Category deleted successfully",
      deletedCategory: {
        _id: category._id,
        name: category.name,
      },
    });
  } catch (error) {
    return res.status(400).json({
      error: "Category not deleted",
      details: error.message,
    });
  }
};

// ✅ Fixed: Use async/await instead of callbacks
exports.allCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    return res.status(400).json({
      error: "Bad request: Categories not found",
      details: error.message,
    });
  }
};