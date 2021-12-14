require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const productsRouter = require('./routes/products_router.js');
const authRouter = require('./routes/auth_router.js');
const basketRouter = require('./routes/basket_router.js');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/products',productsRouter);
app.use('/auth',authRouter);
app.use('/basket',basketRouter);

async function start(){
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        app.listen(PORT,()=>{
            console.log(`App has been started on port ${PORT}`)
        })
    }catch(e){
        console.log('Server error: ',e.message);
        process.exit(1);
    }
}
start();