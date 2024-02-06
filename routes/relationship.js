const express=require("express");
const router=express.Router();
const relationshipController=require("../controllers/relationshipController");
// const authMiddleware=require("../middlewares/auth");

router.post("/:username",relationshipController.updateFollowingList);
router.get("/:username/followers",relationshipController.getFollowers);
router.get("/:username/following",relationshipController.getFollowing);
router.post("/:username/acceptrequest",relationshipController.acceptrequest);
router.post("/:username/rejectedrequest",relationshipController.rejectedrequest);



module.exports=router;