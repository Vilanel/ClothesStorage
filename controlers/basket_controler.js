const User = require('../models/User.js');
const jwt = require('jsonwebtoken');

class basketControler {
    async addToBasket(req,res){
        try{
            res.header("Access-Control-Allow-Origin:*");
            const authorizationHeader = req.headers.authorization;
            if(!authorizationHeader){return res.status(400).json({message:'There aren\'t headers.authorization'});}
            const accessToken = authorizationHeader.split(' ')[1];
            if(!accessToken){return res.status(400).json({message:'There aren\'t token'});}
            const decoded = jwt.verify(accessToken,process.env.JWTsecret);
            if(!decoded){return res.status(400).json({message:'Token can\'t be decoded'});}
            const id = decoded.id;
            const user = await User.findById(id);
            const product = req.body;
            
            let isInBasket = false;
            let basketIndex;
            for(let i=0;i<user.basket.length;i++){
                if(user.basket[i].id===product.id && user.basket[i].color[0]===product.color[0]){
                    isInBasket = true;
                    basketIndex = i;
                    break;
                }
            }
            if(isInBasket){
                let count = user.basket[basketIndex].count+product.count;
                user.basket.splice(basketIndex, 1);
                product.count = count;
                user.basket.push(product);
            }
            else{
                user.basket.push(product);
            }
            await user.save();
            return res.json(user.basket);
        }catch(e){
            console.log('Error in addToBasket method:',e.message);
            res.status(400).json({message:'Error in addToBasket method'});
        }
    }
    async deleteFromBasket(req,res){
        try{
            const authorizationHeader = req.headers.authorization;
            if(!authorizationHeader){return res.status(400).json({message:'There aren\'t headers.authorization'});}
            const accessToken = authorizationHeader.split(' ')[1];
            if(!accessToken){return res.status(400).json({message:'There aren\'t token'});}
            const decoded = jwt.verify(accessToken,process.env.JWTsecret);
            if(!decoded){return res.status(400).json({message:'Token can\'t be decoded'});}
            const id = decoded.id;
            const user = await User.findById(id);
            const product = req.body;
            for(let i=0;i<user.basket.length;i++){
                if(user.basket[i].id===product.id && user.basket[i].color[0]===product.color[0]){
                    user.basket.splice(i, 1);
                    break;
                }
            }
            await user.save();
            return res.json(user.basket);
        }catch(e){
            console.log('Error in deleteFromBasket method:',e.message);
            res.status(400).json({message:'Error in deleteFromBasket method'});
        }
    } 
    async getBasket(req,res){
        try{
            const authorizationHeader = req.headers.authorization;
            if(!authorizationHeader){return res.status(400).json({message:'There aren\'t headers.authorization'});}

            const accessToken = authorizationHeader.split(' ')[1];
            if(!accessToken){return res.status(400).json({message:'There aren\'t token'});}
            
            const decoded = jwt.verify(accessToken,process.env.JWTsecret);
            if(!decoded){return res.status(400).json({message:'Token can\'t be decoded'});}

            const id = decoded.id;

            const user = await User.findById(id);
            return res.json(user.basket);
        }catch(e){
            console.log('Error in getBasket method:',e.message);
            res.status(400).json({message:'Error in getBasket method'});
        }
    }
}

module.exports = new basketControler();