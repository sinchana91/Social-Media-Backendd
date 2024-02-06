const User=require("../models/User");

const updateFollowingList = async(req,res)=>{
    if (req.body.type=== "follow" ){
        await follow(req,res)
    }
    else if (req.body.type==="unfollow"){
        await unfollow(req, res)
    }
}

const follow=async (req,res)=>{
    try{
    const followingId=req.body.followingId;
    const username=req.params.username;
    // console.log(username);
    const user=await User.findOne({username:username});
    // console.log(user)
    const userId=user._id;
    // console.log(userId);
    if(userId===followingId){
        return res.status(400).json({message:"You cannot follow yourself"});
    }
    const existingRelationship=await User.findOne({username:username,following:followingId})
    console.log(existingRelationship);
    
        if(existingRelationship){
            if(existingRelationship.status==="accepted"){
                return res.status(400).json({message:"You are already following this user"});
            }
            else if(existingRelationship.status==="pending"){
                return res.status(400).json({message:"You have already sent a follow request to this user"});
            }
        }
        else{
            
            user.followrequestlist.push(followingId);

            await user.save()
            
            return res.status(200).json({message:"Follow request sent successfully"});
            }
        }
            catch(error){
                console.log(error);
                return res.status(500).json({message:"Internal server error"});
            };
        
    
}


const unfollow=async (req,res)=>{
    try{
        const followingId=req.body.followingId;
        const username=req.params.username;
        // console.log(username);
        const user=await User.findOne({username:username});
        // console.log(user)
        const userId=user._id;
        // console.log(userId);
        if(userId===followingId){
            return res.status(400).json({message:"You cannot follow yourself"});
        }
    const existingRelationship=await User.findOne({username:username,following:followingId})
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

const acceptrequest=async (req,res)=>{
    try{
        const followerId=req.body.followerId;
        const username=req.params.username;
        const user=await User.findOne({username:username});
        if(!user){
            return res.status(400).json({message:"User does not exist"});
        }
        const userId=user._id;
        if(userId===followerId){
            return res.status(400).json({message:"You cannot follow yourself"});
        }
        const existingRelationship=await User.findOne({username:username,follower:followerId});
        if(existingRelationship.status==="accepted"){
            return res.status(400).json({message:"You are already following this user"});
        }else{
            existingRelationship.status="accepted";
            await existingRelationship.save();
            return res.status(200).json({message:"Follow request accepted successfully"});
          
        }
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"Internal server error"});
    }
}
//get all followers of the user
const getFollowers=async (req,res)=>{
    try{
    const username=req.params.username;
    const followers =await User.find({username:username}).populate("follower");
    return res.status(200).json(followers);
    }
    catch(error){
        return res.status(500).json({message:"Internal server error"});
    }
}
//get all followings of the user
const getFollowing=async (req,res)=>{
    try{
    const username=req.params.username;
    const followings =await User.find({username:username}).populate("following");
    return res.status(200).json(followings);
    }
    catch(error){
        return res.status(500).json({message:"Internal server error"});
    }
}

const rejectedrequest=async (req,res)=>{
    try{
        const followerId=req.body.followerId;
        const username=req.params.username;
        const user=await User.findOne({username:username});
        console.log(user);
        const userId=user._id;
        if(userId===followerId){
            return res.status(400).json({message:"You cannot follow yourself"});
        }
        const existingRelationship=await User.findOne({username:username,follower:followerId}).$where("this.status==='pending'");
        console.log(existingRelationship);
        if(existingRelationship.status==="rejected"){
            return res.status(400).json({message:"You have already rejected this user"});
        }
        else{
            existingRelationship.status="rejected";
            await existingRelationship.save();
            return res.status(200).json({message:"Follow request rejected successfully"});
        }
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"Internal server error"});
    }
}
module.exports={follow,unfollow,getFollowers,getFollowing,updateFollowingList,acceptrequest,rejectedrequest};