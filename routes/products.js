const express = require("express");
const { userById } = require("../middlewares/user");

const router = express.Router();

const {
  createProduct,
  showProduct,
  productById,
  removeProduct,
  updateProduct,
} = require("../controllers/productController");

const { requireSignin, isAuth, isAdmin } = require("../middlewares/auth");

router.get("/:productId", showProduct);

router.post("/create/:userId", [requireSignin, isAuth, isAdmin], createProduct);

router.delete(
  "/:productId/:userId",
  [requireSignin, isAuth, isAdmin],
  removeProduct
);

router.put(
  "/:productId/:userId",
  [requireSignin, isAuth, isAdmin],
  updateProduct
);

router.param("userId", userById);

router.param("productId", productById);

module.exports = router;
