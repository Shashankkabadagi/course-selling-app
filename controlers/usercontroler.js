const { User } = require("../Models/userSchema");
const bcrypt= require('bcrypt')
const jwt= require('jsonwebtoken');
const { Course } = require("../Models/courseSchema");
const { Purchse } = require("../Models/purchase");

const signup=async (req,res)=>{
    try {
        const {email,password,location,age} = req.body

        const hashedPassword=await bcrypt.hash(password,10)
    
        await User.create({
            email,
            password:hashedPassword,
            location,
            age
        })
        res.status(200).send({
            msg:"user signup successfully"
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

    const existingUser=await User.findOne({
        email
    })
    if(!existingUser){
        return res.status(402).send({
            msg:"invali email"
        })
    }

    const matchedPassword= bcrypt.compare(password,existingUser.password)
    if(!matchedPassword){
        return res.status(402).send({
            msg:"incorrect password"
        })
    }

    const token= jwt.sign({id:existingUser._id},process.env.SECRET_KEY)

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

const profile= async(req,res)=>{
try {
    const userId=req.userId

    const profileData=await User.findById({
        _id:userId
    })
    if(!profileData){
        res.status(404).send({
            msg:"data not found"
        })
    }
    res.status(200).send({
        profile:profileData
    })
} catch (error) {
    res.status(500).send({
        error:error.message
    })
}
}

const getcourse=async(req,res)=>{
    try {
        const courses=await Course.find()
    
        res.send({
            courses
        })
    } catch (error) {
        res.send({
            error:error.message
        })
    }
}

const purchaseCourse=async (req,res)=>{
    try {
        const userId=req.userId
        const {courseId}=req.body
    
        await Purchse.create({
            userId:userId,
            courseId
        })
        res.send({
            msg:"course purchased"
        })
    } catch (error) {
        res.status(500).send({
            error:error.message
        })
    }
}

const getPurchases=async(req,res)=>{
    try {
        const userId=req.userId
    
        const purchases=await Purchse.find({
            userId:userId
        }).populate('courseId','title price')
    
        res.send({
            purchases
        })
    } catch (error) {
        res.send({
            error:error.message
        })
    }
}

module.exports={
    signup,
    signin,
    profile,
    getcourse,
    purchaseCourse,
    getPurchases
}