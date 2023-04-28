const Message = require( '../model/Message' );

const addMessage = async ( req, res ) =>
{
      const newMessage = new Message( req.body );
      const { sender, text, conversationId } = req.body
      try {
            const newMessage = {conversationId, sender, text}
            const savedMessage = await Message.create(newMessage)
            res.status( 200 ).json( savedMessage );
      } catch ( err ) {
            res.status( 500 ).json( err );
      }
};


const getMessage = async ( req, res ) =>
{
      const {id} = req.params
      try {
            const messages = await Message.find( {
                  conversationId: id
            } )
            res.status(200).json(messages)
      } catch ( err ) {
            res.status(500).json(err)
      }
};

module.exports = {addMessage, getMessage}