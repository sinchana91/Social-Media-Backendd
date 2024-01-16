const Usercontroller=require('../controllers/userController');
const express=require("express");
const router=express.Router();

router.post("/register",Usercontroller.registerUser);
router.post("/login",Usercontroller.loginUser);

module.exports=router;
