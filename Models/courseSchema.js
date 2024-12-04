const  mongoose=require('mongoose')

const courseSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    discription:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true
    },
    imageurl:{
        type:String,
        required:true
    },
    createrId:{
        type:mongoose.Types.ObjectId,
        ref:'Admin'
    }

})

const Course=mongoose.model('Course',courseSchema)

module.exports={
    Course
}