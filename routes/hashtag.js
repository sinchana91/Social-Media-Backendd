const express=require("express");
const router=express.Router();

const hashtagController=require("../controllers/hashtagController");

router.get("/hashname",hashtagController.getPostsByHashtag);
router.get("/hashtags",hashtagController.getHashtags);

module.exports=router;
