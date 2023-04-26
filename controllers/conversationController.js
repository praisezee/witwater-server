const conversationDB = {
      conversations: require( '../model/conversation.json' ),
      setUser : function (data){this.conversations = data}
};
const fsPromises = require( 'fs' ).promises
const path = require('path')
// new conversation
const newConversation = async ( req, res ) =>
{
      const { senderId, receiverId } = req.body;
      const newConversation =
            { senderId, receiverId}
            conversationDB.setUser( [ ...conversationDB.conversations, newConversation ] )
            await fsPromises.writeFile(
                  path.join( __dirname, "..", 'model', 'conversation.json' ),
                  JSON.stringify( conversationDB.conversations )
            )
            res.json( conversationDB.conversations )
            
};

//get conversation
const getConversation = ( req, res ) =>
{
      const id = req.params.id;
}

module.exports= {newConversation, getConversation}