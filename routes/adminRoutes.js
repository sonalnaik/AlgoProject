
var express=require("express");
var router=express.Router();
const Models = require("../models/adminSchema");
var jwt = require("jsonwebtoken")



router.post('/login',(req,res,next)=>{
    console.log("req bojdy",req.body);
    
    Models.Admin.find({ username: req.body.username,password: req.body.password})
    .exec(function(err, data) {
        // handle err
        if(err){
            res.json(err)
        }
        else{
            if(data.length>0){
                console.log(data);
                let token = jwt.sign({ 
                    username : req.body.username,
                    id:data[0]['_id']
                  },
                    "zEnWorkSecret", 
                    { expiresIn : '7d' }
                 )
                 res.status(200).json({
                    success : true,
                    message : "Auth ok",
                    res:data,
                    token : token
                 })
            }else{
                res.status(200).json({
                    success : false,
                    message : "Incorrect username or password.",
                    data:"Incorrect username or password.",
                 })
               
            }
            
        }

    });
})

router.post('/register',(req,res,next)=>{
    console.log("req body",req.body);
    let reqBodyData= new Models.Admin({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        username:req.body.username,
        password:req.body.password

    });
    reqBodyData.save((err,data)=>{
        if(err){
            res.status(500).json({
                success : true,
                message : "Problem while saving data.."
            })
        }else{
            res.status(200).json({
                success : true,
                message : "user information saved sucessfully."
            })
           
        }
    })
    });

    router.get('/session-check',(req,res,next)=>{
        console.log(req.headers);
        let token = req.headers['authorization'] || req.headers['x-access-token'];
        let secretKey="zEnWorkSecret";
        if(token && token.startsWith("Bearer ")){
            token = token.slice(8, token.length)
            jwt.verify(token, secretKey, (err, decoded) => {
              if(err){
                  res.status(401).json({
                      success : false,
                      message : "Token invalid"
                  })
              } 
              else {
                res.status(200).json({
                    success : true,
                    message : "Token valid"
                })
              }
            }) 
        } else {
            res.status(400).json({
                result : false,
                message : "Token missing"
            })
        } 
});

router.get('/verify',(req,res,next)=>{
    let token = req.headers['authorization'] || req.headers['x-access-token'];
    let secretKey="zEnWorkSecret";
    if(token && token.startsWith("Bearer ")){
        token = token.slice(8, token.length)
        jwt.verify(token, secretKey, function(err, decoded) {
            if(err){
                res.status(401).json({
                    success : false,
                    message : "Token invalid"
                })
            } 
            else {
                console.log(decoded);
              res.status(200).json({
                  success : true,
                  data : decoded
              })
            }
        });
    }
    
})

module.exports=router;