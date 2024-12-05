const express=require('express')
const { signup, signin, profile, course, getcourse, updatecourse } = require('../controlers/admincontrolers')
const { adminMiddleware } = require('../middleware/adminMiddleware')

const adminRouter=express.Router()

adminRouter.post('/signup',signup)
adminRouter.post('/signin',signin)
adminRouter.get('/profile',adminMiddleware,profile)
adminRouter.post('/course',adminMiddleware,course)
adminRouter.get('/course',adminMiddleware,getcourse)
adminRouter.put('/course',adminMiddleware,updatecourse)

module.exports={
    adminRouter,
}