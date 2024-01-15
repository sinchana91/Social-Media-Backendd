const mongoose = require("mongoose");


const hashtagschema=new mongoose.Schema({
    hashtag:{
        type:String,
        required:true,
        unique:true
    },
    posts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    }]
},{timestamps:true});

module.exports=mongoose.model("Hashtag",hashtagschema);