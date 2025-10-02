import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    image: String,
    title:String,
    price: {
        amount: {
            type: Number,
            min: 0
        },
        currency: {
            type: String,
            default:"INR",
            enum:["INR","USD"]
        }
    },
    description:String,
    category:String
}, { timestamps: true });

export const productModel = mongoose.model("product",productSchema);