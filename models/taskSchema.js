var mongoose=require("mongoose");
var Schema= mongoose.Schema;


const TaskSchema= mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    user_id:{
        type: mongoose.Schema.ObjectId
    },
    created:{
        type:Date,
        default:Date.now
    }
});

const Task=mongoose.model("Shop",TaskSchema);

module.exports={
    Task:Task
}

