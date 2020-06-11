const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const blogSchema = new mongoose.Schema({
    
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    author:{
       type:ObjectId,
       ref:"User"
    },
    ratings:{
        type:Number
    },
    slug :{
        type:String,
        required:true
    }
},{timestamps:true})

mongoose.model("Blog",blogSchema)