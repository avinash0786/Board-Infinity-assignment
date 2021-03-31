const mongoose=require("mongoose");

const tasks=mongoose.Schema({
        taskID:{
            type:Number,
            required:true,
            unique:true,
        },
        taskName:{
            type:String,
            trim:true,
            required:true
        },
        taskDesc:{
            type:String,
            trim:true,
            required:true
        },
        creator:{
            type:String,
            trim:true,
            default:"",
        },
        duration:{
            type:Number,
            required:true,
            default:0
        },
        expireAt:{
            type:Date,
            required:true
        },
        createdAt:{
             type:Date,
            default:Date.now
        }
    },
    { collection : 'tasks' }
)

mongoose.model('tasks',tasks);
module.exports=mongoose.model("tasks");