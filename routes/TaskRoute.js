
var express=require("express");
var router=express.Router();
const Models = require("../models/taskSchema");
const mongoose= require("mongoose");

router.post('/addTask',(req,res,next)=>{
    console.log("req body",req.body);
    let reqBodyData= new Models.Task({
        name:req.body.name,
        description:req.body.description,
        user_id:req.body.user_id
    });
    console.log(reqBodyData);
    reqBodyData.save((err,data)=>{
        if(err){
            res.status(500).json({
                success : false,
                message : "Problem while saving data.",
                error:err
             })
        }else{
            res.status(200).json({
                success : true,
                message : "Task information saved sucessfully.",
             })
        }
    })
    });


    router.post('/allTasks',(req,res,next)=>{
        Models.Task.find({"user_id":req.body.data.id})
            .exec(function(err, data) {
                // handle err
                if(err){
                    res.status(500).json({
                        success : false,
                        error:err,
                    })
                }
                else{
                    res.status(200).json({
                        success : true,
                        data:data,
                    })
                    
                    }
           });
        });

        router.post('/delete-task',(req,res,next)=>{
            
            Models.Task.findByIdAndRemove(req.body._id)
                .exec(function(err, data) {
                    // handle err
                    if(err){
                        res.status(500).json({
                            success : false,
                            error:err,
                        })
                    }
                    else{
                        res.status(200).json({
                            success : true,
                            data:data,
                        })
                        
                        }
               });
            });
        
            router.post('/update-task',(req,res,next)=>{
                Models.Task.findByIdAndUpdate(req.body.id,req.body).exec((err,data)=>{
                    if(err){
                        res.send("error found while finding",err);
                    }else{
                        //console.log(data);
                           res.status(200).json({
                                    success : true,
                                   
                                })
                            }
                      })
                     
                    
                
                });

module.exports=router;