const {Schema,model} = require('mongoose');

const User = new Schema({
    userName:{type:String,required: true,unique:true},
    email:{type:String,required: true,unique:true},
    mobileNumber:{type:String,required: true,unique:true},
    password:{type:String,required: true},
    basket:{type:Array,required: true},
    roles:[{type:String,ref:'Role'}]
})

module.exports = model('User',User);