const express=require('express')
const { signup, signin } = require('../controlers/admincontrolers')

const adminRouter=express.Router()

adminRouter.post('/signup',signup)
adminRouter.post('/signin',signin)

module.exports={
    adminRouter,
}