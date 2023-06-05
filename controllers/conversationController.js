const Conversation = require('../model/Conversation')
// new conversation
const newConversation = async ( req, res ) =>
{
      const { senderId, receiverId } = req.body;
      const duplicate = await Conversation.findOne( {
            members : {$all: [senderId, receiverId]}
      } ).exec()
      if (duplicate) return res.sendStatus(409) //conflict
      const newConversation = new Conversation( {
            members: [senderId,receiverId]
      } )
      try {
            const savedConversation = await newConversation.save()
            res.sendStatus(200).json(savedConversation)
      } catch ( err ) {
            res.status(500)
      }
};

//get conversation
const getConversation = async ( req, res ) =>
{
      const id = req.params.id;
      try {
            const conversation = await Conversation.find( {
                  members: {$in:[id]}
            } )
            res.status(200).json(conversation)
      }catch ( err ) {
            res.status(500)
      }
}

module.exports= {newConversation, getConversation}