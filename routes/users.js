const express=require('express');
const {salam}=require('../controllers/userController');

const router=express.Router();

router.get('/',salam);

module.exports=router;