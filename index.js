const express=require('express')
const mongoose=require('mongoose')
const dotenv=require('dotenv');
const { userRouter } = require('./routes/userrouter');
const { adminRouter } = require('./routes/adminrouter');



const app=express();
app.use(express.json())
dotenv.config()


app.use('/api/user',userRouter)
app.use('/api/admin',adminRouter)


async function main(){
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('connected to db')
    } catch (error) {
        console.log(error.message)
    }
}
main();




app.listen(3000,()=>{
    console.log('server connected')
})