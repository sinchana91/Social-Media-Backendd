const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    reciever:{  type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    message:{
        type:String,
        required:true,
    },
    createdAt:{type:Date,default:Date.now},
});

module.exports = mongoose.model("Message", messageSchema);