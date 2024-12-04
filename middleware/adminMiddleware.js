const jwt=require('jsonwebtoken')

function adminMiddleware(req,res,next){

    try {
        const {token}=req.headers

        const decoder=jwt.verify(token,process.env.SECRET_KEY)
    
        if(!decoder){
            return res.send({
                msg:'invalid token'
            })
        }
    
        req.adminId=decoder.id
        next()
    } catch (error) {
        res.status(500).send({
            error:error.message
        })
    }
} 

module.exports={
    adminMiddleware   
}