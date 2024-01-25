const express = require("express");
const router=express.Router();
const postController=require("../controllers/postController");
const authMiddleware=require("../middlewares/auth");

router.post("/:username",authMiddleware,postController.createPost);
router.get("/",postController.getAllPosts);
router.get("/:id",postController.getPost);
router.delete("/:id",authMiddleware,postController.deletePost);

module.exports=router;
