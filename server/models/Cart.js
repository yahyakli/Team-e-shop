import mongoose, { mongo } from "mongoose";

const Cart = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users"
    },
    products_ids:[String],
})

export default mongoose.model(
    "Carts", Cart
);