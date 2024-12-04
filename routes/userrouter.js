const express=require('express')
const { signup, signin, profile } = require('../controlers/usercontroler')
const { authMiddleware } = require('../middleware/userMiddleware')

const userRouter=express.Router()

userRouter.post('/signup',signup)
userRouter.post('/signin',signin)
userRouter.get('/profile',authMiddleware,profile)

module.exports={
    userRouter,
}