const Product = require('../models/Product.js');
const Category = require('../models/Category.js');

class productsControler {
    async getAllProducts(req,res){
        try{
            res.setHeader('Access-Control-Allow-Origin', '*');
            const products = await Product.find();
            res.send(products);
        }catch(e){
            console.log('Error in getAllProducts method:',e.message);
            res.status(400).json({message:'Error in getAllProducts method'});
        }
    }
    async getCurrentTypedProduct(req,res){
        try{
            res.setHeader('Access-Control-Allow-Origin', '*');
            const products = await Product.find();
            let bestSellers = [];
            for (const element of products) {
                if(element.type===req.body.constantName)
                    bestSellers.push(element);
            }
            res.send(bestSellers);
        }catch(e){
            console.log('Error in getBestSellers method:',e.message);
            res.status(400).json({message:'Error in getBestSellers method'});
        }
    }
    async updateProduct(req,res){
        try{
            await Product.updateOne({_id:req.body.id},req.body.updatedProduct);
            return res.json({message:'Product was updated'});
        }catch(e){
            console.log('Error in updateProduct method:',e.message);
            res.status(400).json({message:'Error in updateProduct method'});
        }
    }
    async addProduct(req,res){
        try{
            const product = new Product({
                articule:req.body.product.articule,
                description:req.body.product.description,
                img:req.body.product.img,
                name:req.body.product.name,
                price:req.body.product.price,
                productInfo:req.body.product.productInfo,
                colors:req.body.product.colors,
                type:req.body.product.type});
            await product.save();
            return res.json({message:'Product was added'});
        }catch(e){
            console.log('Error in addProduct method:',e.message);
            res.status(400).json({message:'Error in addProduct method'});
        }
    }
    async deleteProduct(req,res){
        try{
            const product = await Product.findOne({_id:req.body.id});
            await Product.deleteOne(product);
            return res.json({message:'Product was deleted'});
        }catch(e){
            console.log('Error in deleteProduct method:',e.message);
            res.status(400).json({message:'Error in deleteProduct method'});
        }
    }
    async getCategories(req,res){
        try{
            res.setHeader('Access-Control-Allow-Origin', '*');
            const categories = await Category.find();
            res.send(categories);
        }catch(e){
            console.log('Error in getCategories method:',e.message);
            res.status(400).json({message:'Error in getCategories method'});
        }
    }
    async addCategory(req,res){
        try{
            res.setHeader('Access-Control-Allow-Origin', '*');
            const categoryName = req.body.name;

            let constantName = categoryName;
            constantName = constantName.split('');
            constantName[0] = constantName[0].toLowerCase();
            constantName=constantName.join('').split(' ').join('');

            const categoryCandidate = await Category.findOne({name:categoryName});
            if(categoryCandidate){
                return res.status(400).json({message:'This category already exists'});
            }

            const category = new Category({
                name:categoryName,
                constantName});
            await category.save();
            return res.json({message:'Category was added'});
        }catch(e){
            console.log('Error in addCategory method:',e.message);
            res.status(400).json({message:'Error in addCategory method'});
        }
    }
    async deleteCategory(req,res){
        try{
            const category = await Category.findOne({name:req.body.name});
            await Category.deleteOne(category);
            return res.json({message:'Category was deleted'});
        }catch(e){
            console.log('Error in deleteCategory method:',e.message);
            res.status(400).json({message:'Error in deleteCategory method'});
        }
    }
}

module.exports = new productsControler();