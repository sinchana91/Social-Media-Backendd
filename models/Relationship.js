const mongoose = require("mongoose");

const relationshipSchema = new mongoose.Schema({
    follower:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },

    following:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },

    status:{
        type:String,
        enum:["accepted","pending","rejected"],
        default:"pending",
    },
    createdAt:{type:Date,default:Date.now},
    updatedAt:{type:Date,default:Date.now},
});

relationshipSchema.pre("save",function(next){
    this.updatedAt=Date.now();
    next();
});


module.exports = mongoose.model("Relationship", relationshipSchema);
