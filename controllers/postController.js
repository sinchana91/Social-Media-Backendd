const Post=require("../models/Post");
const User=require("../models/User");

const createPost=async(req,res)=>{
    try{
    const {desc,media,locations,mentions,tags,visibility,hashtags,originalPost}=req.body;
    const user=await User.findOne({username:req.params.username});
    if(!user){
        return res.status(404).json("user not found");
    }

    const newPost=new Post({
        username:user._id,
        desc:desc,
        media:media,
        locations:locations,
        mentions:   mentions,
        tags:tags,
        visibility:visibility,
        hashtags:hashtags,
        originalPost:   originalPost,
    });
    await newPost.save();
    await User.findByIdAndUpdate(user.isDirectSelected,{
        $inc:{postsCount:1},
    });
}catch(err){
    console.log(err);
    res.status(500).json({message:"Internal server error"});
}
};

const getAllPosts=async(req,res)=>{
    try{
        const posts=await Post.find({}).sort({createdAt:-1});
        res.status(200).json(posts);
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Internal server error"});
    }
}

const getPost=async(req,res)=>{
    try{
        const post=await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json("post not found");
        }
        res.status(200).json(post);
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Internal server error"});
    }
}

const deletePost=async(req,res)=>{
    try{
        const post=await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json("post not found");
        }
        await post.delete();
        res.status(200).json("post deleted");
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Internal server error"});
    }
}

module.exports={createPost,getAllPosts,getPost,deletePost};
