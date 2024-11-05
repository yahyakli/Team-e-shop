import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import productRoutes from './routes/productRoutes.js';
import authRoutes from './routes/authRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

const app = express();

// Middleware
app.use(bodyParser.json());

// Use routes
app.use('/api', productRoutes);
app.use('/api', authRoutes);
app.use('/api', cartRoutes);
app.use('/api', orderRoutes);




const startServer = () => {
    try{
        mongoose.connect("mongodb://localhost:27017/agile")
            .then(() => {
                console.log('mongo db connected')
            })
            .catch((err) => console.log(err))
            app.listen(3000, () => console.log('server started on port 3000'))
    }catch(err){
        console.log(err)
    }
}

startServer();