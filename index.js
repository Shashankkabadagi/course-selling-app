const express=require('express')
const mongoose=require('mongoose')
const dotenv=require('dotenv')



const app=express();
app.use(express.json())
dotenv.config()

async function main(){
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('connected to db')
    } catch (error) {
        console.log(error.message)
    }
}

main();

app.get('/',(req,res)=>{
    res.send({
        msg:"it going"
    })
})



app.listen(3000,()=>{
    console.log('server connected')
})