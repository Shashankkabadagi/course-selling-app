const express=require('express')
const { signup, signin, profile, getcourse, purchaseCourse, getPurchases } = require('../controlers/usercontroler')
const { authMiddleware } = require('../middleware/userMiddleware')

const userRouter=express.Router()

userRouter.post('/signup',signup)
userRouter.post('/signin',signin)
userRouter.get('/profile',authMiddleware,profile)
userRouter.get('/course',getcourse)
userRouter.post('/purchase',authMiddleware,purchaseCourse)
userRouter.get('/purchases',authMiddleware,getPurchases)

module.exports={
    userRouter,
}