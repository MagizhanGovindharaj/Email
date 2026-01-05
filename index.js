const express = require('express');
const emailRoutes = require('./routes/email.routes');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT;

const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",")

app.use(cors({
    origin: function(origin,callback){
        if(!origin || allowedOrigins.includes(origin)){
            callback(null, true);
        }else{
            callback(new Error("Not allowed by CORS"));
        }
    }
}))
app.use(express.json());
app.use("/api/email",emailRoutes);

app.listen(port,(err)=>{
    if(err) console.log("Error in server setup",err);
    else console.log(`Server is running on port: ${port}`);
})