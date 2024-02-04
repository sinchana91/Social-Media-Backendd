const Relationship=require("../models/Relationship");
const User=require("../models/User");

const follow=(req,res)=>{
    const followingId=req.body;
    const followerId=req.params.id;
    if(followerId===followingId){
        return res.status(400).json({message:"You cannot follow yourself"});
    }
    Relationship.findOne({follower:followerId,following:followingId})
    .then((relationship)=>{
        if(relationship){
            if(relationship.status==="accepted"){
                return res.status(400).json({message:"You are already following this user"});
            }
            else if(relationship.status==="pending"){
                return res.status(400).json({message:"You have already sent a follow request to this user"});
            }
        }
        else{
            const newRelationship=new Relationship({
                follower:followerId,
                following:followingId,
            });
            newRelationship.save()
            .then((relationship)=>{
                return res.status(200).json({message:"Follow request sent successfully"});
            })
            .catch((error)=>{
                return res.status(500).json({message:"Internal server error"});
            });
        }
    })
    .catch((error)=>{
        return res.status(500).json({message:"Internal server error"});
    });
}

const unfollow=(req,res)=>{
    const followingId=req.body;
    const followerId=req.params.id;
    if(followerId===followingId){
        return res.status(400).json({message:"You cannot unfollow yourself"});
    }
    Relationship.findOne({follower:followerId,following:followingId})
    .then((relationship)=>{
        if(relationship){
            if(relationship.status==="accepted"){
                relationship.status="rejected";
                relationship.save()
                .then((relationship)=>{
                    return res.status(200).json({message:"Unfollowed successfully"});
                })
                .catch((error)=>{
                    return res.status(500).json({message:"Internal server error"});
                });
            }
            else if(relationship.status==="pending"){
                return res.status(400).json({message:"You have already sent a follow request to this user"});
            }
        }
        else{
            return res.status(400).json({message:"You are not following this user"});
        }
    })
    .catch((error)=>{
        return res.status(500).json({message:"Internal server error"});
    });
}
//get all relationship of the user
const getRelationships=(req,res)=>{
    const userId=req.params.id;
    Relationship.find({follower:userId})
    .populate("following")
    .then((relationships)=>{
        return res.status(200).json(relationships);
    })
    .catch((error)=>{
        return res.status(500).json({message:"Internal server error"});
    });
}
//get all followers of the user
const getFollowers=(req,res)=>{
    const userId=req.params.id;
    Relationship.find({following:userId})
    .populate("follower")
    .then((relationships)=>{
        return res.status(200).json(relationships);
    })
    .catch((error)=>{
        return res.status(500).json({message:"Internal server error"});
    });
}
module.exports={follow,unfollow,getRelationships,getFollowers};