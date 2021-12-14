const {Schema,model,Types} = require('mongoose');

const Product = new Schema({
    articule:{type:String, required: true, unique: true},
    description:{type:String},
    img:{type:String, required: true},
    name:{type:String, required: true},
    price:{type:Number, required: true},
    productInfo:{type:String},
    colors:{type:Array,required: true},
    type:{type:String,required: true}
})

module.exports = model('Product',Product);