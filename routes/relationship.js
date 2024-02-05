const express=require("express");
const router=express.Router();
const relationshipController=require("../controllers/relationshipController");
// const authMiddleware=require("../middlewares/auth");

router.post("/:id/follow",relationshipController.follow);
router.post("/:id/unfollow",relationshipController.unfollow);
router.get("/:id/followers",relationshipController.getFollowers);
router.get("/:id/following",relationshipController.getRelationships);

module.exports=router;