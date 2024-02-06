const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
username:{
    type:String,
    unique:true,
    required:true

},

email:{
type:String,
unique:true,
required:true
},
password:{
    type:String,
    required:true
},
follower:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:false,
}],

following:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    
    required:false,
},],



status:{
    type:String,
    enum:["accepted","pending","rejected","none"],
    default:"none",
},
postsCount:{
    type:Number,
    default:0
},
isDirectSelected: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Reference to the User model
}
},{timeStamps:true}
)
module.exports=mongoose.model("User",userSchema)
