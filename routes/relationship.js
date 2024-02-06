const express=require("express");
const router=express.Router();
const relationshipController=require("../controllers/relationshipController");
// const authMiddleware=require("../middlewares/auth");

router.post("/:username",relationshipController.updateFollowingList);
// router.post("/:username/unfollow",relationshipController.unfollow);
router.get("/:username/followers",relationshipController.getFollowers);
router.get("/:username/following",relationshipController.getFollowing);
router.post("/:username/acceptrequest",relationshipController.acceptrequest);



module.exports=router;