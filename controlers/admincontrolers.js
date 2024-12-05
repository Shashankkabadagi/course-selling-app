
const bcrypt= require('bcrypt')
const jwt= require('jsonwebtoken')
const { Admin } = require('../Models/adminSchema')
const { Course } = require('../Models/courseSchema')

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

const profile= async(req,res)=>{
    try {
        const adminId=req.adminId
    
        const profileData=await Admin.findById({
            _id:adminId
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
    
const course=async(req,res)=>{
    try {
        const {title,discription,price,imageurl}=req.body
        const adminId=req.adminId;
    
        await Course.create({
            title,
            discription,
            price,
            imageurl,
            createrId:adminId
        })
        res.status(200).send({
            msg:' created course'
        })
    } catch (error) {
        res.send({
            error:error.message
        })
    }

}

const getcourse=async(req,res)=>{
    try {
        const adminId=req.adminId;
        const courseview=await Course.find({
            createrId:adminId
        })
        res.status(200).send({
            courseview
        })
    
    } catch (error) {
        res.send({
            error:error.message
        })
    }
}

const updatecourse=async(req,res)=>{
    try {
        const {title,price,courseId}=req.body
        const adminId=req.adminId;
    
        await Course.findOneAndUpdate({
            createrId:adminId,
            _id:courseId
        },{
            title,
            price
        })
        res.status(200).send({
            msg:'course updated'
        })
    } catch (error) {
        res.status(500).send({
            error:error.message
        })
    }
}

module.exports={
    signup,
    signin,
    profile,
    course,
    getcourse,
    updatecourse
}