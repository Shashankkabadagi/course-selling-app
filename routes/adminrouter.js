const express=require('express')
const { signup, signin, profile } = require('../controlers/admincontrolers')
const { adminMiddleware } = require('../middleware/adminMiddleware')

const adminRouter=express.Router()

adminRouter.post('/signup',signup)
adminRouter.post('/signin',signin)
adminRouter.get('/profile',adminMiddleware,profile)

module.exports={
    adminRouter,
}