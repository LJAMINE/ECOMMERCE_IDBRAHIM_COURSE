const express = require("express");
const {userById} = require("../middlewares/user");

const router = express.Router();

const { createCategory,showCategory,categoryById } = require("../controllers/categoryController");

const { requireSignin, isAuth, isAdmin } = require("../middlewares/auth");

router.post("/create/:userId", [requireSignin, isAuth, isAdmin], createCategory);

router.get('/:categoryId',showCategory);

router.param('userId',userById);

router.param('categoryId', categoryById);

 
module.exports = router;
