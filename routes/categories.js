const express = require("express");
const { userById } = require("../middlewares/user");

const router = express.Router();

const {
  allCategories,
  createCategory,
  showCategory,
  categoryById,
  updateCategory,
  removeCategory,
} = require("../controllers/categoryController");

const { requireSignin, isAuth, isAdmin } = require("../middlewares/auth");

router.get("/", allCategories);

router.post(
  "/create/:userId",
  [requireSignin, isAuth, isAdmin],
  createCategory
);

router.put(
  "/:categoryId/:userId",
  [requireSignin, isAuth, isAdmin],
  updateCategory
);

router.delete(
  "/:categoryId/:userId",
  [requireSignin, isAuth, isAdmin],
  removeCategory
);

router.get("/:categoryId", showCategory);

router.param("userId", userById);

router.param("categoryId", categoryById);

module.exports = router;
