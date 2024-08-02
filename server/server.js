// Packages importing  
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
// // import for map 
const http = require('http');
const socketIo = require('socket.io');

// Allwoing to access server 
app.use(cors());


// importing port  
const port = 5000;
 
// Middleware 
app.use(express.json());


// Mountings 
const DroneDataRoute = require("./routes/DroneDataRoute");
app.use("/api/v1/feedDroneData", DroneDataRoute);
app.use("/api/v1/latestDroneData", DroneDataRoute);


// DB connection 
require("./config/database").Connection();


// Defualt EndPoint
app.get("/",(req,res)=>{
    res.send(`<h1>We are live :)</h1>`)
})
 

// Server Listening 
app.listen(port,()=>{
    console.log(`Server listening on port number ${port}`);
})




