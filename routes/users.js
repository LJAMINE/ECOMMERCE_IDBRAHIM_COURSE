const express = require("express");
const { salam, signup } = require("../controllers/userController");
const { userSignUpValidator } = require("../middlewares/userValidator");

const router = express.Router();

router.get("/", salam);

router.post("/signup", userSignUpValidator, signup);

module.exports = router;
