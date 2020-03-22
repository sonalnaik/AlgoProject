var express=require("express")
var mongoose=require("mongoose");
var bodyparser=require("body-parser")
var cors=require("cors");
var path = require("path");
//instantiate express
var app=express();

const routeFile =require("./routes/adminRoutes");
const shopRouteFile= require("./routes/TaskRoute");

// //connect to mongodb
//mongoose.connect("mongodb://3.14.207.69:27017/questionsDb");//if no db created it will create one
mongoose.connect("mongodb://localhost:27017/ToDoApp");//if no db created it will create one testingg
// //on connect
mongoose.connection.on('connected',()=>{
    console.log("connected to mongodb");
})

// //on error
mongoose.connection.on('error',(err)=>{
    console.log("cannot connect->"+err);
})

const PORT=3000 //port on which server will be running

app.use(cors());

//app.use(bodyparser.urlencoded({entended:false}))
app.use(bodyparser.json());
// Point static path to dist

//*************************************** */
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
app.use(express.static('dist/chatz'));

//*********************************** */


app.use('/api',routeFile);
app.use('/shop',shopRouteFile);
app.use(bodyparser.json());


//start server
app.listen(PORT,()=>{
    console.log("server has been started "+PORT);
})

// Catch all other routes and return the index file
app.get('*', (req, res) => {
res.sendFile(path.join(__dirname+ '/dist/chatz/index.html'));
});

//to check server is running or not, we'll send some response to some route for ex '/' by using get method.
//now whenever server will run, it will send some response
// app.get('/',(req,res)=>{
//     res.send('hello world')//server sending response
// })

//add middlewares for routing



