const express = require("express");
const router=express.Router();
const postController=require("../controllers/postController");
// const authMiddleware=require("../middlewares/auth");


router.post("/:username",postController.createPost);
router.get("/",postController.getAllPosts);
router.get("/:id",postController.getPost);
router.delete("/:id",postController.deletePost);
router.put("/like/:id",postController.likePost);
router.put("/comment/:id",postController.commentPost);
router.put("/share/:id",postController.sharePost);
router.put("/unlike/:id",postController.unlikePost);
router.get("/user/:id",postController.getPostsByUser);
router.get("/:hashtag",postController.getPostsByHashtag);
router.put("/reaction/:id",postController.updatereactions);


module.exports=router;
