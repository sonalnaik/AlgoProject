var mongoose=require("mongoose");
var Schema= mongoose.Schema;

const adminSchema= mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    created:{
        type:Date,
        default:Date.now
    }
});

const Admin=mongoose.model("Admin",adminSchema);

module.exports={
    Admin:Admin
}