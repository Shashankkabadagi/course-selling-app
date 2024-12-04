
const bcrypt= require('bcrypt')
const jwt= require('jsonwebtoken')
const { Admin } = require('../Models/adminSchema')

const signup=async (req,res)=>{
    try {
        const {email,password,location,age} = req.body

        const hashedPassword=await bcrypt.hash(password,10)
    
        await Admin.create({
            email,
            password:hashedPassword,
            location,
            age
        })
        res.status(200).send({
            msg:"Admin signup successfully"
        })
    
    } catch (error) {
        res.status(500).send({
            error:error.message
        })
    }
}

const signin=async (req,res)=>{

try {
    const {email,password}=req.body

    const existingAdmin=await Admin.findOne({
        email
    })
    if(!existingAdmin){
        return res.status(402).send({
            msg:"invali email"
        })
    }

    const matchedPassword= bcrypt.compare(password,existingAdmin.password)
    if(!matchedPassword){
        return res.status(402).send({
            msg:"incorrect password"
        })
    }

    const token= jwt.sign({id:existingAdmin._id},process.env.SECRET_KEY)

    res.status(200).send({
        msg:"login successfully",
        token:token
    })
} catch (error) {
    res.status(500).send({
        error:error.message
    })
}
}





module.exports={
    signup,
    signin
}