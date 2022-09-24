const express=require('express');
const app=express();
require('dotenv').config();
app.use(express.json());
const DBconnect=require("./routes/DBconnect");
DBconnect();
app.use("/auth",require("./routes/authRouter"));


app.listen(process.env.PORT,(err)=>err?console.log(err):console.log('server is running on port 5000'));