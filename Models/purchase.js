const mongoose=require('mongoose')

const purchaseSchema=mongoose.Schema({
    courseId:{
        type:mongoose.Types.ObjectId,
        ref:"Course"
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:User
    }
})

const Purchse=mongoose.model('Purchse',purchaseSchema)

module.exports={
    Purchse,
}