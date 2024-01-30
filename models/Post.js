const mongoose=require("mongoose");


const postSchema=new mongoose.Schema({
    username:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:false,
    },
    desc:{
        type:String,
        required:true,
    },
    media:{
        type:String,
        required:false,
    },
   locations:{
        type:String,
        required:false,
    },
    mentions:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    }],
    tags:[{type:String}],
    visibility:{type:String,enum:['public','private','friends-only'],default:'public',},
    likesCount:{type:Number,default:0,},
    commentsCount:{type:Number,default:0,},
    sharesCount:{type:Number,default:0,},
    hashtags:[{type:String}],
    originalPost:{type:mongoose.Schema.Types.ObjectId,ref:"Post",},
    reactions:[
        {
            emoji:{type:String,},
            user:{type:mongoose.Schema.Types.ObjectId,ref:'User',},

        },
    ],
    createdAt:{type:Date,default:Date.now},
},

{timestamps:true}
)
module.exports=mongoose.model("Post",postSchema);