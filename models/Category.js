const {Schema,model,Types} = require('mongoose');

const Category = new Schema({
    name:{type:String, required: true, unique: true},
    constantName:{type:String, required: true, unique: true},
})

module.exports = model('Category',Category);