const User = require('../models/User.js');
const Role = require('../models/Role.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const generateAccessToken = (id,roles) => {
    const payLoad = {id,roles};
    return jwt.sign(payLoad, process.env.JWTsecret,{expiresIn:'24h'});
}

class authControler {
    async registration(req,res){
        try{
            res.header("Access-Control-Allow-Origin:*");
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({message:errors.errors[0].msg, param:errors.errors[0].param, errors});
            }
            const {userName,email,mobileNumber,password} = req.body;
            const candidate1 = await User.findOne({userName});
            if(candidate1){
                return res.status(400).json({message:'This userName is already taken',param:'userName'});
            }
            const candidate2 = await User.findOne({email});
            if(candidate2){
                return res.status(400).json({message:'This email is already taken',param:'email'});
            }
            const candidate3 = await User.findOne({mobileNumber});
            if(candidate3){
                return res.status(400).json({message:'This mobileNumber is already taken',param:'mobileNumber'});
            }
            const hashedPassword = bcrypt.hashSync(password,3);
            const userRole = await Role.findOne({value:'USER'});
            const user = new User({ userName,
                                    email,
                                    mobileNumber,
                                    password:hashedPassword,
                                    basket:[],
                                    roles:[userRole.value]});
            await user.save();
            return res.json({message:'User was created'});
        }catch(e){
            console.log('Error in registaration method:',e.message);
            res.status(400).json({message:'Error in registaration method'});
        }
    }
    async login(req,res){
        try{
            const {email,password} = req.body;
            const user = await User.findOne({email});
            if(!user){
                return res.status(400).json({message:`User with email ${email} wasn't found`});
            }
            const validPassword = bcrypt.compareSync(password,user.password);
            if(!validPassword){
                return res.status(400).json({message:'Password is uncorrect'});
            }
            const token = generateAccessToken(user._id,user.roles);
            return res.json({token,userRoles:user.roles});
        }catch(e){
            console.log('Error in login method:',e.message);
            res.status(400).json({message:'Error in login method'});
        }
    } 
    async getUsers(req,res){
        try{
            const users = await User.find();
            return res.json(users);
        }catch(e){
            console.log('Error in getUsers method:',e.message);
            res.status(400).json({message:'Error in getUsers method'});
        }
    }
    async deleteUser(req,res){
        try{
            const users = await User.find();
            const user = await User.findOne({email:req.body.email});
            const usersArr = [];
            for(let elIndex in users){
                if(users[elIndex].email !== user.email){
                    usersArr.push(users[elIndex]);
                }
            }
            await User.deleteOne(user);
            return res.json({message:'User was deleted'});
        }catch(e){
            console.log('Error in deletetUser method:',e.message);
            res.status(400).json({message:'Error in deletetUser method'});
        }
    }
}

module.exports = new authControler();