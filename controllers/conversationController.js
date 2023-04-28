const Conversation = require('../model/Conversation')
// new conversation
const newConversation = async ( req, res ) =>
{
      const { senderId, receiverId } = req.body;
      const newConversation = new Conversation( {
            members: [senderId,receiverId]
      } )
      try {
            const savedConversation = await newConversation.save()
            res.status(200).json(savedConversation)
      } catch ( err ) {
            res.status(500).json(err)
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
            res.status(500).json(err)
      }
}

module.exports= {newConversation, getConversation}