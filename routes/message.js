const Message=require("../models/Message");
const User=require("../models/User");

const createMessage=(req,res)=>{
    try{
    const senderId=req.user._id;
    const recieverId=req.params.id;
    const message=req.body.message;
    const newMessage=new Message({
        sender:senderId,
        reciever:recieverId,
        message:message,
    });
    newMessage.save()
    return res.status(200).json({message:"Message sent successfully"});
    }catch(error){
        return res.status(500).json({message:"Internal server error"});
    }
}

const editMessage = async (req, res) => {
    try {
        const messageId = req.params.id;
        const newMessage = req.body.message;

        const existingMessage = await Message.findOne({_id: messageId});

        if (!existingMessage) {
            return res.status(404).json({message: "Message not found"});
        }

        existingMessage.message = newMessage;
        await existingMessage.save();

        return res.status(200).json({message: "Message edited successfully"});
    } catch (error) {
        return res.status(500).json({message: "Internal server error"});
    }
};
