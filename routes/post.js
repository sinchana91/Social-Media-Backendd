const express = require("express");
const router=express.Router();
const postController=require("../controllers/postController");
// const authMiddleware=require("../middlewares/auth");


router.post("/:username",postController.createPost);
router.get("/",postController.getAllPosts);
router.get("/:id",postController.getPost);
router.delete("/:id",postController.deletePost);
router.put("/:id",postController.likePost);
router.put("/:id",postController.commentPost);
router.put("/:id",postController.sharePost);
router.put("/:id",postController.unlikePost);
router.get("/:user",postController.getPostsByUser);
router.get("/:hashtag",postController.getPostsByHashtag);
router.put("/:id",postController.updatereactions);


module.exports=router;
