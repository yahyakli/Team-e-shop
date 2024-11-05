import mongoose from "mongoose";

const Product = new mongoose.Schema({
    name:String,
    description:String,
    image_url:String,
    price:String
})

export default mongoose.model(
    "Products", Product
);