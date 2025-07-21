const express = require("express");
const {userById} = require("../middlewares/user");

const router = express.Router();

const { createProduct } = require("../controllers/productController");

const { requireSignin, isAuth, isAdmin } = require("../middlewares/auth");

router.post("/create/:userId", [requireSignin, isAuth, isAdmin], createProduct);


router.param('userId',userById);


module.exports = router;
