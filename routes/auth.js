const express = require("express");
const {
  salam,
  signup,
  signin,
  signout,
} = require("../controllers/authController");
const { userSignUpValidator } = require("../middlewares/userValidator");

const { requireSignin } = require("../middlewares/auth");

const router = express.Router();

router.get("/", salam);

router.post("/signup", userSignUpValidator, signup);
router.post("/signin", signin);
router.get("/signout", signout);
router.get("/hello", requireSignin, (req, res) => {
  res.send({ message: "Hello there" });
});

module.exports = router;
