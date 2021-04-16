// Setup empty JS object to act as endpoint for all routes
projectData = {};
const port=3000
// Require Express to run server and routes
const express=require("express");
const bodyParser=require("body-parser");
const cors=require("cors");

// Start up an instance of app
const app=express()
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors())
// Initialize the main project folder
app.use(express.static('website'));
//get function
app.get("/getdata",getData)

function getData(req,res){
    res.send(projectData)
}
// post function
app.post("/postdata",postData)

function postData(req,res){
    projectData.temp=req.body.temp;
    projectData.date=req.body.date;
    projectData.feelings=req.body.feel;
    res.send(projectData)
}

// Setup Server
app.listen(port,()=>{
    console.log(`the port is ${port}`)
})
