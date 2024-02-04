const Relationship=require("../models/Relationship");
const User=require("../models/User");

const follow=async (req,res)=>{
    try{
    const followingId=req.body;
    const followerId=req.params.id;
    if(followerId===followingId){
        return res.status(400).json({message:"You cannot follow yourself"});
    }
    const existingRelationship=await Relationship.findOne({follower:followerId,following:followingId})
    
        if(existingRelationship){
            if(existingRelationship.status==="accepted"){
                return res.status(400).json({message:"You are already following this user"});
            }
            else if(existingRelationship.status==="pending"){
                return res.status(400).json({message:"You have already sent a follow request to this user"});
            }
        }
        else{
            const newRelationship=new Relationship({
                follower:followerId,
                following:followingId,
            });
            await newRelationship.save()
            
            return res.status(200).json({message:"Follow request sent successfully"});
            }
        }
            catch(error){
                return res.status(500).json({message:"Internal server error"});
            };
        
    
}

const unfollow=async (req,res)=>{
    try{
    const followingId=req.body;
    const followerId=req.params.id;
    if(followerId===followingId){
        return res.status(400).json({message:"You cannot unfollow yourself"});
    }
    const existingRelationship=await Relationship.findOne({follower:followerId,following:followingId})
    
        if(existingRelationship){
            if(existingRelationship.status==="accepted"){
                existingRelationship.status="rejected";
                await existingRelationship.save()
                
                    return res.status(200).json({message:"Unfollowed successfully"});
                }
                
            else if(existingRelationship.status==="pending"){
                return res.status(400).json({message:"You have already sent a follow request to this user"});
            }
        }
        else{
            return res.status(400).json({message:"You are not following this user"});
        }
    }
    catch(error){
        return res.status(500).json({message:"Internal server error"});
    
}
}
//get all relationship of the user
const getRelationships=async (req,res)=>{
    try{
    const userId=req.params.id;
    const relationships =await Relationship.find({follower:userId}).populate("following")
   
    
        return res.status(200).json(relationships);
    }
    catch(error){
        return res.status(500).json({message:"Internal server error"});
    }
}
//get all followers of the user
const getFollowers=async (req,res)=>{
    try{
    const userId=req.params.id;
    const relationships=await Relationship.find({following:userId}).populate("follower")
    return res.status(200).json(relationships);
    }
    catch(error){
        return res.status(500).json({message:"Internal server error"});
    }
}
module.exports={follow,unfollow,getRelationships,getFollowers};