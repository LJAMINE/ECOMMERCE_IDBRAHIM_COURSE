const express= require("express");
const { getOneUser } = require("../controllers/userController");
const {userById} = require("../middlewares/user");
const {requireSignin,isAuth} = require("../middlewares/auth");


const router = express.Router();


router.get('/profile/:userId',requireSignin,isAuth,getOneUser)

router.param('userId',userById);






module.exports=router;