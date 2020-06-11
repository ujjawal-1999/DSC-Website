const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const blogSchema = new mongoose.Schema({
    
    title:{
        type:String,
        required:true
    },
    body:{
        type:Object,
        required:true
    },
    author:{
       type:ObjectId,
       ref:"User"
    },
    cover:{
        type:String,
        default:'https://cdn-images-1.medium.com/max/800/1*fDv4ftmFy4VkJmMR7VQmEA.png'
        },
    ratings:{
        type:Number,
        default:0
    },
    category:{
    type:String,
    required:true
    },
    slug :{
        type:String,
        required:true
    }
},{timestamps:true})

mongoose.model("Blog",blogSchema)