const path = require( 'path' );

const fileExtLimiter = ( allowedExtArray ) =>
{
      return ( req, res, next ) =>
      {
            const files = req.files

            const fileExtentions = []
            Object.keys( files ).forEach( key =>
            {
                  fileExtentions.push(path.extname(files[key].name))
            } )
            
            const allowed = fileExtentions.every( ext => allowedExtArray.includes( ext ) )
            if ( !allowed ) {
                  const message = `upload failed only ${ allowedExtArray.toString() } files allowed`
                  
                  return res.status(422).json({status: 'error', message})
            }
            next()
      }
};

module.exports = fileExtLimiter