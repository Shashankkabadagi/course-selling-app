const jwt=require('jsonwebtoken')

function authMiddleware(req,res,next){

    try {
        const {token}=req.headers

        const decoder=jwt.verify(token,process.env.SECRET_KEY)
    
        if(!decoder){
            return res.send({
                msg:'invalid token'
            })
        }
    
        req.userId=decoder.id
        next()
    } catch (error) {
        res.status(500).send({
            error:error.message
        })
    }
} 

module.exports={
    authMiddleware   
}