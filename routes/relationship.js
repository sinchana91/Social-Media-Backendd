const express=require("express");
const router=express.Router();
const relationshipController=require("../controllers/relationshipController");
const authMiddleware=require("../middlewares/auth");

router.post("/:id/follow",authMiddleware,relationshipController.follow);
router.post("/:id/unfollow",authMiddleware,relationshipController.unfollow);
router.get("/:id/followers",authMiddleware,relationshipController.getFollowers);
router.get("/:id/following",authMiddleware,relationshipController.getRelationships);

module.exports=router;