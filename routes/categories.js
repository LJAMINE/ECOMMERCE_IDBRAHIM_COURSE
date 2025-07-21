const express = require("express");
const {userById} = require("../middlewares/user");

const router = express.Router();

const { createCategory } = require("../controllers/categoryController");

const { requireSignin, isAuth, isAdmin } = require("../middlewares/auth");

router.post("/create/:userId", [requireSignin, isAuth, isAdmin], createCategory);


router.param('userId',userById);


module.exports = router;
