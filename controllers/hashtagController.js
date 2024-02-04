const Hashtag=require("../models/Hashtag");
const Post=require("../models/Post");

const getPostsByHashtag=async (req,res)=>{
    try{
    const hashtag=req.params.hashtag;
    const existingHashtag=await Hashtag.findOne({hashtag:hashtag}).populate("posts");
    if(!existingHashtag){
        return res.status(404).json({message:"No posts found for this hashtag"});
    }
    return res.status(200).json({posts:existingHashtag.posts});
    }
    catch(error){
        return res.status(500).json({message:"Internal server error"});
    }

}

const getHashtags=async (req,res)=>{
    try{
    const hashtags=await Hashtag.find();
    return res.status(200).json({hashtags:hashtags});
    }
    catch(error){
        return res.status(500).json({message:"Internal server error"});
    }
}

module.exports={getPostsByHashtag,getHashtags};
