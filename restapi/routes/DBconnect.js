const mongoose=require('mongoose');




const DBconnect=async()=>{
    try{
        await mongoose.connect(process.env.DB_URI);
        console.log('connected to DB');
    }catch(err){
        console.log(err);
    }};


 module.exports=DBconnect; 