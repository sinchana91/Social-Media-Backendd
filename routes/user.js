const Usercontroller=require('../controllers/userController');
const authMiddleware=require('../middlewares/auth');
const express=require("express");
const router=express.Router();

router.post("/register",Usercontroller.registerUser);
router.post("/login",Usercontroller.loginUser);

router.get("/protected",authMiddleware,(req,res)=>{
    res.status(200).json({message:"you are authorized"});
})

module.exports=router;
