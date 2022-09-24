const mongoose = require('mongoose');


const userschema=mongoose.Schema({


    name:{type:String,default:null},
    email:{type:String,default:null},
    password:{type:String,default:null},
    token:{type:String},
});

const user=mongoose.model('user',userschema);
module.exports = user;